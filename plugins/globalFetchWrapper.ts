import { ofetch } from 'ofetch';

// 在这里替换掉全局的 `$fetch`，用于设定 `baseURL`，添加全局拦截器等

export default defineNuxtPlugin(_nuxtApp => {
  globalThis.$fetch = ofetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
    onRequest({ options }) {
      const userStore = useUserStore();
      if (userStore.user?.token) {
        options.headers = {
          Authorization: `Bearer ${userStore.user.token}`
        };
      }
    }
  });
});
