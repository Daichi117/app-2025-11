"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

interface HomeNavProps {
  isLoggedIn?: boolean; // ダッシュボードから呼ぶときは true を渡す
}

export function HomeNav({ isLoggedIn = false }: HomeNavProps) {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();

  // 💡 ログアウト処理：作成したBEのAPIを叩く
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/Logout", { method: "POST" });
      if (res.ok) {
        // Cookieが消えるので、トップページへ戻して画面をリフレッシュ
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* 左側：ロゴエリア */}
          <div className="flex items-center">
            <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 md:gap-3 group">
              <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">Mirai</span>
                <span className="text-xs text-muted-foreground -mt-1 hidden md:block">{t('home.nav.subtitle')}</span>
              </div>
            </Link>
          </div>

          {/* 右側：ボタンエリア */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* 言語切り替え */}
            <div className="flex items-center gap-1 md:gap-2 bg-background rounded-lg p-1 border border-border">
              <button onClick={() => setLanguage('ja')} className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-md font-medium transition-all ${language === 'ja' ? 'bg-primary text-white' : 'text-muted-foreground'}`}>
                <span>JP</span>
              </button>
              <button onClick={() => setLanguage('en')} className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-md font-medium transition-all ${language === 'en' ? 'bg-primary text-white' : 'text-muted-foreground'}`}>
                <span>EN</span>
              </button>
            </div>
            
            {/* 💡 条件分岐：isLoggedInがtrueならログアウトボタン、falseならログインリンク */}
            {isLoggedIn ? (
              <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-500 font-semibold hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              {/* ログアウトアイコン：矢印がドアから出るイメージ */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ドア部分 */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
                {/* 枠部分 */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                />
              </svg>
              <span className="hidden md:inline">
                {t('home.nav.logout') || "Logout"}
              </span>
            </button>
            ) : (
              <>
                <Link href="/login?mode=login" className="hidden md:block px-6 py-2 text-primary font-semibold hover:text-primary-hover transition-colors">
                  {t('home.nav.login')}
                </Link>
                <Link href="/login?mode=signup" className="px-4 md:px-6 py-2 bg-primary text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-hover transition-colors">
                  {t('home.nav.signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}