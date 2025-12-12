"use client";

import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

interface Props {
    open : boolean
    onToggle : ()=> void;
}

export default function MobileMenuButton({open,onToggle}:Props){
    return (
        <motion.button onClick={onToggle} className="md:hidden p-2 text-foreground hover:bg-muted rounded-xl transition-colors" whileTap={{ scale: 0.9 }}>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="size-6" />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Menu className="size-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )
}