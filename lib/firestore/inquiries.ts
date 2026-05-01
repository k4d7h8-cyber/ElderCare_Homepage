import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { InquiryInput } from "@/types/inquiry";

export async function createInquiry({ name, phone, message }: InquiryInput): Promise<void> {
  await addDoc(collection(db, "inquiries"), {
    name,
    phone,
    message,
    status: "new",
    isRead: false,
    source: "homepage",
    createdAt: serverTimestamp(),
  });
}
