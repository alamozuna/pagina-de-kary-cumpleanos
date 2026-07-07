"use client";

import { useState } from "react";
import Hero from "../components/Hero";
import SectionNav from "../components/SectionNav";
import PolaroidCard from "../components/PolaroidCard";
import VideoFeature from "../components/VideoFeature";
import Lightbox from "../components/Lightbox";
import SurpriseButton from "../components/SurpriseButton";
import CustomCursor from "../components/CustomCursor";
import ConfettiEffect from "../components/ConfettiEffect";
import SectionDivider from "../components/SectionDivider";
import BackgroundMusic from "../components/BackgroundMusic";
import manifest from "../lib/fotos.json";
import { Sparkles, Heart } from "lucide-react";

export default function Home() {
  // Lightbox State Management
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxIsVideo, setLightboxIsVideo] = useState(false);

  const openLightbox = (items: string[], index: number, isVideo: boolean = false) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setLightboxIsVideo(isVideo);
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-ivory-cream selection:bg-lavender-light selection:text-text-dark pb-24">
      {/* Interactive Global Assets */}
      <CustomCursor />
      <ConfettiEffect />
      <SurpriseButton />
      <BackgroundMusic forcePause={lightboxOpen && lightboxIsVideo} />

      {/* Main Sections */}
      <Hero />
      <SectionNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {manifest.map((section, sectionIdx) => (
          <div key={section.id} id={section.id} className="scroll-mt-24">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 text-xs text-lavender uppercase tracking-[0.25em] font-semibold mb-2">
                <Heart size={10} fill="currentColor" />
                Recuerdo #{sectionIdx + 1}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-dark relative inline-block px-4">
                {section.title}
                {/* Decorative title sparkles */}
                <span className="absolute -top-3 -right-2 text-lavender animate-pulse">
                  <Sparkles size={16} />
                </span>
              </h2>
            </div>

            {/* Video Highlight (Featured at the start if present) */}
            {section.videos && section.videos.length > 0 && (
              <div className="mb-12">
                {section.videos.map((video) => (
                  <VideoFeature
                    key={video}
                    src={video}
                    sectionTitle={section.title}
                    onClick={() => openLightbox([video], 0, true)}
                  />
                ))}
              </div>
            )}

            {/* Polaroid Photos Collage Grid */}
            {section.images && section.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 justify-items-center items-center">
                {section.images.map((image, imgIdx) => (
                  <PolaroidCard
                    key={image}
                    src={image}
                    index={imgIdx}
                    onClick={() => openLightbox(section.images, imgIdx, false)}
                  />
                ))}
              </div>
            )}

            {/* Section Divider (Except for the last one) */}
            {sectionIdx < manifest.length - 1 && <SectionDivider />}
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 mt-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-lavender-light to-transparent opacity-30" />
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <p className="font-semibold text-lg tracking-wide uppercase text-lavender-light">
            Hecho con Amor para Kary ❤️
          </p>
          <p className="text-white/40 text-xs md:text-sm">
            © 2026 Karyleydi Ortiz • Feliz Cumpleaños #24
          </p>
        </div>
      </footer>

      {/* Shared Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
        isVideo={lightboxIsVideo}
      />
    </div>
  );
}
