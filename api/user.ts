// 用户相关的 API

import camelcaseKeys from 'camelcase-keys';

/**
 * 登录请求返回的数据
 */
export interface LoginResponseData {
  username: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * 登录请求表单
 */
export interface LoginOptions {
  username: string;
  password: string;
}

/**
 * @description 登录
 * @param 用户名和密码
 * @returns 用户和 Token
 */
export async function login({
  username,
  password
}: LoginOptions): Promise<LoginResponseData> {
  return await $fetch('/login', {
    method: 'POST',
    body: {
      username,
      password
    }
  }).then(data => camelcaseKeys(data as any) as LoginResponseData);
}

/**
 * 注册表单
 */
export interface RegisterOptions extends LoginOptions {}

/**
 * 注册返回的数据
 */
export interface RegisterResponseData {
  username: string;
  id: string;
}

/**
 * @description 注册
 * @param 用户名和密码
 * @returns 用户
 */
export async function register({
  username,
  password
}: RegisterOptions): Promise<RegisterResponseData> {
  return $fetch('/users', {
    method: 'POST',
    body: {
      username,
      password
    }
  });
}
