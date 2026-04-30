// Meta Graph API Adapter
// Handles Facebook and Instagram publishing via the Graph API

export interface MetaPublishOptions {
  accessToken: string;
  pageId: string;
  message: string;
  mediaUrls?: string[];
  scheduledPublishTime?: number; // Unix timestamp
  published?: boolean;
}

export interface MetaPublishResult {
  id: string;
  postUrl?: string;
  error?: string;
}

export interface MetaInsights {
  reach: number;
  impressions: number;
  engagements: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

const GRAPH_API_BASE = "https://graph.facebook.com/v21.0";

// ─── Publish to Facebook Page ─────────────────────────────────────────────────
export async function publishToFacebook(
  options: MetaPublishOptions
): Promise<MetaPublishResult> {
  const { accessToken, pageId, message, mediaUrls, scheduledPublishTime } = options;

  try {
    if (mediaUrls && mediaUrls.length > 0) {
      if (mediaUrls.length === 1) {
        // Single photo post
        const res = await fetch(`${GRAPH_API_BASE}/${pageId}/photos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            url: mediaUrls[0],
            caption: message,
            published: !scheduledPublishTime,
            scheduled_publish_time: scheduledPublishTime,
          }),
        });
        const data = (await res.json()) as { id?: string; error?: { message: string } };
        if (data.error) throw new Error(data.error.message);
        return { id: data.id as string };
      } else {
        // Multi-photo post
        const photoIds: string[] = [];
        for (const url of mediaUrls) {
          const res = await fetch(`${GRAPH_API_BASE}/${pageId}/photos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_token: accessToken,
              url,
              published: false,
            }),
          });
          const data = (await res.json()) as { id?: string; error?: { message: string } };
          if (data.error) throw new Error(data.error.message);
          photoIds.push(data.id as string);
        }
        const res = await fetch(`${GRAPH_API_BASE}/${pageId}/feed`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            message,
            attached_media: photoIds.map((id) => ({ media_fbid: id })),
            published: !scheduledPublishTime,
            scheduled_publish_time: scheduledPublishTime,
          }),
        });
        const data = (await res.json()) as { id?: string; error?: { message: string } };
        if (data.error) throw new Error(data.error.message);
        return { id: data.id as string };
      }
    } else {
      // Text only post
      const res = await fetch(`${GRAPH_API_BASE}/${pageId}/feed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: accessToken,
          message,
          published: !scheduledPublishTime,
          scheduled_publish_time: scheduledPublishTime,
        }),
      });
      const data = (await res.json()) as { id?: string; error?: { message: string } };
      if (data.error) throw new Error(data.error.message);
      return { id: data.id as string };
    }
  } catch (error) {
    return {
      id: "",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ─── Publish to Instagram ─────────────────────────────────────────────────────
export async function publishToInstagram(
  options: MetaPublishOptions & { igAccountId: string }
): Promise<MetaPublishResult> {
  const { accessToken, igAccountId, message, mediaUrls } = options;

  try {
    if (!mediaUrls || mediaUrls.length === 0) {
      throw new Error("Instagram requires at least one media item");
    }

    if (mediaUrls.length === 1) {
      // Single media
      const containerRes = await fetch(
        `${GRAPH_API_BASE}/${igAccountId}/media`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            image_url: mediaUrls[0],
            caption: message,
          }),
        }
      );
      const containerData = (await containerRes.json()) as { id?: string; error?: { message: string } };
      if (containerData.error) throw new Error(containerData.error.message);

      const publishRes = await fetch(
        `${GRAPH_API_BASE}/${igAccountId}/media_publish`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            creation_id: containerData.id,
          }),
        }
      );
      const publishData = (await publishRes.json()) as { id?: string; error?: { message: string } };
      if (publishData.error) throw new Error(publishData.error.message);
      return { id: publishData.id as string };
    } else {
      // Carousel
      const itemIds: string[] = [];
      for (const url of mediaUrls) {
        const res = await fetch(`${GRAPH_API_BASE}/${igAccountId}/media`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            image_url: url,
            is_carousel_item: true,
          }),
        });
        const data = (await res.json()) as { id?: string; error?: { message: string } };
        if (data.error) throw new Error(data.error.message);
        itemIds.push(data.id as string);
      }

      const carouselRes = await fetch(`${GRAPH_API_BASE}/${igAccountId}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: accessToken,
          media_type: "CAROUSEL",
          caption: message,
          children: itemIds,
        }),
      });
      const carouselData = (await carouselRes.json()) as { id?: string; error?: { message: string } };
      if (carouselData.error) throw new Error(carouselData.error.message);

      const publishRes = await fetch(
        `${GRAPH_API_BASE}/${igAccountId}/media_publish`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token: accessToken,
            creation_id: carouselData.id,
          }),
        }
      );
      const publishData = (await publishRes.json()) as { id?: string; error?: { message: string } };
      if (publishData.error) throw new Error(publishData.error.message);
      return { id: publishData.id as string };
    }
  } catch (error) {
    return {
      id: "",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ─── Verify webhook ───────────────────────────────────────────────────────────
export function verifyMetaWebhook(
  mode: string,
  token: string,
  challenge: string,
  verifyToken: string
): string | null {
  if (mode === "subscribe" && token === verifyToken) {
    return challenge;
  }
  return null;
}

// ─── Get page insights ────────────────────────────────────────────────────────
export async function getPageInsights(
  pageId: string,
  accessToken: string,
  since: Date,
  until: Date
): Promise<MetaInsights> {
  const params = new URLSearchParams({
    access_token: accessToken,
    metric: "page_impressions,page_reach,page_engaged_users,page_post_engagements",
    period: "day",
    since: Math.floor(since.getTime() / 1000).toString(),
    until: Math.floor(until.getTime() / 1000).toString(),
  });

  const res = await fetch(`${GRAPH_API_BASE}/${pageId}/insights?${params}`);
  const data = (await res.json()) as { data?: Array<{ name: string; values: Array<{ value: number }> }> };

  if (!data.data) {
    return { reach: 0, impressions: 0, engagements: 0, likes: 0, comments: 0, shares: 0, saves: 0 };
  }

  const metrics: Record<string, number> = {};
  for (const metric of data.data) {
    const total = metric.values.reduce((sum: number, v) => sum + (v.value || 0), 0);
    metrics[metric.name] = total;
  }

  return {
    reach: metrics.page_reach || 0,
    impressions: metrics.page_impressions || 0,
    engagements: metrics.page_post_engagements || 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
  };
}
