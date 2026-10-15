import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  type DocumentData,
  type DocumentSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { isRecord, readBoolean, readString } from "@/lib/firestore";
import {
  isInquiryStatus,
  type AdminInquiry,
  type InquiryStatus,
} from "@/types/inquiry";

const inquiriesCollection = collection(db, "inquiries");

function mapAdminInquiry(snapshot: DocumentSnapshot<DocumentData>): AdminInquiry | null {
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  if (!isRecord(data)) {
    return null;
  }

  return {
    id: snapshot.id,
    name: readString(data.name),
    phone: readString(data.phone),
    message: readString(data.message),
    status: isInquiryStatus(data.status) ? data.status : null,
    isRead: readBoolean(data.isRead),
    source: readString(data.source),
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
  };
}

export async function getAdminInquiries(): Promise<AdminInquiry[]> {
  // Firestore orderBy queries can omit documents that do not contain the ordered field.
  const inquiriesQuery = query(
    inquiriesCollection,
    orderBy("createdAt", "desc"),
    limit(50),
  );
  const snapshot = await getDocs(inquiriesQuery);

  return snapshot.docs
    .map(mapAdminInquiry)
    .filter((inquiry): inquiry is AdminInquiry => inquiry !== null);
}

export async function getAdminInquiryById(id: string): Promise<AdminInquiry | null> {
  const snapshot = await getDoc(doc(inquiriesCollection, id));
  return mapAdminInquiry(snapshot);
}

export async function markInquiryAsRead(id: string): Promise<void> {
  await updateDoc(doc(inquiriesCollection, id), {
    isRead: true,
  });
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
): Promise<void> {
  await updateDoc(doc(inquiriesCollection, id), {
    status,
  });
}
