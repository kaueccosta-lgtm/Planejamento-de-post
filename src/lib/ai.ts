import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export { anthropic };

// ─── Caption Generator ────────────────────────────────────────────────────────
export interface CaptionRequest {
  context: string;
  platform: "INSTAGRAM" | "FACEBOOK" | "LINKEDIN" | "TIKTOK" | "TWITTER";
  tone: "professional" | "casual" | "inspirational" | "promotional" | "educational";
  keywords?: string[];
  obraName?: string;
  maxLength?: number;
  count?: number;
}

export interface CaptionResponse {
  captions: string[];
  hashtags: string[];
}

export async function generateCaptions(
  request: CaptionRequest
): Promise<CaptionResponse> {
  const platformLimits: Record<string, number> = {
    INSTAGRAM: 2200,
    FACEBOOK: 63206,
    LINKEDIN: 3000,
    TIKTOK: 2200,
    TWITTER: 280,
  };

  const maxLen = request.maxLength || platformLimits[request.platform] || 2200;
  const count = request.count || 3;

  const systemPrompt = `You are an expert social media copywriter for a real estate company called ${request.obraName || "Oikos"}.
You write compelling, authentic captions that drive engagement.
Platform: ${request.platform}
Tone: ${request.tone}
Max character length: ${maxLen}

Always respond with valid JSON in this exact format:
{
  "captions": ["caption1", "caption2", "caption3"],
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"]
}`;

  const userPrompt = `Generate ${count} unique ${request.tone} captions for ${request.platform} about:
${request.context}

${request.keywords?.length ? `Key themes to include: ${request.keywords.join(", ")}` : ""}
${request.obraName ? `Property/Project name: ${request.obraName}` : ""}

Each caption should be compelling, authentic and ready to post. Include relevant emojis.
Also suggest 10-15 relevant hashtags.`;

  const message = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  try {
    const parsed = JSON.parse(content.text) as CaptionResponse;
    return parsed;
  } catch {
    // Fallback: extract from text
    return {
      captions: [content.text],
      hashtags: [],
    };
  }
}

// ─── Reel Script Generator ────────────────────────────────────────────────────
export interface ScriptRequest {
  topic: string;
  duration: number; // seconds
  style: "storytelling" | "tutorial" | "showcase" | "testimonial";
  obraName?: string;
}

export interface ScriptResponse {
  hook: string;
  body: string;
  callToAction: string;
  fullScript: string;
  voiceoverText: string;
  textOverlays: string[];
}

export async function generateReelScript(
  request: ScriptRequest
): Promise<ScriptResponse> {
  const message = await anthropic.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Generate a ${request.duration}-second ${request.style} Reel/TikTok script about: ${request.topic}
${request.obraName ? `Property/Project: ${request.obraName}` : ""}

Respond with valid JSON:
{
  "hook": "first 3 seconds hook text",
  "body": "main content description",
  "callToAction": "CTA at the end",
  "fullScript": "complete script",
  "voiceoverText": "text to be spoken",
  "textOverlays": ["overlay1", "overlay2", "overlay3"]
}`,
      },
    ],
    system:
      "You are an expert short-form video script writer for real estate social media. Create engaging scripts that stop the scroll.",
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  return JSON.parse(content.text) as ScriptResponse;
}
