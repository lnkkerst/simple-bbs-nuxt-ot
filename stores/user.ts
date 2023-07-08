// 全局 User State 使用 Pinia 进行管理，参见：<https://pinia.vuejs.org/ssr/nuxt.html>

import { defineStore } from 'pinia';
import { login as apiLogin } from '~/api/user';
import type { LoginOptions } from '~/api/user';

interface User {
  username: string;
  token: string;
}

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User | null>(null);

    async function login(username: string, password: string): Promise<void>;
    async function login(opts: LoginOptions): Promise<void>;
    async function login(
      optsOrUsername: LoginOptions | string,
      mayBePassword?: string
    ): Promise<void> {
      let username: string;
      let password: string;
      if (typeof optsOrUsername !== 'string') {
        username = optsOrUsername.username;
        password = optsOrUsername.password;
      } else {
        username = optsOrUsername;
        password = mayBePassword as string;
      }
      const res = await apiLogin({ username, password });
      user.value = { username: res.username, token: res.accessToken };
    }

    async function logout() {
      user.value = null;
    }

    return { user, login, logout };
  },
  { persist: true }
);
