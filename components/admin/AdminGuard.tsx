"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";

import { auth } from "@/lib/firebase";
import { hasAdminAccess } from "@/lib/adminAuth";

type AdminGuardProps = {
  children: ReactNode;
};

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isActive = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const isAdmin = await hasAdminAccess(user.uid);

        if (!isActive) {
          return;
        }

        if (isAdmin) {
          setIsAuthorized(true);
          return;
        }

        await signOut(auth);
        router.replace("/login?error=unauthorized");
      } catch {
        if (!isActive) {
          return;
        }

        await signOut(auth).catch(() => undefined);
        router.replace("/login?error=auth-check");
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setErrorMessage("");

    try {
      await signOut(auth);
      router.replace("/login");
    } catch {
      setErrorMessage("로그아웃 처리 중 오류가 발생했습니다.");
      setIsSigningOut(false);
    }
  };

  if (!isAuthorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-4">
        <p className="text-sm font-semibold text-textSub">관리자 권한을 확인하고 있습니다.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Admin</p>
            <Link
              href="/admin"
              className="mt-2 inline-block rounded text-3xl font-bold text-textMain transition hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              관리자 페이지
            </Link>
            <p className="mt-3 text-sm text-textSub">로그인된 관리자만 접근할 수 있습니다.</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="rounded-full border border-primary/30 bg-white px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningOut ? "로그아웃 중..." : "로그아웃"}
          </button>
        </header>

        {errorMessage ? (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
