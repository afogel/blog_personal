import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('post', (entry) => {
    return entry.data.draft !== true;
  });

  const baseUrl = 'https://fogel.dev';

  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/search', priority: '0.7', changefreq: 'monthly' },
    { url: '/hubs/web-development', priority: '0.8', changefreq: 'monthly' },
    { url: '/hubs/ai-security', priority: '0.8', changefreq: 'monthly' },
    { url: '/hubs/research', priority: '0.8', changefreq: 'monthly' },
  ];

  // Blog posts
  const blogPosts = posts.map((post) => ({
    url: `/${post.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: post.data.updateDate || post.data.publishDate,
  }));

  // Categories
  const categories = [...new Set(posts.map((p) => p.data.category).filter(Boolean))];
  const categoryPages = categories.map((category) => ({
    url: `/categories/${encodeURIComponent(category)}`,
    priority: '0.6',
    changefreq: 'weekly',
  }));

  // Tags
  const tags = [...new Set(posts.flatMap((p) => p.data.tags || []))];
  const tagPages = tags.map((tag) => ({
    url: `/tags/${encodeURIComponent(tag)}`,
    priority: '0.5',
    changefreq: 'weekly',
  }));

  const allPages = [...staticPages, ...blogPosts, ...categoryPages, ...tagPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
    ${page.lastmod ? `<lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>` : ''}
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
