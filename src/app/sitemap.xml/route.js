const URL = "https://wordbuzz.arbizen.com";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <!--We manually set the two URLs we know already-->
    <url>
      <loc>${URL}</loc>
    </url>
    <url>
      <loc>${URL}/login</loc>
    </url>
     <url>
      <loc>${URL}/game</loc>
    </url>
    <url>
      <loc>${URL}/tos</loc>
    </url>
    <url>
      <loc>${URL}/privacy-policy</loc>
    </url>
  </urlset>
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}
