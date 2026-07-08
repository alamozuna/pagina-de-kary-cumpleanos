"use client";

import { motion } from "framer-motion";
import { Play, Sparkles, Mic } from "lucide-react";

interface VideoFeatureProps {
  src: string;
  onClick: () => void;
  sectionTitle: string;
}

export default function VideoFeature({ src, onClick, sectionTitle }: VideoFeatureProps) {
  const isAudio = src.toLowerCase().endsWith(".ogg") || 
                  src.toLowerCase().endsWith(".mp3") || 
                  src.toLowerCase().endsWith(".wav") || 
                  src.toLowerCase().endsWith(".m4a");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      className="w-full max-w-xl mx-auto mb-12"
    >
      {/* Badge indicating special media */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 border border-amber-300 text-amber-900 rounded-full px-4 py-1 text-xs uppercase tracking-wider font-semibold shadow-sm animate-bounce">
          <Sparkles size={12} className="text-amber-700" />
          {isAudio ? "🎙️ Mensaje de voz especial" : "🎬 Mensaje especial"}
        </div>
      </div>

      {/* Bezel frame wrapping */}
      <div className="double-bezel-outer bg-amber-400/20 shadow-xl overflow-hidden hover:scale-[1.02] active:scale-[0.99] transition-transform duration-300">
        <div 
          onClick={onClick}
          className={`double-bezel-inner relative cursor-pointer overflow-hidden rounded-[calc(2rem-0.375rem)] group border-2 border-amber-200/50 glow-gold animate-pulse-glow bg-black ${
            isAudio ? "aspect-[2/1] md:max-h-[220px]" : "aspect-[9/16] md:max-h-[500px]"
          }`}
        >
          {/* Fallback preview/poster overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex flex-col justify-end p-6 z-10">
            <h4 className="text-white font-bold text-lg leading-tight md:text-xl drop-shadow-md">
              {isAudio ? `Nota de voz de ${sectionTitle} 🎂` : `Mensaje de ${sectionTitle} 🎂`}
            </h4>
            <p className="text-white/80 text-xs md:text-sm mt-1 drop-shadow-md">
              Haz clic para escuchar el mensaje
            </p>
          </div>

          {/* Interactive Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-white/95 text-lavender-dark flex items-center justify-center rounded-full w-16 h-16 shadow-lg group-hover:scale-110 active:scale-95 transition-transform duration-300">
              {isAudio ? (
                <Mic size={28} className="text-lavender animate-pulse" />
              ) : (
                <Play size={28} fill="currentColor" className="ml-1 text-lavender" />
              )}
            </div>
          </div>

          {/* Background blurred color gradients to make it pop */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-lavender/30 blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-amber-400/20 blur-3xl opacity-50" />

          {/* Audio Wave Visualizer Elements for Audio files */}
          {isAudio ? (
            <div className="absolute inset-0 flex items-center justify-around px-12 opacity-30 select-none pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-white rounded-full transition-all duration-300"
                  style={{
                    height: `${20 + Math.sin(i + 1) * 30}%`,
                    animation: `pulse-slow 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          ) : (
            /* Inline video tag for visual preview (muted loop) */
            <video
              src={src}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
