"use client";

import { ReactNode } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Navigation from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "./ui/sonner";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster />
    </AuthProvider>
  );
}
