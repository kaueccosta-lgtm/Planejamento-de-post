// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = "ADMIN" | "MANAGER" | "EDITOR" | "VIEWER" | "CLIENT";

export type Platform =
  | "INSTAGRAM"
  | "FACEBOOK"
  | "LINKEDIN"
  | "TIKTOK"
  | "YOUTUBE"
  | "TWITTER";

export type PostStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "APPROVED"
  | "SCHEDULED"
  | "PUBLISHED"
  | "FAILED"
  | "CANCELLED";

export type DemandStatus =
  | "BRIEFING"
  | "DESIGN"
  | "COPY"
  | "REVIEW"
  | "APPROVAL"
  | "SCHEDULED"
  | "PUBLISHED"
  | "CANCELLED";

export type IdeaStatus =
  | "NEW"
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | "ARCHIVED";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type ApprovalTokenStatus = "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

export type Sentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

export type ReportType =
  | "PERFORMANCE"
  | "ENGAGEMENT"
  | "REACH"
  | "COMPETITOR"
  | "CUSTOM";

// ─── Models ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialAccount {
  id: string;
  platform: Platform;
  accountName: string;
  accountId: string;
  accessToken: string;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  isActive: boolean;
  avatarUrl: string | null;
  followers: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Obra {
  id: string;
  name: string;
  description: string | null;
  client: string | null;
  color: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Idea {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  status: IdeaStatus;
  priority: Priority;
  tags: string[];
  obraId: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  obra?: Obra;
  createdBy?: User;
}

export interface Demand {
  id: string;
  title: string;
  description: string | null;
  format: string | null;
  status: DemandStatus;
  priority: Priority;
  dueDate: Date | null;
  obraId: string | null;
  createdById: string;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
  obra?: Obra;
  createdBy?: User;
  assignedTo?: User;
  posts?: Post[];
  approvalTokens?: ApprovalToken[];
}

export interface ApprovalToken {
  id: string;
  token: string;
  demandId: string;
  postId: string | null;
  status: ApprovalTokenStatus;
  expiresAt: Date;
  usedAt: Date | null;
  feedback: string | null;
  createdAt: Date;
  demand?: Demand;
  post?: Post;
}

export interface Post {
  id: string;
  title: string | null;
  caption: string | null;
  scheduledFor: Date | null;
  publishedAt: Date | null;
  status: PostStatus;
  obraId: string | null;
  demandId: string | null;
  createdById: string;
  hashtags: string[];
  mentions: string[];
  firstComment: string | null;
  createdAt: Date;
  updatedAt: Date;
  obra?: Obra;
  demand?: Demand;
  createdBy?: User;
  channels?: PostChannel[];
  media?: Media[];
}

export interface PostChannel {
  id: string;
  postId: string;
  socialAccountId: string;
  status: PostStatus;
  publishedAt: Date | null;
  platformPostId: string | null;
  error: string | null;
  customCaption: string | null;
  scheduledFor: Date | null;
  socialAccount?: SocialAccount;
}

export interface Media {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  duration: number | null;
  postId: string | null;
  altText: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  platformId: string;
  platform: Platform;
  authorName: string;
  authorAvatar: string | null;
  content: string;
  sentiment: Sentiment | null;
  isResolved: boolean;
  replyContent: string | null;
  repliedAt: Date | null;
  repliedById: string | null;
  postPlatformId: string | null;
  createdAt: Date;
  updatedAt: Date;
  repliedBy?: User;
}

export interface Conversation {
  id: string;
  platform: Platform;
  socialAccountId: string;
  participantName: string;
  participantId: string;
  participantAvatar: string | null;
  lastMessageAt: Date | null;
  isRead: boolean;
  isResolved: boolean;
  createdAt: Date;
  updatedAt: Date;
  socialAccount?: SocialAccount;
  messages?: Message[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string | null;
  senderName: string;
  content: string;
  mediaUrl: string | null;
  isFromUs: boolean;
  platformMsgId: string | null;
  createdAt: Date;
  sender?: User;
}

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  startDate: Date;
  endDate: Date;
  data: Record<string, unknown>;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
}

export interface Competitor {
  id: string;
  name: string;
  platform: Platform;
  platformId: string;
  socialAccountId: string | null;
  followers: number | null;
  engagementRate: number | null;
  lastAnalyzedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: Date;
  user?: User;
}

// ─── App-specific types ───────────────────────────────────────────────────────

export interface DashboardStats {
  nextPostsCount: number;
  pendingApprovalsCount: number;
  unreadDMsCount: number;
  recentCommentsCount: number;
  monthPerformance: PerformanceMetric;
  todaysPostsCount: number;
  alertsCount: number;
}

export interface PerformanceMetric {
  reach: number;
  impressions: number;
  engagements: number;
  engagementRate: number;
  followers: number;
  followerGrowth: number;
}

export interface KanbanColumn {
  id: DemandStatus;
  label: string;
  color: string;
  demands: Demand[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  status: PostStatus;
  platforms: Platform[];
  obraColor?: string;
}

export interface CaptionGenerationRequest {
  context: string;
  platform: Platform;
  tone: string;
  keywords?: string[];
  obraName?: string;
}

export interface CaptionGenerationResponse {
  captions: string[];
  hashtags: string[];
}

export interface UploadedFile {
  name: string;
  url: string;
  type: string;
  size: number;
}
