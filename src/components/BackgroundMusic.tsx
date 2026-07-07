"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion } from "framer-motion";

interface BackgroundMusicProps {
  forcePause: boolean;
}

export default function BackgroundMusic({ forcePause }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio("/Favorite Girl.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // 40% volume

    // Attempt autoplay on first user click on window
    const handleFirstInteraction = () => {
      if (!userInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setUserInteracted(true);
        }).catch((e) => console.log("Autoplay blocked:", e));
        
        window.removeEventListener("click", handleFirstInteraction);
      }
    };

    window.addEventListener("click", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [userInteracted]);

  // Handle force pause (when video plays in lightbox)
  useEffect(() => {
    if (audioRef.current) {
      if (forcePause) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (userInteracted && !isPlaying) {
        // Resume if user has already allowed playing
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  }, [forcePause]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setUserInteracted(true);
      }).catch((e) => console.log("Playback failed:", e));
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
