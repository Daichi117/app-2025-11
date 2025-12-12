"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAuth } from "app/contexts/AuthContext";

import { publicNavItems, dashboardNavItems } from "./NavItems";
import NavItem from "./NavItem";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import MobileMenuButton from "./MobileMenuButton";
import MobileNav from "./MobileNav";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoggedIn, username, logout } = useAuth();
  
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
  
    const navItems = isLoggedIn ? dashboardNavItems : publicNavItems;
  
    const handleLogout = () => {
      logout();
      router.push("/");
    };

    return (
        <motion.header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50" : "bg-card/80 backdrop-blur-md border-b border-border/30"}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Logo isLoggedIn={isLoggedIn} username={username} />
    
              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item, idx) => (
                  <NavItem key={item.id} item={item} pathname={pathname} index={idx} />
                ))}
              </nav>
    
              <div className="hidden md:flex items-center gap-3">
                <UserMenu isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
              </div>
    
              <MobileMenuButton open={mobileMenuOpen} onToggle={() => setMobileMenuOpen((s) => !s)} />
            </div>
    
            <MobileNav open={mobileMenuOpen} navItems={navItems} pathname={pathname} isLoggedIn={isLoggedIn} username={username} setOpen={setMobileMenuOpen} onLogout={handleLogout} />
          </div>
        </motion.header>
      );
}