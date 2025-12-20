"use client";
import { useLanguage } from "contexts/LanguageContext";
import Link from "next/link";

export function HomeHero() {
  const { t } = useLanguage(); // もう context から直接取得可能

  return (
    <div className="bg-gradient-to-br from-primary via-primary-hover to-primary">
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h1 className="text-7xl font-bold text-white">Mirai</h1>
        <p className="text-3xl text-white">{t("hero.tagline")}</p>
        <p className="text-xl text-white/90">{t("hero.description")}</p>

        <div className="flex justify-center gap-6 mt-12">
          <Link
            href="/login"
            className="px-8 py-4 bg-white text-primary rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {t("hero.startFree")}
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary transition-all"
          >
            {t("hero.signup")}
          </Link>
        </div>
      </div>
    </div>
  );
}
