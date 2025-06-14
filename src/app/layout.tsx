import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BestWriter - Escribe blogs perfectos con IA",
  description: "Transforma tus ideas en contenido profesional. Corrección automática, resúmenes para redes sociales y extractos optimizados para SEO. Todo en una sola plataforma.",
  keywords: "escritura, blog, IA, inteligencia artificial, corrección, SEO, redes sociales",
  authors: [{ name: "BestWriter Team" }],
  openGraph: {
    title: "BestWriter - Escribe blogs perfectos con IA",
    description: "Transforma tus ideas en contenido profesional con inteligencia artificial",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "BestWriter - Escribe blogs perfectos con IA",
    description: "Transforma tus ideas en contenido profesional con inteligencia artificial",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}