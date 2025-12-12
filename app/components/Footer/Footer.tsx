"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ScrollToTopButton from "./ScrollToTopButton";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterCategories from "./FooterCategories";
import FooterCTA from "./FooterCTA";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  const [showScrollTop,setShowScrollTop] = useState(false);
  const {isLoggedIn} = useAuth();

  useEffect(()=> {
    const onScroll = () => { setShowScrollTop(window.scrollY > 400)};
    window.addEventListener("scroll",onScroll);
    return () => window.removeEventListener("scroll",onScroll)
  })


  return (
    <footer className="relative bg-gradient-to-b from-background via-card/30 to-card border-t border-border mt-20">
       <ScrollToTopButton visible={showScrollTop} />

<div className="container mx-auto px-4 py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
    <FooterBrand />
    <FooterLinks isLoggedIn={isLoggedIn} />
    {!isLoggedIn && <FooterCategories />}
    <FooterCTA isLoggedIn={isLoggedIn} />
  </div>

  <FooterBottom />
</div>
    </footer>
  )

}