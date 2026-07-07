"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion } from "framer-motion";

interface BackgroundMusicProps {
  forcePause: boolean;
}

export default function BackgroundMusic({ forcePause }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef(false);

  // Initialize Audio once on mount
  useEffect(() => {
    const audio = new Audio("/favorite-girl.mp3");
    audio.loop = true;
    audio.volume = 0.4; // 40% volume
    audioRef.current = audio;

    const interactionEvents = ["click", "touchstart", "keydown", "pointerdown", "scroll", "wheel", "touchmove"];

    const handleFirstInteraction = () => {
      if (!userInteractedRef.current) {
        userInteractedRef.current = true;
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => {
          console.log("Autoplay blocked:", e);
        });
        interactionEvents.forEach(event => 
          window.removeEventListener(event, handleFirstInteraction)
        );
      }
    };

    interactionEvents.forEach(event => 
      window.addEventListener(event, handleFirstInteraction)
    );

    return () => {
      interactionEvents.forEach(event => 
        window.removeEventListener(event, handleFirstInteraction)
      );
      audio.pause();
    };
  }, []);

  // Handle force pause (when video plays in lightbox)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (forcePause) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Resume if user has already allowed playing previously
      if (userInteractedRef.current) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  }, [forcePause]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    userInteractedRef.current = true;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log("Playback failed:", e));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border border-white/20 transition-all font-medium text-xs tracking-wider uppercase ${
          isPlaying 
            ? "bg-lavender text-white animate-pulse" 
            : "bg-white/90 text-text-medium backdrop-blur-md"
        }`}
      >
        {isPlaying ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <Music size={14} />
            </motion.div>
            <span>Música On</span>
            <Volume2 size={14} />
          </>
        ) : (
          <>
            <Music size={14} />
            <span>Música Off</span>
            <VolumeX size={14} />
          </>
        )}
      </motion.button>
    </div>
  );
}
