"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { dashboardNavItems } from "./NavItems";
interface Props {
  isLoggedIn: boolean;
  username?: string;
}

const [{href}] = dashboardNavItems;


export default function Logo({isLoggedIn,username}:Props){
    return (
        <Link href={isLoggedIn ? href : "/"}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 cursor-pointer group">
        <motion.div
          className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-secondary rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="size-5 text-white relative z-10" />
        </motion.div>

        <div className="hidden sm:block">
          <h1 className="text-foreground leading-none group-hover:text-primary transition-colors duration-300">
            {isLoggedIn ? "Dashboard" : "Boomblog"}
          </h1>
          <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
            {isLoggedIn ? username : "AI-Powered"}
          </p>
        </div>
      </motion.div>
        </Link>
    )
}