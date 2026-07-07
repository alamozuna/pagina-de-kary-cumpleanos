"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import manifest from "../lib/fotos.json";


export default function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Background styling toggle
      setIsScrolled(window.scrollY > 80);

      // Determine active section
      const scrollPosition = window.scrollY + 200;

      for (const sec of manifest) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      ref={navRef}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-soft-beige/80 backdrop-blur-md border-b border-lavender-light/20 shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <span className="font-semibold text-text-dark text-sm hidden sm:block tracking-wide uppercase text-lavender-dark">
          Recuerdos ✨
        </span>

        {/* Scrollable container for links on small screens */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth w-full sm:w-auto justify-start sm:justify-end -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
          {manifest.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`relative px-4 py-2 text-xs md:text-sm rounded-full font-medium whitespace-nowrap transition-all active:scale-95 ${
                activeSection === sec.id
                  ? "text-white"
                  : "text-text-medium hover:text-lavender hover:bg-lavender-light/10"
              }`}
            >
              <span className="relative z-10">{sec.title}</span>
              {activeSection === sec.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-lavender rounded-full shadow-sm z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
