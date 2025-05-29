
export const generateSitemap = () => {
  const baseUrl = 'https://dreamdate.app';
  const pages = [
    { url: '', changefreq: 'daily', priority: '1.0' },
    { url: '/discover', changefreq: 'daily', priority: '0.9' },
    { url: '/matches', changefreq: 'daily', priority: '0.9' },
    { url: '/messages', changefreq: 'daily', priority: '0.8' },
    { url: '/community', changefreq: 'weekly', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.6' },
    { url: '/terms', changefreq: 'monthly', priority: '0.5' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://dreamdate.app/sitemap.xml

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Allow important pages
Allow: /
Allow: /discover
Allow: /community
Allow: /about
Allow: /terms`;

export const seoKeywords = {
  primary: [
    'online dating',
    'German dating',
    'find love',
    'authentic dating',
    'meaningful relationships',
    'singles',
    'dating app',
    'European dating'
  ],
  secondary: [
    'dating platform',
    'relationship advice',
    'dating tips',
    'love connections',
    'verified profiles',
    'safe dating',
    'compatible matches',
    'serious relationships'
  ],
  longTail: [
    'how to find love online',
    'authentic dating app Germany',
    'verified dating profiles',
    'meaningful connections online',
    'safe online dating platform',
    'German singles dating',
    'relationship compatibility matching',
    'serious dating app Europe'
  ]
};

export const defaultMetaTags = {
  title: 'DreamDate - Find Authentic Love & Meaningful Connections Online',
  description: 'Join DreamDate, Germany\'s premium dating platform for authentic connections. Meet verified singles, build meaningful relationships, and find your perfect match with our advanced compatibility system.',
  keywords: seoKeywords.primary.concat(seoKeywords.secondary),
  image: '/og-image.png',
  url: 'https://dreamdate.app'
};
