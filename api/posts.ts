// 帖子相关的 API

import camelcaseKeys from 'camelcase-keys';
import type { Author, Pager } from '~/api';

export interface PostAuthor extends Author {}

export interface Post {
  title: string;
  content: string;
  id: string;
  authorId: string;
  author: PostAuthor;
  publishAt: number;
}

export async function getPost({ id }: { id: string }): Promise<Post> {
  return $fetch(`/posts/${id}`).then(
    data => camelcaseKeys(data as any) as Post
  );
}

export async function getPosts({
  page = 1,
  size = 20
}: Partial<Pager>): Promise<Post[]> {
  const skip = (page - 1) * size;
  const limit = size;
  return $fetch('/posts', { params: { skip, limit } }).then(
    data => camelcaseKeys(data as any) as Post[]
  );
}

export async function createPost({
  title,
  content
}: Pick<Post, 'title' | 'content'>): Promise<Post> {
  return $fetch('/posts', {
    method: 'POST',
    body: {
      title,
      content
    }
  }).then(data => camelcaseKeys(data as any) as Post);
}
