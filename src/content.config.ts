import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from '@/data/categories';

// `_`로 시작하는 파일(예: _template.mdx)은 컬렉션에서 제외한다.
const CONTENT_PATTERN = '**/[^_]*.{md,mdx}';

const posts = defineCollection({
  loader: glob({ pattern: CONTENT_PATTERN, base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(CATEGORIES),
      tags: z.array(z.string()).default([]),
      thumbnail: image().optional(),
      description: z.string(),
      draft: z.boolean().default(false),
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
    }),
});

const books = defineCollection({
  loader: glob({ pattern: CONTENT_PATTERN, base: './src/content/books' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),
      order: z.number().default(0),
    }),
});

export const collections = { posts, books };
