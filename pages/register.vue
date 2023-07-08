<script setup lang="ts">
import { ElForm } from 'element-plus';
import { type LoginOptions, register } from '~/api/user';

type LoginForm = LoginOptions;

const router = useRouter();

const formEl = ref<typeof ElForm | null>(null);
const form = ref<LoginForm>({
  username: '',
  password: ''
});
// keyof 关键字可以拿到类型的所有键名
const rules = ref<Record<keyof LoginForm, any>>({
  username: [{ required: true, message: '用户名不能为空' }],
  password: [{ required: true, message: '密码不能为空' }]
});

async function handleRegister() {
  if (!formEl.value) {
    return;
  }

  if (!(await formEl.value.validate(() => {}))) {
    return;
  }

  try {
    await register(form.value);
    alert('注册成功');
    router.push('/login');
  } catch (e) {
    alert('用户名已被注册');
  }
}
</script>

<template>
  <div>
    <ElCard header="注册" shadow="always" max-w="360px" mx-auto>
      <ElForm ref="formEl" :model="form" :rules="rules" label-width="72px">
        <ElFormItem label="用户名" prop="username">
          <ElInput v-model="form.username"></ElInput>
        </ElFormItem>

        <ElFormItem label="密码" prop="password">
          <ElInput v-model="form.password" type="password"></ElInput>
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handleRegister">注册</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped></style>
