// components/SessionExpiredModal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionGuard } from "@/hooks/useSessionGuard";
import { useLanguage } from "@/contexts/LanguageContext"; // あなたの既存 i18n hook
import { resetSessionExpired } from "@/lib/session";

/**
 * モーダル表示中はサーバの /api/auth/logout を呼んで cookie を消してから
 * reset() → /login へ遷移します。
 *
 * 注意: サーバ側クッキーが httpOnly の場合、クライアントで document.cookie を消しても無意味なので
 * サーバで cookie を削除するエンドポイントを呼ぶのが正しい方法です。
 */

export default function SessionExpiredModal() {
  const { t } = useLanguage();
  const { isExpired, reset } = useSessionGuard();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isExpired) return null;

  const handleGoToLogin = async () => {
    try {
      setIsLoggingOut(true);

      // サーバ側で token / refreshToken を削除するエンドポイントを呼ぶ
      // 必要に応じて POST に変更してください
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // reset UI（他タブにも通知される）
      reset();

      // 強制的にログイン画面へ
      router.push("/login");
      router.refresh();
    } catch (e) {
      // ここでは toast を出すかロギング（省略）
      reset();
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl text-center">
        <p className="text-4xl mb-4">🔒</p>
        <h2 className="text-xl font-bold mb-2">{t("context.sessionExpired.title")}</h2>
        <p className="text-muted-foreground text-sm mb-6">
          {t("context.sessionExpired.message")}
        </p>
        <button
          onClick={handleGoToLogin}
          disabled={isLoggingOut}
          className="w-full py-3 bg-primary text-white rounded-xl font-medium"
        >
          {isLoggingOut ? t("context.sessionExpired.loggingOut") ?? "Processing..." : t("context.sessionExpired.button")}
        </button>
      </div>
    </div>
  );
}