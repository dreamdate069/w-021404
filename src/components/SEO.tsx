
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "DreamDate - Find Authentic Love & Meaningful Connections Online",
  description = "Join DreamDate, the premium dating platform for authentic connections in Germany. Meet verified singles, build meaningful relationships, and find your perfect match with our advanced compatibility system.",
  keywords = ["online dating", "German dating", "find love", "authentic dating", "meaningful relationships", "singles", "dating app", "European dating"],
  image = "/og-image.png",
  url = "https://dreamdate.app",
  type = "website",
  author,
  publishedTime,
  modifiedTime
}) => {
  const siteTitle = "DreamDate";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  const keywordsString = keywords.join(", ");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author || "DreamDate Team"} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article specific tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          <meta property="article:section" content="Dating & Relationships" />
        </>
      )}

      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "DreamDate",
          "url": "https://dreamdate.app",
          "logo": "https://dreamdate.app/og-image.png",
          "description": "Premium dating platform for authentic connections and meaningful relationships",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "DE"
          },
          "sameAs": [
            "https://twitter.com/dreamdateapp",
            "https://facebook.com/dreamdateapp",
            "https://instagram.com/dreamdateapp"
          ]
        })}
      </script>

      {/* Structured Data for WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "DreamDate",
          "url": "https://dreamdate.app",
          "description": "Find authentic love and meaningful connections on Germany's premium dating platform",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://dreamdate.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
