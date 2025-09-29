import CompanyListingAndReviews from "@/components/company-listing-review";
import DeleteCompany from "@/components/delete-company";
import GoBack from "@/components/go-back-btn";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Separator,
} from "@radix-ui/themes";
import Link from "next/link";

export default async function Company({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const id = param.id;
  console.log(id);

  const res = await fetch(`http://localhost:3000/api/company/${id}`);
  const data = await res.json();
  const company = data.data?.company;

  const revRes = await fetch(`http://localhost:3000/api/review/${id}`);
  const revData = await revRes.json();
  const reviews = await revData.data;

  return (
    <div className="relative flex justify-center items-center min-h-[90vh]">
      <GoBack />
      <head>
        {/* OG and Twitter meta tags for social sharing */}
        <title>{company.name} | JobFinder</title>
        <meta name="description" content={company.description} />
        <meta property="og:title" content={company.name + " | JobFinder"} />
        <meta property="og:description" content={company.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://jobfinder.anugrah.tech/company/${company.id}`}
        />
        <meta property="og:image" content="/public/og-image.png" />
        <meta property="og:site_name" content="JobFinder" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={company.name + " | JobFinder"} />
        <meta name="twitter:description" content={company.description} />
        <meta name="twitter:image" content="/public/og-image.png" />
        <meta name="twitter:site" content="@yourtwitter" />
        <meta name="twitter:creator" content="@yourtwitter" />
        <link
          rel="canonical"
          href={`https://jobfinder.anugrah.tech/company/${company.id}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: company.name,
              url: `https://jobfinder.anugrah.tech/company/${company.id}`,
              description: company.description,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  email: company.owner?.email || "info@yourdomain.com",
                  contactType: "customer support",
                },
              ],
            }),
          }}
        />
        {Array.isArray(reviews) && reviews.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Review",
                itemReviewed: {
                  "@type": "Organization",
                  name: company.name,
                },
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: reviews[0]?.rating || 5,
                  bestRating: 5,
                  worstRating: 1,
                },
                author: {
                  "@type": "Person",
                  name: reviews[0]?.user?.email || "Anonymous",
                },
                reviewBody: reviews[0]?.review || "Great company!",
              }),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://yourdomain.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Companies",
                  item: "https://yourdomain.com/company",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: company.name,
                  item: `https://jobfinder.anugrah.tech/company/${company.id}`,
                },
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
              name: company.name,
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
              url: `https://jobfinder.anugrah.tech/company/${company.id}`,
              telephone: "",
              priceRange: "",
            }),
          }}
        />
      </head>
      <Box className="w-2xl mx-auto p-6">
        <Card variant="classic">
          <Flex justify={"between"} align={"center"}>
            <Heading size="5">{company.name}</Heading>
            <Flex align={"center"} gap={"1"}>
              by: <Badge color="blue">{company.owner.email}</Badge>
            </Flex>
          </Flex>
          <Separator size="4" my="4" />
          <Card size="2">{company.description}</Card>
          {/* delete button */}
          <Flex justify={"end"} gap={"4"} align={"center"}>
            <Link href={"/add-job"}>
              <Button size="2" color="indigo">
                Add Job
              </Button>
            </Link>
            <DeleteCompany id={company.id} />
          </Flex>
          <Separator size="4" my="2" />
          <Box mt="2">
            <CompanyListingAndReviews reviews={reviews} company={company} />
          </Box>
        </Card>
      </Box>
    </div>
  );
}

// window.location.href
