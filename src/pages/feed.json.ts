import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('post', (entry) => {
    return entry.data.draft !== true;
  });

  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime();
  });

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: "Ariel Fogel's Blog",
    home_page_url: 'https://fogel.dev',
    feed_url: 'https://fogel.dev/feed.json',
    description: 'Software Engineering insights on Rails, AI Security, and Learning',
    language: 'en-US',
    author: {
      name: 'Ariel Fogel',
      url: 'https://fogel.dev',
      avatar: 'https://fogel.dev/images/ariel-avatar.jpg',
    },
    items: sortedPosts.map((post) => ({
      id: `https://fogel.dev/${post.slug}`,
      url: `https://fogel.dev/${post.slug}`,
      title: post.data.title,
      content_html: post.body, // This would need to be rendered HTML in a real implementation
      content_text: post.data.excerpt || '',
      summary: post.data.excerpt || '',
      image: post.data.image,
      banner_image: post.data.image,
      date_published: post.data.publishDate.toISOString(),
      date_modified: (post.data.updateDate || post.data.publishDate).toISOString(),
      author: {
        name: post.data.author || 'Ariel Fogel',
      },
      tags: [...(post.data.category ? [post.data.category] : []), ...(post.data.tags || [])],
      // Custom extensions
      _series: post.data.series,
      _series_order: post.data.seriesOrder,
      _featured: post.data.featured || false,
      _external_links: post.data.externalLinks,
      _prerequisites: post.data.prerequisites,
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
