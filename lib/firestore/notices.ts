import { doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";

import type { Notice } from "@/types/home";
import type { NoticeDetail, NoticeListItem } from "@/types/subpage";
import { collections, isRecord, readArray, readBoolean, readString } from "@/lib/firestore";

const fallbackTopBannerNotice: Notice = {
  id: "fallback-top-banner",
  title: "상담은 예약제로 운영됩니다.",
  summary: "방문 상담을 원하시면 전화 또는 온라인 문의를 남겨주세요.",
  href: "/notices",
  publishedAt: "",
  isTopBanner: true,
  isVisible: true,
};

export async function getTopBannerNotice(): Promise<Notice> {
  try {
    const noticesQuery = query(
      collections.notices,
      where("isTopBanner", "==", true),
      where("isVisible", "==", true),
      orderBy("publishedAt", "desc"),
      limit(1),
    );

    const snapshot = await getDocs(noticesQuery);
    const document = snapshot.docs[0];

    if (!document) {
      return fallbackTopBannerNotice;
    }

    const data = document.data();

    if (!isRecord(data)) {
      return fallbackTopBannerNotice;
    }

    return {
      id: document.id,
      title: readString(data.title, fallbackTopBannerNotice.title),
      summary: readString(data.summary, fallbackTopBannerNotice.summary),
      href: readString(data.href, fallbackTopBannerNotice.href),
      publishedAt: readString(data.publishedAt),
      isTopBanner: readBoolean(data.isTopBanner, true),
      isVisible: readBoolean(data.isVisible, true),
    };
  } catch {
    return fallbackTopBannerNotice;
  }
}

const fallbackNoticesPageData: NoticeDetail[] = [
  {
    id: "notice-1",
    title: "5월 면회 일정 안내",
    summary: "가정의 달 면회 예약 운영 시간을 안내드립니다.",
    publishedAt: "2026.05.01",
    isPinned: true,
    isVisible: true,
    content:
      "5월 면회는 사전 예약제로 운영됩니다. 방문을 희망하시는 보호자께서는 전날까지 연락해주시기 바랍니다.",
    attachments: [],
    nextId: "notice-2",
  },
  {
    id: "notice-2",
    title: "봄맞이 프로그램 운영 안내",
    summary: "어르신 정서 지원을 위한 봄 프로그램을 운영합니다.",
    publishedAt: "2026.04.20",
    isPinned: false,
    isVisible: true,
    content:
      "미술, 음악, 산책 활동을 중심으로 봄맞이 프로그램을 운영합니다. 프로그램 사진은 포토 앨범에서 순차적으로 확인하실 수 있습니다.",
    attachments: [{ name: "프로그램 안내문.pdf", url: "#" }],
    previousId: "notice-1",
    nextId: "notice-3",
  },
  {
    id: "notice-3",
    title: "시설 환경 정비 완료 안내",
    summary: "생활 공간과 공용 공간 정비를 완료했습니다.",
    publishedAt: "2026.04.10",
    isPinned: false,
    isVisible: true,
    content:
      "어르신께서 더 쾌적하게 생활하실 수 있도록 생활실과 공용 공간의 환경 정비를 완료했습니다.",
    attachments: [],
    previousId: "notice-2",
  },
];

function toNoticeListItem(notice: NoticeDetail): NoticeListItem {
  return {
    id: notice.id,
    title: notice.title,
    summary: notice.summary,
    publishedAt: notice.publishedAt,
    isPinned: notice.isPinned,
    isVisible: notice.isVisible,
  };
}

export async function getNoticesPageData(): Promise<NoticeListItem[]> {
  try {
    const noticesQuery = query(
      collections.notices,
      where("isVisible", "==", true),
      orderBy("isPinned", "desc"),
      orderBy("publishedAt", "desc"),
      limit(20),
    );

    const snapshot = await getDocs(noticesQuery);
    const notices = snapshot.docs
      .map((document) => {
        const data = document.data();

        if (!isRecord(data)) {
          return null;
        }

        return {
          id: document.id,
          title: readString(data.title),
          summary: readString(data.summary),
          publishedAt: readString(data.publishedAt),
          isPinned: readBoolean(data.isPinned),
          isVisible: readBoolean(data.isVisible, true),
        } satisfies NoticeListItem;
      })
      .filter((notice): notice is NoticeListItem => notice !== null && notice.title.length > 0);

    return notices.length > 0 ? notices : fallbackNoticesPageData.map(toNoticeListItem);
  } catch {
    return fallbackNoticesPageData.map(toNoticeListItem);
  }
}

export async function getNoticeDetailData(id: string): Promise<NoticeDetail | null> {
  try {
    const snapshot = await getDoc(doc(collections.notices, id));

    if (!snapshot.exists()) {
      return fallbackNoticesPageData.find((notice) => notice.id === id) ?? fallbackNoticesPageData[0] ?? null;
    }

    const data = snapshot.data();

    if (!isRecord(data)) {
      return null;
    }

    const attachments = readArray(data.attachments)
      .map((attachment) => ({
        name: readString(attachment.name),
        url: readString(attachment.url),
      }))
      .filter((attachment) => attachment.name.length > 0 && attachment.url.length > 0);

    return {
      id: snapshot.id,
      title: readString(data.title),
      summary: readString(data.summary),
      publishedAt: readString(data.publishedAt),
      isPinned: readBoolean(data.isPinned),
      isVisible: readBoolean(data.isVisible, true),
      content: readString(data.content),
      attachments,
      previousId: readString(data.previousId) || undefined,
      nextId: readString(data.nextId) || undefined,
    };
  } catch {
    return fallbackNoticesPageData.find((notice) => notice.id === id) ?? fallbackNoticesPageData[0] ?? null;
  }
}
