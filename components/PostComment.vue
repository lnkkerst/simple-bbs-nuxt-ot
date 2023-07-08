<script setup lang="ts">
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';

// TypeScript 定义 `props` 参见：https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = defineProps<{
  postId: string;
}>();

const userStore = useUserStore();

const curPage = ref(1);
const perPage = ref(20);
const comments = ref(
  await getCommentsByPostId({
    postId: props.postId,
    page: curPage.value,
    size: perPage.value
  })
);
const pageEnded = ref(false);
const newComment = ref('');

async function load() {
  if (pageEnded.value) {
    return;
  }
  curPage.value++;
  const res = await getCommentsByPostId({
    postId: props.postId,
    page: curPage.value,
    size: perPage.value
  });
  if (res.length === 0) {
    pageEnded.value = true;
    return;
  }
  comments.value.push(...res);
}

async function handleSubmit() {
  await createComment({ content: newComment.value, postId: props.postId });
  comments.value = await getCommentsByPostId({ postId: props.postId });
}

onMounted(() => {
  // 只有在客户端才有 `document`
  if (process.client) {
    useInfiniteScroll(document, load, { distance: 10 });
  }
});
</script>

<template>
  <div>
    <template v-if="userStore.user">
      <div>
        <div text="xl" font="bold" my="sm">发布新评论</div>
        <ElInput v-model="newComment" type="textarea" my="sm"></ElInput>
        <div flex>
          <div grow></div>
          <ElButton type="primary" @click="handleSubmit">发布</ElButton>
        </div>
      </div>
    </template>
    <div v-else>
      想要发评论，请先
      <RouterLink text-blue to="/login">登录</RouterLink>
    </div>

    <ElDivider></ElDivider>

    <div text="xl" font="bold" my="sm">评论区</div>
    <ElTimeline>
      <ElTimelineItem v-for="comment in comments" :key="comment.id">
        <ElCard>
          <template #header>
            <div flex>
              <div>
                <span mx="1" text="lg">{{ comment.author?.username }}</span>
                <span text="gray">说：</span>
              </div>
              <div grow></div>
              <div relative top="1.5" text="sm gray">
                {{ new Date(comment.publishAt * 1000).toLocaleString() }}
              </div>
            </div>
          </template>
          <div
            prose
            max-w-full
            v-html="
              sanitizeHtml(
                marked.parse(comment.content, {
                  headerIds: false,
                  mangle: false
                })
              )
            "
          ></div>
        </ElCard>
      </ElTimelineItem>
    </ElTimeline>
  </div>
</template>

<style scoped></style>
