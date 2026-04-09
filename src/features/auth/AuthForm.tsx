"use client";

import { useSearchParams } from "next/navigation";
import { useLanguage }     from "../../contexts/LanguageContext";
import { useAuthForm }     from "./hooks/useAuthForm";
import { AuthInput }       from "./AuthInput";
import Link                from "next/link";

export function AuthForm() {
  useLanguage();
  const searchParams   = useSearchParams();

  // ── URLパラメータからログイン/登録モードを判定 ──
  // /login?mode=signup → signup
  // /login?mode=login  → login（デフォルト）
  const mode    = searchParams.get("mode") === "signup" ? "signup" : "login";
  const isLogin = mode === "login";

  return <AuthFormPanel key={mode} isLogin={isLogin} />;
}

function AuthFormPanel({ isLogin }: { isLogin: boolean }) {
  const { t } = useLanguage();

  // ── hookから必要なものを受け取る ──
  // uiState → isLoadingとuiStateに変更（useAuthFormの返り値に合わせる）
  const {
    formData,
    isLoading,   // ← useAsyncStateから来るisLoading
    error,       // ← validationError ?? isError（hookで統合済み）
    handleChange,
    handleSubmit,
  } = useAuthForm(isLogin, t)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

      {/* ── タイトル: isLoginで文言を切り替え ── */}
      <h1 className="text-2xl font-bold text-center mb-8">
        {isLogin ? t("login.login.login") : t("login.login.singup")}
      </h1>

      {/* ── タブナビゲーション: URLを変えてモードを切り替え ── */}
      <nav
        className="flex justify-center mb-6 p-1 bg-gray-100 rounded-xl"
        aria-label="Tabs"
      >
        <Link
          href="/login?mode=login"
          className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all ${
            isLogin
              ? "bg-white shadow-sm text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("login.login.login")}
        </Link>
        <Link
          href="/login?mode=signup"
          className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all ${
            !isLogin
              ? "bg-white shadow-sm text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("login.login.singup")}
        </Link>
      </nav>

      {/* ── エラー表示: errorがある場合のみ表示 ── */}
      {/* uiState.error → error に変更 */}
      {error && (
        <div
          role="alert"
          className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100 animate-in fade-in"
        >
          {error}
        </div>
      )}

      {/* ── フォーム本体 ── */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* 登録時のみ: 名前フィールドを表示 */}
        {!isLogin && (
          <AuthInput
            label={t("login.login.name")}
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="username"
          />
        )}

        {/* 共通: メールアドレス */}
        <AuthInput
          label={t("login.login.email")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
        />

        {/* 共通: パスワード */}
        <AuthInput
          label={t("login.login.password")}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        {/* 登録時のみ: パスワード確認 */}
        {!isLogin && (
          <AuthInput
            label={t("login.login.confirmPassword")}
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        )}

        {/* ── 送信ボタン ── */}
        {/* isLoading中は押せない + カーソルを変える */}
        <button
          type="submit"
          disabled={isLoading}  // ← uiState.isLoading → isLoading
          className={`w-full py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all ${
            isLoading
              ? "opacity-70 cursor-wait"
              : "hover:bg-primary-hover active:scale-[0.98]"
          }`}
        >
          {/* isLoading中は"..."を表示 */}
          {isLoading
            ? "..."
            : isLogin
              ? t("login.login.login")
              : t("login.login.singup")
          }
        </button>
      </form>
    </div>
  );
}
