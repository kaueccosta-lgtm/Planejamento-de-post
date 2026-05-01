// LinkedIn API Adapter
// Handles LinkedIn publishing via the LinkedIn Marketing API

const LINKEDIN_API_BASE = "https://api.linkedin.com/v2";

export interface LinkedInPublishOptions {
  accessToken: string;
  authorUrn: string; // urn:li:person:{id} or urn:li:organization:{id}
  text: string;
  mediaUrls?: string[];
  visibility?: "PUBLIC" | "CONNECTIONS";
}

export interface LinkedInPublishResult {
  id: string;
  postUrl?: string;
  error?: string;
}

export interface LinkedInInsights {
  impressions: number;
  uniqueImpressions: number;
  clicks: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
}

// ─── Publish to LinkedIn ──────────────────────────────────────────────────────
export async function publishToLinkedIn(
  options: LinkedInPublishOptions
): Promise<LinkedInPublishResult> {
  const { accessToken, authorUrn, text, mediaUrls, visibility = "PUBLIC" } = options;

  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    };

    if (mediaUrls && mediaUrls.length > 0) {
      // Register upload
      const registerRes = await fetch(
        `${LINKEDIN_API_BASE}/assets?action=registerUpload`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            registerUploadRequest: {
              recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
              owner: authorUrn,
              serviceRelationships: [
                {
                  relationshipType: "OWNER",
                  identifier: "urn:li:userGeneratedContent",
                },
              ],
            },
          }),
        }
      );

      const registerData = (await registerRes.json()) as {
        value?: { asset: string; uploadMechanism: { "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest": { uploadUrl: string } } };
      };
      const asset = registerData.value?.asset;
      const uploadUrl = registerData.value?.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]?.uploadUrl;

      if (uploadUrl && mediaUrls[0]) {
        // Upload image from URL
        const imageRes = await fetch(mediaUrls[0]);
        const imageBlob = await imageRes.blob();
        await fetch(uploadUrl, {
          method: "PUT",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: imageBlob,
        });
      }

      // Create post with media
      const postRes = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          author: authorUrn,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: { text },
              shareMediaCategory: "IMAGE",
              media: [
                {
                  status: "READY",
                  description: { text: text.substring(0, 200) },
                  media: asset,
                },
              ],
            },
          },
          visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": visibility,
          },
        }),
      });

      const postData = (await postRes.json()) as { id?: string; message?: string };
      if (!postData.id) throw new Error(postData.message || "Failed to publish");
      return { id: postData.id };
    } else {
      // Text only post
      const postRes = await fetch(`${LINKEDIN_API_BASE}/ugcPosts`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          author: authorUrn,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: { text },
              shareMediaCategory: "NONE",
            },
          },
          visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": visibility,
          },
        }),
      });

      const postData = (await postRes.json()) as { id?: string; message?: string };
      if (!postData.id) throw new Error(postData.message || "Failed to publish");
      return { id: postData.id };
    }
  } catch (error) {
    return {
      id: "",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ─── Get post statistics ──────────────────────────────────────────────────────
export async function getLinkedInPostStats(
  postUrn: string,
  accessToken: string
): Promise<LinkedInInsights> {
  try {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "X-Restli-Protocol-Version": "2.0.0",
    };

    const encodedUrn = encodeURIComponent(postUrn);
    const res = await fetch(
      `${LINKEDIN_API_BASE}/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${encodedUrn}`,
      { headers }
    );

    const data = (await res.json()) as {
      elements?: Array<{
        totalShareStatistics: {
          impressionCount: number;
          uniqueImpressionsCount: number;
          clickCount: number;
          engagement: number;
          likeCount: number;
          commentCount: number;
          shareCount: number;
        };
      }>;
    };

    const stats = data.elements?.[0]?.totalShareStatistics;
    if (!stats) return { impressions: 0, uniqueImpressions: 0, clicks: 0, engagement: 0, likes: 0, comments: 0, shares: 0 };

    return {
      impressions: stats.impressionCount,
      uniqueImpressions: stats.uniqueImpressionsCount,
      clicks: stats.clickCount,
      engagement: stats.engagement,
      likes: stats.likeCount,
      comments: stats.commentCount,
      shares: stats.shareCount,
    };
  } catch {
    return { impressions: 0, uniqueImpressions: 0, clicks: 0, engagement: 0, likes: 0, comments: 0, shares: 0 };
  }
}
