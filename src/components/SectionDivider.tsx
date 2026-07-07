"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-16 opacity-30 select-none pointer-events-none">
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-lavender-light" />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-lavender-light"
      >
        <Heart size={16} fill="currentColor" />
      </motion.div>
      <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-lavender-light" />
    </div>
  );
}
