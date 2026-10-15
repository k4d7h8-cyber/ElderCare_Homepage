import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function hasAdminAccess(uid: string): Promise<boolean> {
  const adminSnapshot = await getDoc(doc(db, "admins", uid));
  return adminSnapshot.exists();
}
