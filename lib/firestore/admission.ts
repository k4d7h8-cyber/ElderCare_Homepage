import type { AdmissionContent } from "@/types/home";
import type { AdmissionPageContent } from "@/types/subpage";

import { collections, getDocumentRecord, readString, readStringArray } from "@/lib/firestore";

const fallbackAdmissionInfo: AdmissionContent = {
  title: "입소안내",
  description: "장기요양 등급 1~5등급 대상 및 국민건강보험 급여 적용",
  steps: [
    "전화 또는 온라인 상담 신청",
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

const fallbackAdmissionPageData: AdmissionPageContent = {
  targets: [
    {
      title: "장기요양등급을 받으신 어르신",
      description: "노인장기요양보험 등급 판정을 받은 어르신의 입소 상담이 가능합니다.",
    },
    {
      title: "일상생활 도움이 필요한 어르신",
      description: "식사, 이동, 위생, 복약 등 일상생활 지원이 필요한 경우 상담해주세요.",
    },
    {
      title: "보호자의 돌봄 부담이 큰 경우",
      description: "전문 인력의 지속적인 돌봄이 필요한 상황에 맞춰 안내드립니다.",
    },
  ],
  steps: [
    {
      title: "상담 신청",
      description: "전화 또는 온라인 상담으로 기본 정보를 확인합니다.",
    },
    {
      title: "방문 상담",
      description: "시설을 둘러보고 어르신 상태와 필요 서비스를 함께 살핍니다.",
    },
    {
      title: "서류 준비",
      description: "입소에 필요한 서류와 계약 절차를 안내드립니다.",
    },
    {
      title: "입소 및 적응 지원",
      description: "입소 후 생활 적응과 건강 상태를 세심하게 확인합니다.",
    },
  ],
  documents: [
    "장기요양인정서",
    "표준장기요양이용계획서",
    "의사소견서 또는 진단서",
    "복용 중인 약 처방전",
    "신분증 및 보호자 연락처",
  ],
  costs: [
    {
      category: "급여 항목",
      description: "장기요양보험 수가 기준에 따라 본인부담금이 산정됩니다.",
      note: "등급과 감경 여부에 따라 달라질 수 있습니다.",
    },
    {
      category: "비급여 항목",
      description: "식재료비, 상급 침실료 등 별도 항목이 발생할 수 있습니다.",
      note: "상담 시 상세히 안내드립니다.",
    },
    {
      category: "상담 안내",
      description: "개별 상황에 맞춘 예상 비용을 안내드립니다.",
      note: "최종 비용은 계약 전 확인합니다.",
    },
  ],
};

export async function getAdmissionPageData(): Promise<AdmissionPageContent> {
  const data = await getDocumentRecord(collections.homeContent, "admissionPage");

  if (!data) {
    return fallbackAdmissionPageData;
  }

  return fallbackAdmissionPageData;
}
