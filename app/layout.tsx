import "./styles/index.css"
import { ReactNode } from "react";
import { LanguageProvider } from "contexts/LanguageContext";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
      <html lang="ja">
        <body className="bg-background text-foreground">
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </body>
      </html>
    );
  }