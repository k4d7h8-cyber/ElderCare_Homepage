import type { LocationContent } from "@/types/home";

import { collections, getDocumentRecord, readString, readStringArray } from "@/lib/firestore";

const fallbackLocationInfo: LocationContent = {
  name: "편안한 요양원",
  address: "○○시 ○○구 ○○로 123",
  detailAddress: "",
  phone: "000-0000-0000",
  mapEmbedUrl: "",
  traffic: [],
  parking: "",
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
