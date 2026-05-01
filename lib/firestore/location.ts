import type { LocationContent } from "@/types/home";
import type { LocationPageContent } from "@/types/subpage";

import { collections, getDocumentRecord, readString, readStringArray } from "@/lib/firestore";

const fallbackLocationInfo: LocationContent = {
  name: "안안 요양원",
  address: "서울특별시 강남구 테헤란로 123",
  detailAddress: "",
  phone: "000-0000-0000",
  mapEmbedUrl: "",
  traffic: [],
  parking: "방문 상담 시 주차 가능 여부를 안내드립니다.",
};

export async function getLocationInfo(): Promise<LocationContent> {
  const data = await getDocumentRecord(collections.homeContent, "location");

  if (!data) {
    return fallbackLocationInfo;
  }

  const traffic = readStringArray(data.traffic);

  return {
    name: readString(data.name, fallbackLocationInfo.name),
    address: readString(data.address, fallbackLocationInfo.address),
    detailAddress: readString(data.detailAddress, fallbackLocationInfo.detailAddress),
    phone: readString(data.phone, fallbackLocationInfo.phone),
    mapEmbedUrl: readString(data.mapEmbedUrl),
    traffic: traffic.length > 0 ? traffic : fallbackLocationInfo.traffic,
    parking: readString(data.parking, fallbackLocationInfo.parking),
  };
}

const fallbackLocationPageData: LocationPageContent = {
  address: "서울특별시 강남구 테헤란로 123",
  detailAddress: "안안 요양원",
  mapEmbedUrl: "",
  parking: "방문 상담 시 건물 내 주차 가능 여부를 미리 안내드립니다.",
};

export async function getLocationPageData(): Promise<LocationPageContent> {
  const data = await getDocumentRecord(collections.homeContent, "location");

  if (!data) {
    return fallbackLocationPageData;
  }

  return {
    address: readString(data.address, fallbackLocationPageData.address),
    detailAddress: readString(data.detailAddress, fallbackLocationPageData.detailAddress),
    mapEmbedUrl: readString(data.mapEmbedUrl, fallbackLocationPageData.mapEmbedUrl),
    parking: readString(data.parking, fallbackLocationPageData.parking),
  };
}
