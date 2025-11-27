export default function handler(req, res) {
  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );

  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://www.onecasa.in/</loc></url>
        <url><loc>https://www.onecasa.in/about-us</loc></url>
        <url><loc>https://www.onecasa.in/properties</loc></url>
        <url><loc>https://www.onecasa.in/services/custom-builder</loc></url>
        <url><loc>https://www.onecasa.in/contact</loc></url>
      </urlset>
    `);
}
