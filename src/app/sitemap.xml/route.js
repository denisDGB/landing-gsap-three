export async function GET() {
  const baseUrl = "https://denis-dev.vercel.app";

  const urls = [
    "/", 
    "/contacto",
    "/proyectos",
    "/servicios",
    "/testimonios",
  ].filter(Boolean); // 🔥 Elimina valores vacíos o null

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .filter((path) => path && path.trim() !== "") // 🔒 Evita rutas vacías
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}