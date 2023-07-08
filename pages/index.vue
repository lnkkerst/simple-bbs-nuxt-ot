<script setup lang="ts">
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { getPosts } from '~/api';

const router = useRouter();

const curPage = ref(1);
const perPage = ref(20);
const posts = ref(await getPosts({ page: curPage.value, size: perPage.value }));
const pageEnded = ref(false);
const rootEl = ref<Element | null>(null);

// 加载下一页
async function load() {
  if (pageEnded.value) {
    return;
  }
  curPage.value++;
  const res = await getPosts({ page: curPage.value, size: perPage.value });
  if (res.length === 0) {
    pageEnded.value = true;
    return;
  }
  posts.value.push(...res);
}

onMounted(() => {
  // 只有在客户端（浏览器）才存在 `document`
  if (process.client) {
    useInfiniteScroll(document, load, {
      distance: 10
    });
  }
});
</script>

<template>
  <div ref="rootEl">
    <ElCard v-for="post in posts" :key="post.id" mb="sm">
      <template #header>
        <div flex items-center>
          <span text="xl" font="bold">{{ post.title }}</span>
          <div grow></div>
          <span text="sm gray">
            {{
              `${post.author.username} 发布于 ${new Date(
                post.publishAt * 1000
              ).toLocaleString()}`
            }}
          </span>
        </div>
      </template>

      <div
        v-html="
          sanitizeHtml(
            marked.parse(post.content, { headerIds: false, mangle: false })
          )
        "
      ></div>

      <div mt="sm">
        <ElButton type="primary" link @click="router.push(`/posts/${post.id}`)">
          查看全文
        </ElButton>
      </div>
    </ElCard>

    <div text="gray center">一滴都没有了</div>
  </div>
</template>

<style scoped></style>
