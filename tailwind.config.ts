import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory-cream': 'var(--ivory-cream)',
        'soft-beige': 'var(--soft-beige)',
        'lavender': 'var(--lavender)',
        'lavender-dark': 'var(--lavender-dark)',
        'lavender-light': 'var(--lavender-light)',
        'text-dark': 'var(--text-dark)',
        'text-medium': 'var(--text-medium)',
        'text-light': 'var(--text-light)',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      transitionProperty: {
        'spring': 'transform, opacity, shadow',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
