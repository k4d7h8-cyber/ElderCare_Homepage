import type { Timestamp } from "firebase/firestore";

export interface InquiryInput {
  name: string;
  phone: string;
  message: string;
}

export type InquiryStatus = "new" | "in_progress" | "completed";

export interface AdminInquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: InquiryStatus | null;
  isRead: boolean;
  source: string;
  createdAt: Timestamp | null;
}

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return value === "new" || value === "in_progress" || value === "completed";
}
