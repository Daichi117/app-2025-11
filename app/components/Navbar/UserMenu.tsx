"use client";

import { Button } from "@ui/button";
import { LogOut } from "lucide-react";
import { motion } from "motion/react";
import { Island_Moments } from "next/font/google";
import { publicMainButton } from "./NavItems";


interface Props {
  isLoggedIn: boolean;
  username?: string;
  onLogout: () => void;
}

export default function UserMenu({isLoggedIn,username,onLogout}:Props) {
    if(!isLoggedIn) {
        return (
            <a href={publicMainButton.href}>
                <Button className="shadow-lg hover:shadow-xl transition-all rounded-xl">{publicMainButton.label}</Button>
            </a>           
        );
    }
    return (
        <>
         <motion.div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-muted to-muted/50 rounded-xl border border-border/50 shadow-sm" whileHover={{ scale: 1.02 }}>
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-medium shadow-md">
          {username?.charAt(0).toUpperCase()}
        </div>
        <span className="text-foreground font-medium">{username}</span>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button variant="outline" size="icon" onClick={onLogout} className="text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:border-destructive/50 transition-all rounded-xl" title="Logout">
          <LogOut className="size-5" />
        </Button>
      </motion.div>
        </>
    )

}