"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { triggerHeartsConfetti } from "./ConfettiEffect";

interface PolaroidCardProps {
  src: string;
  onClick: () => void;
  index: number;
}

export default function PolaroidCard({ src, onClick, index }: PolaroidCardProps) {
  const [rotation, setRotation] = useState(0);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    // Generate stable pseudo-random rotation between -4 and +4 degrees based on index
    const angle = ((index * 37) % 9) - 4;
    setRotation(angle);
  }, [index]);

  const handleCardClick = () => {
    onClick();
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    // Trigger special heart click effect
    e.stopPropagation();
    setShowHeart(true);
    triggerHeartsConfetti();
    setTimeout(() => setShowHeart(false), 800);
  };

  // Get photo caption from filename
  // e.g. "/fotos/Fotos con Alam/WhatsApp Image 2026-07-03 at 12.26.39 PM.jpeg" -> "WhatsApp Image..." or a sweet placeholder
  const getCaption = (path: string) => {
    const parts = path.split("/");
    const filenameWithExt = parts[parts.length - 1];
    const filename = filenameWithExt.split(".")[0];
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    // Clean up filename a bit if it contains WhatsApp or looks like a UUID
    if (filename.toLowerCase().includes("whatsapp") || uuidRegex.test(filename)) {
      return "Momento especial ✨";
    }
    return filename || "Karyleydi Ortiz";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15, type: "spring", stiffness: 100 }}
      style={{ rotate: `${rotation}deg` }}
      whileHover={{
        rotate: 0,
        scale: 1.05,
        zIndex: 20,
        boxShadow: "var(--shadow-xl)",
      }}
      onClick={handleCardClick}
      onDoubleClick={handleDoubleTap}
      className="bg-white p-3 pb-6 rounded-sm shadow-md border border-black/5 cursor-pointer relative select-none w-full max-w-[320px] mx-auto transition-shadow duration-300"
    >
      {/* Photo Container */}
      <div className="relative aspect-square w-full bg-soft-beige overflow-hidden rounded-[2px] border border-black/5">
        <Image
          src={src}
          alt={getCaption(src)}
          fill
          sizes="(max-width: 640px) 280px, 320px"
          loading="lazy"
          className="object-cover"
        />

        {/* Double click heart animation indicator overlay */}
        {showHeart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.2, 1, 0.8] }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none text-lavender z-20"
          >
            <Heart size={64} fill="currentColor" className="drop-shadow-lg" />
          </motion.div>
        )}
      </div>

      {/* Cursive text caption */}
      <div className="mt-4 text-center">
        <p className="font-handwriting text-lg md:text-xl text-text-medium tracking-wide">
          {getCaption(src)}
        </p>
      </div>
    </motion.div>
  );
}
