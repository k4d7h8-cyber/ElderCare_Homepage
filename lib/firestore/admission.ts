import type { AdmissionContent } from "@/types/home";

import { collections, getDocumentRecord, readString, readStringArray } from "@/lib/firestore";

const fallbackAdmissionInfo: AdmissionContent = {
  title: "Admission Process",
  description: "A simple step-by-step flow from consultation to move-in.",
  steps: ["Request consultation", "Tour and consultation", "Document review", "Move-in schedule"],
  documents: ["Long-term care certificate", "Medical report", "Medication list"],
  contactLabel: "Book Admission Consultation",
};

export async function getAdmissionInfo(): Promise<AdmissionContent> {
  const data = await getDocumentRecord(collections.homeContent, "admission");

  if (!data) {
    return fallbackAdmissionInfo;
  }

  const steps = readStringArray(data.steps);
  const documents = readStringArray(data.documents);

  return {
    title: readString(data.title, fallbackAdmissionInfo.title),
    description: readString(data.description, fallbackAdmissionInfo.description),
    steps: steps.length > 0 ? steps : fallbackAdmissionInfo.steps,
    documents: documents.length > 0 ? documents : fallbackAdmissionInfo.documents,
    contactLabel: readString(data.contactLabel, fallbackAdmissionInfo.contactLabel),
  };
}
