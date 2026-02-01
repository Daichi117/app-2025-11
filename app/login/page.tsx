// app/login/page.tsx
import { AuthForm } from "components/auth/AuthForm";
import { Suspense } from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary to-primary-hover flex items-center justify-center px-4">
      {/* 1. レイアウトの枠組み */}
      <div className="w-full max-w-md">
        
        {/* 2. ロゴセクション（共通パーツとしてここに配置） */}
        <Link href="/" className="flex items-center justify-center gap-3 mt-4 mb-8 group">
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

        {/* 3. メインコンテンツ（分離したAuthFormを呼び出す） */}
        {/* useSearchParams を使うコンポーネントは Suspense で囲むのが Next.js のベストプラクティス */}
        <Suspense fallback={
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        }>
          <AuthForm />
        </Suspense>

        {/* 4. フッターなどの静的な補足情報 */}
        <p className="mt-8 text-center text-white/60 text-sm">
          &copy; 2024 Mirai. All rights reserved.
        </p>
      </div>
    </main>
  );
}