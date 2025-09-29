import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeContext from "@/components/context/theme-context";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JobFinder - Discover Your Next Opportunity",
    template: "%s | JobFinder",
  },
  description:
    "Find jobs that match your skills and explore the best companies hiring today.",
  metadataBase: new URL("https://jobfinder.anugrah.tech"),
  openGraph: {
    title: "JobFinder - Discover Your Next Opportunity",
    description:
      "Find jobs that match your skills and explore the best companies hiring today.",
    url: "https://jobfinder.anugrah.tech",
    siteName: "JobFinder",
    images: [
      {
        url: "/public/og-image.png",
        width: 1200,
        height: 630,
        alt: "JobFinder - Discover Your Next Opportunity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitter",
    creator: "@yourtwitter",
    title: "JobFinder - Discover Your Next Opportunity",
    description:
      "Find jobs that match your skills and explore the best companies hiring today.",
    images: ["/public/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  themeColor: "#5472E4",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "JobFinder",
              url: "https://jobfinder.anugrah.tech",
              logo: "/public/og-image.png",
              sameAs: [
                "https://twitter.com/yourtwitter",
                "https://linkedin.com/company/yourcompany",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "JobFinder",
              image: "/public/og-image.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "",
                addressLocality: "Bangalore",
                addressRegion: "KA",
                postalCode: "560001",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 12.9716,
                longitude: 77.5946,
              },
              url: "https://jobfinder.anugrah.tech",
              telephone: "",
              priceRange: "",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeContext>{children}</ThemeContext>
      </body>
    </html>
  );
}
