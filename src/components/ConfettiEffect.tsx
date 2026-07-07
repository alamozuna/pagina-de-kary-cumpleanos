"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function triggerConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, animate a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}

export function triggerHeartsConfetti() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#EDE5D0', '#C88ABB', '#D9A8CF', '#FFFFFF'],
    zIndex: 1000
  };

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ['heart' as 'circle']
  });
}

export default function ConfettiEffect() {
  useEffect(() => {
    // Fire on load
    triggerConfetti();
  }, []);

  return null;
}
