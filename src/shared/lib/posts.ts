import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Book = CollectionEntry<'books'>;

/** 프로덕션 빌드에서는 draft를 숨기고, `astro dev`에서는 미리보기용으로 보여준다. */
function isVisible(post: Post): boolean {
  return import.meta.env.PROD ? !post.data.draft : true;
}

/** 공개 글 목록 (최신순) */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', isVisible);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 공개 글이 1편 이상 있는 책과 그 글 목록 (책은 order순, 글은 seriesOrder순) */
export async function getBooksWithPosts(): Promise<{ book: Book; posts: Post[] }[]> {
  const [books, posts] = await Promise.all([getCollection('books'), getPublishedPosts()]);

  return books
    .sort((a, b) => a.data.order - b.data.order)
    .map((book) => ({
      book,
      posts: posts
        .filter((p) => p.data.series === book.id)
        .sort((a, b) => (a.data.seriesOrder ?? 999) - (b.data.seriesOrder ?? 999)),
    }))
    .filter(({ posts }) => posts.length > 0);
}
