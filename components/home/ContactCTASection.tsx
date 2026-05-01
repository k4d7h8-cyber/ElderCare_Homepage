"use client";

import { FormEvent, useState } from "react";

import { createInquiry } from "@/lib/firestore/inquiries";
import type { SiteConfig } from "@/types/home";

type ContactCTASectionProps = {
  siteConfig: SiteConfig;
};

type ContactMode = "cards" | "form";

const fallbackPhoneNumber = "000-0000-0000";

export function ContactCTASection({ siteConfig }: ContactCTASectionProps) {
  const [mode, setMode] = useState<ContactMode>("cards");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneNumber = siteConfig.phone?.trim() || fallbackPhoneNumber;

  const resetForm = () => {
    setName("");
    setPhone("");
    setMessage("");
  };

  const handleBackToCards = () => {
    setMode("cards");
    setFeedbackMessage("");
  };

  const handleOpenForm = () => {
    setMode("form");
    setFeedbackMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setFeedbackMessage("이름을 입력해주세요.");
      return;
    }

    if (!trimmedPhone) {
      setFeedbackMessage("연락처를 입력해주세요.");
      return;
    }

    if (!trimmedMessage) {
      setFeedbackMessage("문의 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage("");

    try {
      await createInquiry({
        name: trimmedName,
        phone: trimmedPhone,
        message: trimmedMessage,
      });
      resetForm();
      setFeedbackMessage("문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    } catch {
      setFeedbackMessage("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-cta" className="border-t border-slate-200 bg-surface px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {mode === "cards" ? (
          <>
            <p className="text-center text-sm font-semibold text-textSub">상담 · 전화 바로가기</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={handleOpenForm}
                className="w-full rounded-2xl bg-primary/10 p-8 text-center shadow-sm transition hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <p className="text-lg font-bold text-primary">온라인 상담</p>
                <p className="mt-2 text-sm text-textSub">문의 남기기</p>
              </button>

              <a
                href={`tel:${phoneNumber}`}
                className="block rounded-2xl bg-emerald-50 p-8 text-center shadow-sm transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
              >
                <p className="text-lg font-bold text-emerald-700">전화 상담</p>
                <p className="mt-2 text-sm text-textSub">{phoneNumber}</p>
              </a>
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-card p-6 shadow-sm md:p-8">
            <button
              type="button"
              onClick={handleBackToCards}
              className="text-sm font-semibold text-textSub transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              ← 돌아가기
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm font-bold tracking-widest text-primary">ADVICE</p>
              <h2 className="mt-3 text-2xl font-bold text-textMain md:text-3xl">
                궁금한 점을 남겨주시면 연락드리겠습니다
              </h2>
              <p className="mt-3 text-sm leading-6 text-textSub md:text-base">
                입소 상담, 비용 문의, 시설 안내 등 편하게 문의해주세요.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-4xl">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-textMain">이름</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-textMain outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="이름을 입력해주세요"
                      disabled={isSubmitting}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-textMain">연락처</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-textMain outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="연락처를 입력해주세요"
                      disabled={isSubmitting}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-textMain">문의 내용</span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="mt-2 min-h-40 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-textMain outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 md:min-h-full"
                    placeholder="문의 내용을 입력해주세요"
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              {feedbackMessage ? (
                <p className="mt-5 text-center text-sm font-semibold text-textSub">{feedbackMessage}</p>
              ) : null}

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 md:max-w-md"
                >
                  {isSubmitting ? "접수 중..." : "문의하기"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
