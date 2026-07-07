"use client";

import { useState } from "react";
import { Gift, X, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerConfetti } from "./ConfettiEffect";

export default function SurpriseButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    triggerConfetti();
  };

  return (
    <>
      {/* Floating Button (rounded CTA with active state spring style) */}
      <motion.button
        onClick={handleClick}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 2, stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 bg-lavender text-white rounded-full p-4 shadow-xl flex items-center justify-center border border-white/20 hover:bg-lavender-dark transition-colors animate-float"
        title="¡Presiona para una sorpresa!"
      >
        <Gift size={24} className="animate-pulse" />
      </motion.button>

      {/* Surprise Message Modal (Silk-like easing modal) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-soft-beige max-w-md w-full p-6 md:p-8 rounded-[2rem] shadow-2xl relative border border-lavender-light/30"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-medium hover:text-text-dark bg-white/50 hover:bg-white rounded-full p-2 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Heart Badge */}
              <div className="flex justify-center mb-6">
                <div className="bg-lavender/10 text-lavender p-4 rounded-full">
                  <Heart size={36} fill="currentColor" className="animate-pulse" />
                </div>
              </div>

              {/* Message Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-text-dark mb-4 tracking-tight flex items-center justify-center gap-2">
                  <Sparkles size={20} className="text-lavender" />
                  ¡Feliz Cumpleaños, Kary!
                  <Sparkles size={20} className="text-lavender" />
                </h3>
                <p className="text-text-medium leading-relaxed mb-6 text-sm md:text-base">
                  Kary, hoy celebramos tus 24 años de vida, alegría y luz. Eres una persona increíblemente especial para todos nosotros. Esperamos que este pequeño collage digital, lleno de fotos, videos y recuerdos hermosos, te recuerde siempre lo mucho que te queremos y valoramos. 
                </p>
                <p className="font-handwriting text-2xl text-lavender font-bold">
                  ¡Que se cumplan todos tus deseos! 💖
                </p>
              </div>

              {/* Action Close */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-lavender hover:bg-lavender-dark text-white font-medium px-6 py-2.5 rounded-full shadow-md transition-colors active:scale-95 text-sm"
                >
                  Continuar viendo recuerdos ✨
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
