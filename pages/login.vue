<script setup lang="ts">
import { ElForm } from 'element-plus';
import type { LoginOptions } from '~/api/user';

type LoginForm = LoginOptions;

const router = useRouter();
const userStore = useUserStore();

const formEl = ref<typeof ElForm | null>(null);
const form = ref<LoginForm>({
  username: '',
  password: ''
});
const rules = ref<Record<keyof LoginForm, any>>({
  username: [{ required: true, message: '用户名不能为空' }],
  password: [{ required: true, message: '密码不能为空' }]
});

async function handleLogin() {
  if (!formEl.value) {
    return;
  }

  if (!(await (formEl.value as any).validate(() => {}))) {
    return;
  }

  try {
    await userStore.login(form.value);

    alert('登录成功');
    router.push('/');
  } catch (e) {
    alert('用户名或密码错误');
  }
}
</script>

<template>
  <div>
    <ElCard header="登录" shadow="always" max-w="360px" mx="auto">
      <ElForm ref="formEl" :model="form" :rules="rules" label-width="72px">
        <ElFormItem label="用户名" prop="username">
          <ElInput v-model="form.username"></ElInput>
        </ElFormItem>

        <ElFormItem label="密码" prop="password">
          <ElInput v-model="form.password" type="password"></ElInput>
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handleLogin">登录</ElButton>
          <ElButton @click="router.push('/register')">注册</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped></style>
