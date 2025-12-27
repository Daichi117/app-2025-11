import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "contexts/LanguageContext";
import { useState } from "react";

type AuthTab = "login" | "signup";

export function LoginPage() {
  const { t, language, setLanguage } = useLanguage();
  const searchParams = useSearchParams();

  /**
   * -----------------------------
   * URLが唯一の状態
   * -----------------------------
   */
  const mode = searchParams.get("mode");
  const activeTab: AuthTab = mode === "signup" ? "signup" : "login";

  /**
   * -----------------------------
   * form state（これは state でOK）
   * -----------------------------
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const isLogin = activeTab === "login";
  const isSignup = activeTab === "signup";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup && password !== confirmPassword) {
      alert(t("login.login.passwordMismatch"));
      return;
    }

    alert(isLogin ? t("login.login.loginSuccess") : t("login.login.signupSuccess"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-hover flex items-center justify-center px-4">
      {/* 言語切り替え */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex gap-2 bg-white/90 rounded-lg p-1 shadow-lg">
          <button
            onClick={() => setLanguage("ja")}
            className={`px-3 py-1 text-sm rounded-md ${
              language === "ja" ? "bg-primary text-white" : "text-muted-foreground"
            }`}
          >
            日本語
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 text-sm rounded-md ${
              language === "en" ? "bg-primary text-white" : "text-muted-foreground"
            }`}
          >
            English
          </button>
        </div>
      </div>

      <div className="w-full max-w-md">
      <Link
          href="/"
          className="flex items-center justify-center gap-3 mb-8 group"
        >
          <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">
            Mirai
          </span>
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center mb-8">
            {t("login.login.title")}
          </h1>

          {/* タブ（URLで切り替え） */}
          <div className="flex justify-center mb-6">
            <Link
              href="/login?mode=login"
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                isLogin
                  ? "bg-primary text-white"
                  : "text-muted-foreground"
              }`}
            >
              {t("login.login.login")}
            </Link>
            <Link
              href="/login?mode=signup"
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                isSignup
                  ? "bg-primary text-white"
                  : "text-muted-foreground"
              }`}
            >
              {t("login.login.signup")}
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div>
                <label className="block text-sm mb-2">
                  {t("login.login.name")}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm mb-2">
                {t("login.login.email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                {t("login.login.password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm mb-2">
                  {t("login.login.confirmPassword")}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  required
                />
              </div>
            )}

            <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold">
              {isLogin ? t("login.login.submit") : t("login.login.signup")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
