import "@/styles/index.css"
import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppTranslations } from "@/i18n";
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="ja">
        <body className="bg-background text-foreground w-screen h-screen">
          <LanguageProvider translations={AppTranslations}>
            {children}
            <Toaster />
          </LanguageProvider>
        </body>
      </html>
    );
  }