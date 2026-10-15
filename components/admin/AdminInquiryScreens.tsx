"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Timestamp } from "firebase/firestore";

import {
  getAdminInquiries,
  getAdminInquiryById,
  markInquiryAsRead,
  updateInquiryStatus,
} from "@/lib/firestore/adminInquiries";
import {
  isInquiryStatus,
  type AdminInquiry,
  type InquiryStatus,
} from "@/types/inquiry";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const statusLabels: Record<InquiryStatus, string> = {
  new: "신규",
  in_progress: "처리중",
  completed: "처리완료",
};

function formatInquiryDate(timestamp: Timestamp | null): string {
  if (!timestamp) {
    return "-";
  }

  const date = timestamp.toDate();

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const parts = Object.fromEntries(
    dateFormatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );

  if (!parts.year || !parts.month || !parts.day || !parts.hour || !parts.minute) {
    return "-";
  }

  return `${parts.year}.${parts.month}.${parts.day} ${parts.hour}:${parts.minute}`;
}

function getStatusLabel(status: InquiryStatus | null): string {
  return status ? statusLabels[status] : "상태 미확인";
}

function StatusBadge({ status }: { status: InquiryStatus | null }) {
  const colorClass =
    status === "new"
      ? "bg-blue-50 text-blue-700"
      : status === "in_progress"
        ? "bg-amber-50 text-amber-700"
        : status === "completed"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${colorClass}`}>
      {getStatusLabel(status)}
    </span>
  );
}

function PageHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Inquiries</p>
      <h1 className="mt-2 text-2xl font-bold text-textMain md:text-3xl">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-textSub">{description}</p>
    </div>
  );
}

export function AdminInquiryListScreen() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadInquiries() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const nextInquiries = await getAdminInquiries();

        if (isActive) {
          setInquiries(nextInquiries);
        }
      } catch {
        if (isActive) {
          setErrorMessage("상담문의를 불러오지 못했습니다.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadInquiries();

    return () => {
      isActive = false;
    };
  }, [requestKey]);

  return (
    <>
      <PageHeading
        title="상담문의 관리"
        description="홈페이지를 통해 접수된 상담문의를 최신순으로 확인합니다."
      />

      <section className="mt-6" aria-label="상담문의 목록" aria-busy={isLoading}>
        {isLoading ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-semibold text-textSub">상담문의를 불러오고 있습니다.</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p role="alert" className="text-sm font-semibold text-red-700">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => setRequestKey((current) => current + 1)}
              className="mt-5 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              다시 시도
            </button>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-textMain">접수된 상담문의가 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
              <table className="w-full table-fixed border-collapse text-left">
                <thead className="bg-slate-50 text-xs font-bold text-textSub">
                  <tr>
                    <th className="w-24 px-4 py-4">읽음</th>
                    <th className="w-40 px-4 py-4">접수일시</th>
                    <th className="w-28 px-4 py-4">이름</th>
                    <th className="w-36 px-4 py-4">연락처</th>
                    <th className="px-4 py-4">문의내용</th>
                    <th className="w-28 px-4 py-4">처리상태</th>
                    <th className="w-24 px-4 py-4"><span className="sr-only">상세</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="text-sm text-textMain hover:bg-slate-50/70">
                      <td className="px-4 py-4">
                        <span
                          className={
                            inquiry.isRead
                              ? "text-xs font-semibold text-textSub"
                              : "rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700"
                          }
                        >
                          {inquiry.isRead ? "읽음" : "안읽음"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-textSub">
                        {formatInquiryDate(inquiry.createdAt)}
                      </td>
                      <td className="truncate px-4 py-4 font-semibold">{inquiry.name || "-"}</td>
                      <td className="truncate px-4 py-4">{inquiry.phone || "-"}</td>
                      <td className="px-4 py-4">
                        <p className="line-clamp-2 break-words text-textSub">
                          {inquiry.message || "-"}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={inquiry.status} />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Link
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="rounded font-bold text-primary hover:text-primaryDark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          상세보기
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 md:hidden">
              {inquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href={`/admin/inquiries/${inquiry.id}`}
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={
                        inquiry.isRead
                          ? "text-xs font-semibold text-textSub"
                          : "rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700"
                      }
                    >
                      {inquiry.isRead ? "읽음" : "안읽음"}
                    </span>
                    <StatusBadge status={inquiry.status} />
                  </div>
                  <p className="mt-4 text-xs font-semibold text-textSub">
                    {formatInquiryDate(inquiry.createdAt)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <strong className="text-textMain">{inquiry.name || "-"}</strong>
                    <span className="text-textSub">{inquiry.phone || "-"}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 whitespace-pre-line break-words text-sm leading-6 text-textSub">
                    {inquiry.message || "-"}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

type AdminInquiryDetailScreenProps = {
  id: string;
};

export function AdminInquiryDetailScreen({ id }: AdminInquiryDetailScreenProps) {
  const [inquiry, setInquiry] = useState<AdminInquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [readError, setReadError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [requestKey, setRequestKey] = useState(0);
  const readAttempts = useRef(new Set<string>());

  useEffect(() => {
    let isActive = true;

    async function loadInquiry() {
      setIsLoading(true);
      setIsNotFound(false);
      setLoadError("");
      setReadError("");

      try {
        const nextInquiry = await getAdminInquiryById(id);

        if (!isActive) {
          return;
        }

        if (!nextInquiry) {
          setInquiry(null);
          setIsNotFound(true);
          return;
        }

        setInquiry(nextInquiry);

        if (!nextInquiry.isRead && !readAttempts.current.has(id)) {
          readAttempts.current.add(id);

          try {
            await markInquiryAsRead(id);

            if (isActive) {
              setInquiry((current) =>
                current?.id === id ? { ...current, isRead: true } : current,
              );
            }
          } catch {
            if (isActive) {
              setReadError("읽음 상태를 저장하지 못했습니다.");
            }
          }
        }
      } catch {
        if (isActive) {
          setInquiry(null);
          setLoadError("상담문의 상세를 불러오지 못했습니다.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadInquiry();

    return () => {
      isActive = false;
    };
  }, [id, requestKey]);

  const handleStatusChange = async (value: string) => {
    if (!inquiry || !isInquiryStatus(value) || value === inquiry.status || isUpdatingStatus) {
      return;
    }

    setIsUpdatingStatus(true);
    setStatusError("");
    setStatusMessage("");

    try {
      await updateInquiryStatus(inquiry.id, value);
      setInquiry((current) => (current ? { ...current, status: value } : current));
      setStatusMessage("처리상태가 변경되었습니다.");
    } catch {
      setStatusError("처리상태를 변경하지 못했습니다.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <>
      <PageHeading
        title="상담문의 상세"
        description="접수된 내용을 확인하고 처리상태를 변경할 수 있습니다."
      />

      <div className="mt-6 flex justify-end">
        <Link
          href="/admin/inquiries"
          className="inline-flex rounded text-sm font-bold text-primary hover:text-primaryDark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>

      <section className="mt-4 rounded-2xl bg-white p-6 shadow-sm md:p-8" aria-busy={isLoading}>
        {isLoading ? (
          <p className="py-8 text-center text-sm font-semibold text-textSub">
            상담문의를 불러오고 있습니다.
          </p>
        ) : loadError ? (
          <div className="py-8 text-center">
            <p role="alert" className="text-sm font-semibold text-red-700">
              {loadError}
            </p>
            <button
              type="button"
              onClick={() => setRequestKey((current) => current + 1)}
              className="mt-5 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              다시 시도
            </button>
          </div>
        ) : isNotFound || !inquiry ? (
          <div className="py-8 text-center">
            <p className="font-semibold text-textMain">존재하지 않는 문의입니다.</p>
            <Link
              href="/admin/inquiries"
              className="mt-5 inline-flex rounded-full border border-primary/30 px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              목록으로 돌아가기
            </Link>
          </div>
        ) : (
          <div>
            <dl className="grid gap-6 border-b border-slate-100 pb-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-xs font-bold text-textSub">접수일시</dt>
                <dd className="mt-2 text-sm font-semibold text-textMain">
                  {formatInquiryDate(inquiry.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-textSub">이름</dt>
                <dd className="mt-2 text-sm font-semibold text-textMain">
                  {inquiry.name || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-textSub">연락처</dt>
                <dd className="mt-2 text-sm font-semibold text-textMain">
                  {inquiry.phone || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-textSub">읽음 상태</dt>
                <dd className="mt-2 text-sm font-semibold text-textMain">
                  {inquiry.isRead ? "읽음" : "안읽음"}
                </dd>
              </div>
            </dl>

            {readError ? (
              <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {readError}
              </p>
            ) : null}

            <div className="mt-8">
              <h2 className="text-sm font-bold text-textSub">문의내용</h2>
              <p className="mt-3 min-h-32 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-5 text-sm leading-7 text-textMain">
                {inquiry.message || "-"}
              </p>
            </div>

            <div className="mt-8 max-w-sm">
              <label htmlFor="inquiry-status" className="text-sm font-bold text-textSub">
                처리상태
              </label>
              <select
                id="inquiry-status"
                value={inquiry.status ?? ""}
                onChange={(event) => void handleStatusChange(event.target.value)}
                disabled={isUpdatingStatus}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-100"
              >
                {inquiry.status === null ? <option value="">상태 미확인</option> : null}
                <option value="new">신규</option>
                <option value="in_progress">처리중</option>
                <option value="completed">처리완료</option>
              </select>
              <div className="mt-3 min-h-6 text-sm" aria-live="polite">
                {isUpdatingStatus ? (
                  <p className="font-semibold text-textSub">처리상태를 변경하고 있습니다.</p>
                ) : statusError ? (
                  <p role="alert" className="font-semibold text-red-700">{statusError}</p>
                ) : statusMessage ? (
                  <p className="font-semibold text-emerald-700">{statusMessage}</p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
