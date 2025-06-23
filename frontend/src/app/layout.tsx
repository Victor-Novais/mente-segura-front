// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MenteSegura – Saúde Mental no Trabalho",
    template: "%s | MenteSegura",
  },
  description:
    "Plataforma de gestão de saúde mental no ambiente de trabalho: avaliações, suporte psicológico, treinamentos e muito mais.",
  keywords: [
    "saúde mental",
    "bem-estar corporativo",
    "mentesegura",
    "psicologia",
    "empresa",
    "portal de saúde mental",
  ],
  authors: [{ name: "Equipe MenteSegura", url: "https://mentesegura.com.br" }],
  openGraph: {
    title: "MenteSegura – Saúde Mental no Trabalho",
    description:
      "Plataforma de gestão de saúde mental no ambiente de trabalho: avaliações, suporte psicológico, treinamentos e muito mais.",
    url: "https://mentesegura.com.br",
    siteName: "MenteSegura",
    images: [
      {
        url: "https://mentesegura.com.br/og-image.png",
        width: 1200,
        height: 630,
        alt: "MenteSegura – Saúde Mental no Trabalho",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MenteSegura – Saúde Mental no Trabalho",
    description:
      "Plataforma de gestão de saúde mental no ambiente de trabalho: avaliações, suporte psicológico, treinamentos e muito mais.",
    images: ["https://mentesegura.com.br/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  robots: {
    index: true,
    follow: true,
    // Se quiser regras específicas:
    // You could also do:
    // rules: {
    //   userAgent: "*",
    //   allow: "/",
    //   disallow: ["/admin", "/private"]
    // },
  },
  metadataBase: new URL("https://mentesegura.com.br"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
