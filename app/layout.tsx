import "./styles/index.css"
import { ReactNode } from "react";
import { LanguageProvider } from "contexts/LanguageContext";
import { AppTranslations } from "i18n";
export default function RootLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="ja">
        <body className="bg-background text-foreground">
          <LanguageProvider translations={AppTranslations}>
            {children}
          </LanguageProvider>
        </body>
      </html>
    );
  }