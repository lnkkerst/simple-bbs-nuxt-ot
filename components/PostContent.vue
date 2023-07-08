<script setup lang="ts">
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const props = defineProps<{
  postId: string;
}>();

const post = ref(await getPost({ id: props.postId }));
</script>

<template>
  <div prose max-w-full>
    <h1>{{ post.title }}</h1>
    <div flex>
      <div grow></div>
      <span text="gray">
        {{
          `${post.author?.username} 于 ${new Date(
            post.publishAt * 1000
          ).toLocaleString()}`
        }}
      </span>
    </div>
    <div
      v-html="
        sanitizeHtml(
          marked.parse(post.content ?? '', { headerIds: false, mangle: false })
        )
      "
    ></div>
  </div>
</template>

<style scoped></style>
