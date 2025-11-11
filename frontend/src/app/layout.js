import "./globals.css"; // Importa Tailwind CSS
import Script from "next/script"; // Para Google Analytics
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://tudominio.com"), // 🔹 Reemplázalo con tu dominio real
  title: "Denis - Full Stack Developer",
  description: "Una landing page interactiva con animaciones avanzadas y gráficos en 3D.",
  keywords: "landing page, animaciones web, GSAP, Three.js, desarrollo web",
  author: "Denis",
  openGraph: {
    title: "Landing Animada con GSAP y Three.js",
    description: "Una landing page interactiva con animaciones avanzadas y gráficos en 3D.",
    type: "website",
    url: "https://tudominio.com", // 🔹 Actualiza con tu dominio
    images: [
      {
        url: "/images/preview.jpg", // 🔹 Imagen para compartir en redes
        width: 1200,
        height: 630,
        alt: "Vista previa de la landing page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tuusuario", // 🔹 Agrega tu usuario de Twitter
    title: "Landing Animada con GSAP y Three.js",
    description: "Una landing page interactiva con animaciones avanzadas y gráficos en 3D.",
    images: ["/images/preview.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} // 🔹 Reemplaza con tu ID de GA
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}

