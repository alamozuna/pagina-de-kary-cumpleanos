import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Feliz Cumpleaños Karyleydi ✨ #24",
  description: "Un espacio especial lleno de recuerdos y mensajes para celebrar tus 24 años. ¡Te queremos mucho!",
  openGraph: {
    title: "Feliz Cumpleaños Karyleydi Ortiz Segura 🎂",
    description: "Un collage interactivo de fotos y videos llenos de recuerdos especiales en tu cumpleaños #24.",
    type: "website",
    locale: "es_DO",
    images: [
      {
        url: "/fotos/Fotos con Alam/WhatsApp Image 2026-07-03 at 12.26.39 PM.jpeg", // Default image fallback
        width: 1200,
        height: 630,
        alt: "Karyleydi Ortiz Segura #24",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased bg-ivory-cream text-text-dark select-none">
        {children}
      </body>
    </html>
  );
}
