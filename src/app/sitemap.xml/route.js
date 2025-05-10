export async function GET() {
    const baseUrl = "https://denis-dev.vercel.app";
  
    const urls = [
        "/", // ← ✅ Ruta válida para el home
        "/contacto",
        "/proyectos",
        "/servicios",
        "/testimonios",
      ];      
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
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