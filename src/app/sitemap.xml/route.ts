import { NextResponse } from "next/server";
import prismaClient from "@/services/prisma";

// Dynamic sitemap for JobFinder
// Includes: Home, Company list, Job list, all Job detail, all Company detail pages
// Uses production domain: https://jobfinder.anugrah.tech

export async function GET() {
  // Query jobs and companies directly to work during prerender
  const jobs = await prismaClient.openings.findMany({
    select: { id: true },
  });
  const companies = await prismaClient.company.findMany({
    select: { id: true },
  });

  const baseUrl = "https://jobfinder.anugrah.tech";
  // Main pages
  const today = new Date().toISOString().split("T")[0];
  const urls = [
    {
      loc: `${baseUrl}/`,
      priority: "1.0",
      changefreq: "daily",
      lastmod: today,
    },
    {
      loc: `${baseUrl}/company`,
      priority: "0.7",
      changefreq: "daily",
      lastmod: today,
    },
    {
      loc: `${baseUrl}/jobs`,
      priority: "0.7",
      changefreq: "daily",
      lastmod: today,
    },
    ...jobs.map((job) => ({
      loc: `${baseUrl}/jobs/${job.id}`,
      priority: "0.7",
      changefreq: "daily",
      lastmod: today,
    })),
    ...companies.map((company) => ({
      loc: `${baseUrl}/company/${company.id}`,
      priority: "0.7",
      changefreq: "weekly",
      lastmod: today,
    })),
  ];

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
