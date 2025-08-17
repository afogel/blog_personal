import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('post', (entry) => {
    return entry.data.draft !== true;
  });

  const categories = [...new Set(posts.map((p) => p.data.category).filter(Boolean))];

  return categories.map((category) => ({
    params: { category: encodeURIComponent(category) },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const { category } = params;
  const decodedCategory = decodeURIComponent(category!);

  const posts = await getCollection('post', (entry) => {
    return entry.data.draft !== true && entry.data.category === decodedCategory;
  });

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime();
  });

  return rss({
    title: `Ariel Fogel's Blog - ${decodedCategory}`,
    description: `Blog posts in the ${decodedCategory} category`,
    site: 'https://fogel.dev',
    language: 'en-US',

    items: sortedPosts.map((post) => ({
      link: `/${post.slug}`,
      title: post.data.title,
      description: post.data.excerpt || post.data.title,
      pubDate: post.data.publishDate,
      author: 'Ariel Fogel',
      categories: [decodedCategory, ...(post.data.tags || [])],
      customData: `
        ${post.data.image ? `<enclosure url="${post.data.image}" type="image/jpeg" />` : ''}
        ${post.data.series ? `<series>${post.data.series}</series>` : ''}
      `.trim(),
    })),

    customData: `
      <language>en-US</language>
      <category>${decodedCategory}</category>
      <managingEditor>ariel@pillar.security (Ariel Fogel)</managingEditor>
      <ttl>1440</ttl>
    `,
  });
};
