// 评论相关的 API

import camelcaseKeys from 'camelcase-keys';
import type { Author, Pager, Post } from '~/api';

export interface CommentAuthor extends Author {}

export interface Comment {
  content: string;
  id: string;
  authorId: string;
  author: CommentAuthor;
  postId: string;
  post: Post;
  publishAt: number;
}

export async function getCommentsByPostId({
  postId,
  page = 1,
  size = 20
}: Partial<Pager> & { postId: string }): Promise<Comment[]> {
  const skip = (page - 1) * size;
  const limit = size;
  return $fetch('/comments', { params: { post_id: postId, skip, limit } }).then(
    data => camelcaseKeys(data as any) as Comment[]
  );
}

export async function createComment({
  content,
  postId
}: Pick<Comment, 'content' | 'postId'>): Promise<Comment[]> {
  return $fetch('/comments', {
    method: 'POST',
    body: {
      content,
      post_id: postId
    }
  }).then(data => camelcaseKeys(data as any) as Comment[]);
}
