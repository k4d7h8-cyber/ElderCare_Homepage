"use client";

import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase";
import { hasAdminAccess } from "@/lib/adminAuth";

function getLoginErrorMessage(error: unknown) {
  if (
    error instanceof FirebaseError &&
    [
      "auth/invalid-credential",
      "auth/invalid-email",
      "auth/user-disabled",
      "auth/user-not-found",
      "auth/wrong-password",
    ].includes(error.code)
  ) {
    return "로그인 정보를 확인해주세요.";
  }

  return "로그인 처리 중 오류가 발생했습니다.";
}

export function AdminLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isActive = true;

    const queryError = new URLSearchParams(window.location.search).get("error");
    if (queryError === "unauthorized") {
      setErrorMessage("관리자 권한이 없습니다.");
    } else if (queryError === "auth-check") {
      setErrorMessage("로그인 처리 중 오류가 발생했습니다.");
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isActive) {
        return;
      }

      if (!user) {
        setIsCheckingAuth(false);
        setIsSubmitting(false);
        return;
      }

      try {
        const isAdmin = await hasAdminAccess(user.uid);

        if (!isActive) {
          return;
        }

        if (isAdmin) {
          router.replace("/admin");
          return;
        }

        await signOut(auth);
        if (isActive) {
          setErrorMessage("관리자 권한이 없습니다.");
          setIsCheckingAuth(false);
          setIsSubmitting(false);
        }
      } catch {
        if (!isActive) {
          return;
        }

        await signOut(auth).catch(() => undefined);
        if (isActive) {
          setErrorMessage("로그인 처리 중 오류가 발생했습니다.");
          setIsCheckingAuth(false);
          setIsSubmitting(false);
        }
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
    } catch (error) {
      setErrorMessage(getLoginErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <p className="text-sm font-semibold text-textSub">로그인 상태를 확인하고 있습니다.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Admin</p>
        <h1 className="mt-3 text-3xl font-bold text-textMain">관리자 로그인</h1>
        <p className="mt-3 text-sm leading-6 text-textSub">
          등록된 관리자 계정으로 로그인해주세요.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="admin-email" className="text-sm font-semibold text-textMain">
              이메일
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-slate-100"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="text-sm font-semibold text-textMain">
              비밀번호
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-slate-100"
            />
          </div>

          {errorMessage ? (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-primary px-6 py-3 font-bold text-white transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </section>
    </main>
  );
}

export function AdminHomeScreen() {
  return (
    <section className="grid gap-4 md:grid-cols-3" aria-label="관리자 기능">
      {["공지사항 관리", "갤러리 관리"].map((label) => (
        <div key={label} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="font-bold text-textMain">{label}</h2>
              <p className="mt-2 text-sm text-textSub">추후 구현 예정입니다.</p>
        </div>
      ))}
      <Link
        href="/admin/inquiries"
        className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <h2 className="font-bold text-textMain">상담문의 관리</h2>
        <p className="mt-2 text-sm text-textSub">접수된 상담문의를 확인하고 관리합니다.</p>
      </Link>
    </section>
  );
}
