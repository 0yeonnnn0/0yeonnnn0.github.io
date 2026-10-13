import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '@/shared/config/site';
import { getPublishedPosts } from '@/shared/lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>ko-kr</language>',
  });
}
