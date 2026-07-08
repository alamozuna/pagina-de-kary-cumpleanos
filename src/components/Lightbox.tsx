"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Film, Mic } from "lucide-react";
import Image from "next/image";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  isVideo?: boolean;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
  isVideo = false,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items]);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    onNavigate(newIndex);
  };

  const currentItem = items[currentIndex];
  
  const isAudioItem = currentItem && (
    currentItem.toLowerCase().endsWith(".ogg") ||
    currentItem.toLowerCase().endsWith(".mp3") ||
    currentItem.toLowerCase().endsWith(".wav") ||
    currentItem.toLowerCase().endsWith(".m4a")
  );

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // Silk-like smooth transition
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm select-none"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors active:scale-95"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Prev Navigation */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors active:scale-95 hidden sm:flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Content Wrapper */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }} // Silk easing model
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {isVideo ? (
              isAudioItem ? (
                <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6 shadow-2xl relative">
                  {/* Decorative background glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-lavender/10 to-amber-400/5 rounded-2xl blur-xl pointer-events-none" />
                  
                  <div className="w-20 h-20 rounded-full bg-lavender/20 flex items-center justify-center border border-lavender/30">
                    <Mic className="text-lavender animate-pulse" size={36} />
                  </div>

                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg">Mensaje de Voz</h3>
                    <p className="text-zinc-400 text-xs mt-1">Escucha la felicitación especial de cumpleaños</p>
                  </div>

                  <audio
                    src={currentItem}
                    controls
                    autoPlay
                    className="w-full accent-lavender"
                  />
                </div>
              ) : (
                <div className="w-full h-full max-w-lg aspect-[9/16] bg-black rounded-lg overflow-hidden relative border border-white/10 shadow-2xl">
                  {/* Special video indicator */}
                  <div className="absolute top-3 left-3 z-10 bg-amber-400 text-amber-950 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                    <Film size={12} />
                    Mensaje Especial
                  </div>
                  <video
                    src={currentItem}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              )
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={currentItem}
                  alt="Recuerdo de Kary"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority
                />
              </div>
            )}
          </motion.div>

          {/* Next Navigation */}
          {items.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors active:scale-95 hidden sm:flex items-center justify-center"
              aria-label="Siguiente"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Mobile Swipe / Tap Area indicator at bottom */}
          <div className="absolute bottom-4 left-50 text-white/50 text-xs">
            {currentIndex + 1} de {items.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
