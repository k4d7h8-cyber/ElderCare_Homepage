import type { AdmissionContent } from "@/types/home";

import { collections, getDocumentRecord, readString, readStringArray } from "@/lib/firestore";

const fallbackAdmissionInfo: AdmissionContent = {
  title: "입소안내",
  description: "장기요양 등급 1~5등급 대상 · 국민건강보험 급여 적용",
  steps: [
    "전화 온라인 상담 신청",
    "방문 상담 및 시설 견학",
    "서류 제출 및 계약",
    "입소 및 케어 시작",
  ],
  documents: ["장기요양인정서", "의사소견서", "복용약 정보"],
  contactLabel: "입소 절차 자세히",
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
