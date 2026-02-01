"use client";

import { useSearchParams } from "next/navigation";
import { useLanguage } from "contexts/LanguageContext";
import { useAuthForm } from "./hooks/useAuthForm";
import { AuthInput } from "./AuthInput";
import Link from "next/link";

export function AuthForm() {
    const {t} = useLanguage();
    const searchParams = useSearchParams();
    // URLからモードを導出
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const isLogin = mode === "login";

  const {formData, uiState,handleChange, handleSubmit} = useAuthForm(isLogin,t);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h1 className="text-2xl font-bold text-center mb-8">{t("login.login.title")}</h1>

      {/* タブUIのロジック: 現在のモードに応じてスタイルを動的に変更 */}
      <nav className="flex justify-center mb-6 p-1 bg-gray-100 rounded-xl" aria-label="Tabs">
        <Link
          href="/login?mode=login"
          className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all ${
            isLogin ? "bg-white shadow-sm text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("login.login.login")}
        </Link>
        <Link
          href="/login?mode=signup"
          className={`flex-1 text-center py-2 text-sm font-medium rounded-lg transition-all ${
            !isLogin ? "bg-white shadow-sm text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t("login.login.signup")}
        </Link>
      </nav>

      {/* 条件付きレンダリング: エラーがあれば表示 */}
      {uiState.error && (
        <div role="alert" className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100 animate-in fade-in">
          {uiState.error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
            <AuthInput
                label={t("login.login.name")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="username"
            />
        )}
        <AuthInput
          label={t("login.login.email")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <AuthInput
          label={t("login.login.password")}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete={isLogin ? "current-password" : "new-password"}
        />

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
        <button
          type="submit"
          disabled={uiState.isLoading}
          className={`w-full py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all ${
            uiState.isLoading ? "opacity-70 cursor-wait" : "hover:bg-primary-hover active:scale-[0.98]"
          }`}
        >
          {uiState.isLoading ? "..." : isLogin ? t("login.login.submit") : t("login.login.signup")}
        </button>
      </form>
      </div>
  );
}