"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { NavItemType } from "./NavItems";
import { isActive as checkActive } from "./IsActive";
import { LayoutDashboard, PenSquare } from "lucide-react";
import { publicMainButton } from "./NavItems";
interface Props {
  open: boolean;
  navItems: NavItemType[];
  pathname: string | null | undefined;
  isLoggedIn: boolean;
  username?: string;
  setOpen: (v: boolean) => void;
  onLogout: () => void;
}

export default function MobileNav({ open, navItems, pathname, isLoggedIn, username, setOpen, onLogout }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="md:hidden overflow-hidden">
          <nav className="flex flex-col gap-2 py-4 border-t border-border mt-4 px-2">
            {navItems.map((item, i) => {
              const active = checkActive(pathname, item.href);
              return (
                <Link key={item.id} href={item.href} onClick={() => setOpen(false)}>
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${active ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    {item.id === 'dashboard' && <LayoutDashboard className="size-4" />}
                    {item.id === 'post' && <PenSquare className="size-4" />}
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}

            <div className="pt-2 border-t border-border mt-2">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-muted to-muted/50 rounded-xl">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium shadow-md">
                      {username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-foreground font-medium">{username}</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-background rounded-xl" onClick={() => { onLogout(); setOpen(false); }}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/getstarted" onClick={() => setOpen(false)}>
                  <button className="w-full px-4 py-2 bg-background rounded-xl">{publicMainButton.label}</button>
                </Link>
              )}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
