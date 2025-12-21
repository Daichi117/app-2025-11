"use client";
import { useLanguage } from "contexts/LanguageContext";
import Link from "next/link";

export function HomeHero() {
  const { t } = useLanguage(); // もう context から直接取得可能

  return (
     <div className="bg-gradient-to-br from-primary via-primary-hover to-primary">
     <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-32">
       <div className="text-center">
         <div className="flex justify-center items-center gap-3 md:gap-4 mb-6 md:mb-8">
           <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
             <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
             </svg>
           </div>
           <h1 className="text-5xl md:text-7xl font-bold text-white">Mirai</h1>
         </div>
         <p className="text-xl md:text-3xl text-white mb-3 md:mb-4">
           {t('home.hero.tagline')}
         </p>
         <p className="text-base md:text-xl text-white/90 mb-10 md:mb-16 max-w-2xl mx-auto px-4">
           {t('home.hero.description')}
         </p>

         <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 px-4">
           <Link 
             href="/login" 
             className="px-8 md:px-12 py-4 md:py-5 bg-white text-primary font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-center min-w-[200px]"
           >
             {t('home.hero.startFree')}
           </Link>
           <Link 
             href="/login" 
             className="px-8 md:px-12 py-4 md:py-5 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-primary transition-all text-center min-w-[200px]"
           >
             {t('home.hero.signup')}
           </Link>
         </div>
       </div>
     </div>
   </div>
  );
}
