import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

let connection: IORedis | null = null;

function getRedisConnection(): IORedis {
  if (!connection) {
    connection = new IORedis(REDIS_URL, {
      maxRetriesPerRequest: null,
    });
  }
  return connection;
}

// ─── Queue Names ──────────────────────────────────────────────────────────────
export const QUEUE_NAMES = {
  POST_PUBLISH: "post-publish",
  WEBHOOK_PROCESS: "webhook-process",
  REPORT_GENERATE: "report-generate",
  MEDIA_PROCESS: "media-process",
} as const;

// ─── Post Publish Queue ───────────────────────────────────────────────────────
export interface PostPublishJobData {
  postId: string;
  channelId: string;
  platform: string;
  scheduledFor: string;
}

export function getPostPublishQueue(): Queue<PostPublishJobData> {
  return new Queue<PostPublishJobData>(QUEUE_NAMES.POST_PUBLISH, {
    connection: getRedisConnection(),
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 500 },
    },
  });
}

// ─── Webhook Process Queue ────────────────────────────────────────────────────
export interface WebhookJobData {
  platform: string;
  payload: Record<string, unknown>;
  receivedAt: string;
}

export function getWebhookQueue(): Queue<WebhookJobData> {
  return new Queue<WebhookJobData>(QUEUE_NAMES.WEBHOOK_PROCESS, {
    connection: getRedisConnection(),
    defaultJobOptions: {
      attempts: 5,
      backoff: { type: "fixed", delay: 2000 },
      removeOnComplete: { count: 500 },
      removeOnFail: { count: 200 },
    },
  });
}

// ─── Schedule a post ──────────────────────────────────────────────────────────
export async function schedulePost(
  data: PostPublishJobData,
  scheduledFor: Date
): Promise<string> {
  const queue = getPostPublishQueue();
  const delay = scheduledFor.getTime() - Date.now();

  const job = await queue.add(`publish-${data.postId}-${data.channelId}`, data, {
    delay: Math.max(delay, 0),
    jobId: `post-${data.postId}-${data.channelId}`,
  });

  return job.id as string;
}

// ─── Cancel a scheduled post ──────────────────────────────────────────────────
export async function cancelScheduledPost(
  postId: string,
  channelId: string
): Promise<boolean> {
  const queue = getPostPublishQueue();
  const job = await queue.getJob(`post-${postId}-${channelId}`);
  if (job) {
    await job.remove();
    return true;
  }
  return false;
}

// ─── Worker (runs in a separate process) ─────────────────────────────────────
export function createPostPublishWorker(
  processor: (job: Job<PostPublishJobData>) => Promise<void>
): Worker<PostPublishJobData> {
  return new Worker<PostPublishJobData>(
    QUEUE_NAMES.POST_PUBLISH,
    processor,
    {
      connection: getRedisConnection(),
      concurrency: 5,
    }
  );
}
