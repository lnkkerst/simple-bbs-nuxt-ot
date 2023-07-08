<script setup lang="ts">
const userStore = useUserStore();
const router = useRouter();

async function handleLogout() {
  await userStore.logout();
  alert('登出成功');
  router.push('/');
}
</script>

<template>
  <ElContainer>
    <ElHeader shadow>
      <div flex items="center" h="full">
        <NuxtLink text-5 to="/">Simple BBS</NuxtLink>
        <div grow></div>
        <template v-if="userStore.user">
          <span mx="sm">
            <span text="gray xs">登录为</span>
            <span>{{ userStore.user.username }}</span>
          </span>
          <ElButton link type="primary" @click="router.push('/posts/create')">
            发帖
          </ElButton>
          <ElButton link type="danger" @click="handleLogout">登出</ElButton>
        </template>
        <ElButton
          v-else
          link
          type="primary"
          @click="useRouter().push('/login')"
        >
          登录
        </ElButton>
      </div>
    </ElHeader>

    <ElMain>
      <div max-w="960px" w="96/100" mx="auto">
        <slot />
      </div>
    </ElMain>
  </ElContainer>
</template>

<style scoped></style>
