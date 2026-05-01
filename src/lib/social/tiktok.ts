// TikTok API Adapter
// Handles TikTok publishing via the TikTok for Business / Content Posting API

const TIKTOK_API_BASE = "https://open.tiktokapis.com/v2";

export interface TikTokPublishOptions {
  accessToken: string;
  videoUrl: string;
  title: string;
  coverImageUrl?: string;
  privacyLevel?: "PUBLIC_TO_EVERYONE" | "MUTUAL_FOLLOW_FRIENDS" | "FOLLOWER_OF_CREATOR" | "SELF_ONLY";
  disableDuet?: boolean;
  disableComment?: boolean;
  disableStitch?: boolean;
  videoCoverTimestamp?: number;
}

export interface TikTokPublishResult {
  publishId: string;
  shareUrl?: string;
  error?: string;
}

export interface TikTokVideoStats {
  videoId: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  playCount: number;
}

// ─── Publish video to TikTok ──────────────────────────────────────────────────
export async function publishToTikTok(
  options: TikTokPublishOptions
): Promise<TikTokPublishResult> {
  const {
    accessToken,
    videoUrl,
    title,
    privacyLevel = "PUBLIC_TO_EVERYONE",
    disableDuet = false,
    disableComment = false,
    disableStitch = false,
  } = options;

  try {
    // Step 1: Initialize upload
    const initRes = await fetch(
      `${TIKTOK_API_BASE}/post/publish/video/init/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          post_info: {
            title,
            privacy_level: privacyLevel,
            disable_duet: disableDuet,
            disable_comment: disableComment,
            disable_stitch: disableStitch,
          },
          source_info: {
            source: "PULL_FROM_URL",
            video_url: videoUrl,
          },
        }),
      }
    );

    const initData = (await initRes.json()) as {
      data?: { publish_id: string };
      error?: { code: string; message: string };
    };

    if (initData.error?.code !== "ok" && initData.error) {
      throw new Error(initData.error.message);
    }

    const publishId = initData.data?.publish_id;
    if (!publishId) throw new Error("No publish ID returned");

    return { publishId };
  } catch (error) {
    return {
      publishId: "",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ─── Check publish status ─────────────────────────────────────────────────────
export async function checkTikTokPublishStatus(
  publishId: string,
  accessToken: string
): Promise<{
  status: "PROCESSING_UPLOAD" | "PUBLISH_COMPLETE" | "FAILED";
  shareUrl?: string;
  failureCode?: string;
}> {
  try {
    const res = await fetch(`${TIKTOK_API_BASE}/post/publish/status/fetch/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ publish_id: publishId }),
    });

    const data = (await res.json()) as {
      data?: {
        status: string;
        share_url?: string;
        fail_code?: string;
      };
    };

    if (!data.data) {
      return { status: "FAILED", failureCode: "UNKNOWN" };
    }

    return {
      status: data.data.status as "PROCESSING_UPLOAD" | "PUBLISH_COMPLETE" | "FAILED",
      shareUrl: data.data.share_url,
      failureCode: data.data.fail_code,
    };
  } catch {
    return { status: "FAILED", failureCode: "API_ERROR" };
  }
}

// ─── Get video stats ──────────────────────────────────────────────────────────
export async function getTikTokVideoStats(
  videoId: string,
  accessToken: string
): Promise<TikTokVideoStats> {
  try {
    const res = await fetch(`${TIKTOK_API_BASE}/video/query/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        filters: { video_ids: [videoId] },
        fields: ["id", "view_count", "like_count", "comment_count", "share_count", "play_count"],
      }),
    });

    const data = (await res.json()) as {
      data?: {
        videos?: Array<{
          id: string;
          view_count: number;
          like_count: number;
          comment_count: number;
          share_count: number;
          play_count: number;
        }>;
      };
    };

    const video = data.data?.videos?.[0];
    if (!video) {
      return { videoId, views: 0, likes: 0, comments: 0, shares: 0, playCount: 0 };
    }

    return {
      videoId: video.id,
      views: video.view_count || 0,
      likes: video.like_count || 0,
      comments: video.comment_count || 0,
      shares: video.share_count || 0,
      playCount: video.play_count || 0,
    };
  } catch {
    return { videoId, views: 0, likes: 0, comments: 0, shares: 0, playCount: 0 };
  }
}

// ─── Refresh access token ─────────────────────────────────────────────────────
export async function refreshTikTokToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
} | null> {
  try {
    const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY || "",
        client_secret: process.env.TIKTOK_CLIENT_SECRET || "",
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    const data = (await res.json()) as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      error?: string;
    };

    if (data.error || !data.access_token) return null;

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken,
      expiresIn: data.expires_in || 86400,
    };
  } catch {
    return null;
  }
}
