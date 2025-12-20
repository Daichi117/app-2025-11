"use client";
import Link from "next/link";
import { useLanguage } from "contexts/LanguageContext";

export function HomeNav() {
  const {t,language, setLanguage } = useLanguage();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            {/* ロゴアイコン */}
            <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            {/* ブランド名 */}
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">Mirai</span>
              <span className="text-xs text-muted-foreground -mt-1 hidden md:block">{t('nav.subtitle')}</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* 言語切り替えボタン */}
          <div className="flex items-center gap-1 md:gap-2 bg-background rounded-lg p-1 border border-border">
            <button
              onClick={() => setLanguage('ja')}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-md font-medium transition-all ${
                language === 'ja'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              日本語
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-md font-medium transition-all ${
                language === 'en'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              English
            </button>
          </div>
          
          <Link 
            href="/login" 
            className="hidden md:block px-6 py-2 text-primary hover:text-primary-hover font-semibold transition-colors"
          >
            {t('nav.login')}
          </Link>
          <Link 
            href="/login" 
            className="px-4 md:px-6 py-2 bg-primary text-white text-sm md:text-base font-semibold rounded-lg hover:bg-primary-hover transition-colors"
          >
            {t('nav.signup')}
          </Link>
        </div>
      </div>
    </div>
  </nav>
  );
}
