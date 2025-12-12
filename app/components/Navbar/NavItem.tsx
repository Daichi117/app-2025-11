"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { NavItemType } from "./NavItems";
import { isActive as checkActive } from "./IsActive";


interface Props {
  item:NavItemType;
  pathname:string | null | undefined;
  index?:number
}

export default function NavItem({item,pathname,index=0}:Props) {
  const active = checkActive(pathname,item.href)

  return (
    <Link href={item.href} key={item.id}>
      <motion.div initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 relative ${
                    active? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
              >
            {active && (
        <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-primary rounded-xl"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
        )}


        <span className="relative z-10 flex items-center gap-2">{item.label}</span>
        </motion.div>
        </Link>

  )
}