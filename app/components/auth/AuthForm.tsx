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
}