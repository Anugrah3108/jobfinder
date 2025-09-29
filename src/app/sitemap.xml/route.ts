import { NextResponse } from "next/server";

// Dynamic sitemap for JobFinder
// Includes: Home, Company list, Job list, all Job detail, all Company detail pages
// Uses production domain: https://jobfinder.anugrah.tech

export async function GET() {
  // Fetch all jobs
  const jobsRes = await fetch("http://localhost:3000/api/jobs");
  const jobsData = await jobsRes.json();
  const jobs = jobsData.data || [];

  // Fetch all companies
  const companiesRes = await fetch("http://localhost:3000/api/company");
  const companiesData = await companiesRes.json();
  const companies = companiesData.data || [];

  const baseUrl = "https://jobfinder.anugrah.tech";
  // Main pages
  let urls = [
    {
      loc: `${baseUrl}/`,
      priority: "1.0",
      changefreq: "daily",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      loc: `${baseUrl}/company`,
      priority: "0.7",
      changefreq: "daily",
      lastmod: new Date().toISOString().split("T")[0],
    },
    {
      loc: `${baseUrl}/jobs`,
      priority: "0.7",
      changefreq: "daily",
      lastmod: new Date().toISOString().split("T")[0],
    },
  ];

  // Add job detail pages
  for (const job of jobs) {
    urls.push({
      loc: `${baseUrl}/jobs/${job.id}`,
      priority: "0.7",
      changefreq: "daily",
      lastmod: (job.updatedAt || job.createdAt || new Date())
        .toISOString()
        .split("T")[0],
    });
  }

  // Add company detail pages
  for (const company of companies) {
    urls.push({
      loc: `${baseUrl}/company/${company.id}`,
      priority: "0.7",
      changefreq: "weekly",
      lastmod: (company.updatedAt || company.createdAt || new Date())
        .toISOString()
        .split("T")[0],
    });
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      <priority>${url.priority}</priority>
      <changefreq>${url.changefreq}</changefreq>
      <lastmod>${url.lastmod}</lastmod>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
