"use client";

import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

interface VideoFeatureProps {
  src: string;
  onClick: () => void;
  sectionTitle: string;
}

export default function VideoFeature({ src, onClick, sectionTitle }: VideoFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      className="w-full max-w-xl mx-auto mb-12"
    >
      {/* Badge indicating special video (as per prompt/WUI directives) */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 border border-amber-300 text-amber-900 rounded-full px-4 py-1 text-xs uppercase tracking-wider font-semibold shadow-sm animate-bounce">
          <Sparkles size={12} className="text-amber-700" />
          🎬 Mensaje especial
        </div>
      </div>

      {/* Bezel frame wrapping (from alam_uxpage_skill Concentric Curves) */}
      <div className="double-bezel-outer bg-amber-400/20 shadow-xl overflow-hidden hover:scale-[1.02] active:scale-[0.99] transition-transform duration-300">
        <div 
          onClick={onClick}
          className="double-bezel-inner relative aspect-[9/16] md:max-h-[500px] bg-black cursor-pointer overflow-hidden rounded-[calc(2rem-0.375rem)] group border-2 border-amber-200/50 glow-gold animate-pulse-glow"
        >
          {/* Fallback preview/poster overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-6 z-10">
            <h4 className="text-white font-bold text-lg leading-tight md:text-xl drop-shadow-md">
              Mensaje de {sectionTitle} 🎂
            </h4>
            <p className="text-white/80 text-xs md:text-sm mt-1 drop-shadow-md">
              Haz clic para reproducir el mensaje
            </p>
          </div>

          {/* Interactive Play Button (rounded CTA architecture from alam_uxpage_skill) */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-white/95 text-lavender-dark flex items-center justify-center rounded-full w-16 h-16 shadow-lg group-hover:scale-110 active:scale-95 transition-transform duration-300">
              <Play size={28} fill="currentColor" className="ml-1 text-lavender" />
            </div>
          </div>

          {/* Background blurred color gradients to make it pop */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-lavender/30 blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-amber-400/20 blur-3xl opacity-50" />

          {/* Inline video tag for visual preview (muted loop) */}
          <video
            src={src}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </motion.div>
  );
}
