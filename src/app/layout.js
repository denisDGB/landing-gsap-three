import "./globals.css"; // Importa Tailwind CSS
import Script from "next/script"; // Para Google Analytics

export const metadata = {
  metadataBase: new URL("https://tudominio.com"), // 🔹 Reemplázalo con tu dominio real
  title: "Landing Animada con GSAP y Three.js",
  description: "Una landing page interactiva con animaciones avanzadas y gráficos en 3D.",
  keywords: "landing page, animaciones web, GSAP, Three.js, desarrollo web",
  author: "Tu Nombre",
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
    <html lang="es">
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
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

