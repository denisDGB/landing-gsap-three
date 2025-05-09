export async function GET() {
  const urls = [
    { url: "https://denis-dev.vercel.app/", lastModified: new Date().toISOString() },
    { url: "https://denis-dev.vercel.app/contacto", lastModified: new Date().toISOString() }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`).join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}