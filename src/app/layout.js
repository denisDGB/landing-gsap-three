import "./globals.css"; // Importa Tailwind CSS

export const metadata = {
  title: "Landing Animada con GSAP y Three.js",
  description: "Una landing page interactiva con animaciones avanzadas y gráficos en 3D.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
