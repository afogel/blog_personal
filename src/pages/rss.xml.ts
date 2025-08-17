import rss from '@astrojs/rss';

import { SITE_CONFIG, METADATA_CONFIG, APP_BLOG_CONFIG } from '~/utils/config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export const GET = async () => {
  if (!APP_BLOG_CONFIG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const posts = await fetchPosts();

  return rss({
    title: `${SITE_CONFIG.name}'s Blog`,
    description: METADATA_CONFIG?.description || 'Software Engineering insights on Rails, AI Security, and Learning',
    site: import.meta.env.SITE,
    language: 'en-US',

    items: posts.flatMap((post) => ({
      link: getPermalink(post.permalink, 'post'),
      title: post.title,
      description: post.excerpt || post.title,
      pubDate: post.publishDate,
      author: post.author || 'Ariel Fogel',
      categories: [...(post.category ? [post.category] : []), ...(post.tags || [])],
      customData: `
        ${post.image ? `<enclosure url="${post.image}" type="image/jpeg" />` : ''}
        ${post.series ? `<series>${post.series}</series>` : ''}
        ${post.seriesOrder ? `<seriesOrder>${post.seriesOrder}</seriesOrder>` : ''}
      `.trim(),
    })),

    trailingSlash: SITE_CONFIG.trailingSlash,
    customData: `
      <language>en-US</language>
      <copyright>Copyright ${new Date().getFullYear()} Ariel Fogel</copyright>
      <category>Technology</category>
      <category>Software Development</category>
      <category>AI Security</category>
      <ttl>1440</ttl>
    `,
  });
};
