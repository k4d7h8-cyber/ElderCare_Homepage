import { collection, doc, getDoc, type CollectionReference, type DocumentData } from "firebase/firestore";

import { db } from "@/lib/firebase";

export const collections = {
  siteConfig: collection(db, "siteConfig"),
  menus: collection(db, "menus"),
  homeContent: collection(db, "homeContent"),
  notices: collection(db, "notices"),
  gallery: collection(db, "gallery"),
};

export const documentRefs = {
  siteConfigMain: doc(collections.siteConfig, "main"),
  gnbMenu: doc(collections.menus, "gnb"),
  lnbMenu: doc(collections.menus, "lnb"),
  hero: doc(collections.homeContent, "hero"),
  trust: doc(collections.homeContent, "trust"),
  admission: doc(collections.homeContent, "admission"),
  services: doc(collections.homeContent, "services"),
  gallery: doc(collections.homeContent, "gallery"),
  location: doc(collections.homeContent, "location"),
};

type FirestoreRecord = Record<string, unknown>;

export function isRecord(value: unknown): value is FirestoreRecord {
  return typeof value === "object" && value !== null;
}

export function readString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export function readNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function readBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

export function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function readArray(value: unknown): FirestoreRecord[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord);
}

export async function getDocumentRecord(
  collectionRef: CollectionReference<DocumentData>,
  documentId: string,
): Promise<FirestoreRecord | null> {
  try {
    const snapshot = await getDoc(doc(collectionRef, documentId));

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();
    return isRecord(data) ? data : null;
  } catch {
    return null;
  }
}
