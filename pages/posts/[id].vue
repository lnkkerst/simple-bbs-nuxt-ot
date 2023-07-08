<script setup lang="ts">
const route = useRoute();
const postId = route.params.id as string;
</script>

<template>
  <div>
    <PostContent :post-id="postId"></PostContent>
    <ElDivider></ElDivider>
    <PostComment mt="8" :post-id="postId"></PostComment>
  </div>
</template>

<style scoped></style>
