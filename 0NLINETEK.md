# For 0nlineTek XLS

## 需要注意的点：

- 某些页面第一页的数据需要在 `setup` 函数顶层获取，不然服务端不会渲染出来
- 尽量优先使用 Nuxt 的 Modules
- `marked` v5 版本有很多 BREAK CHANGES
- `vueuse` v10 版本 `useInfiniteScroll` 行为不一致，回退到了 v9
- `process.client` 和 `process.server` 可以判断当前是在服务端还是客户端
- 有些第三方依赖本身不是用 TypeScript 写的，但很多都有对应的声明文件，通过安装 `@types/[包名]` 安装声明文件，参见：<https://ts.xcatliu.com/basics/declaration-files.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6>

## 和 SPA 版本不同之处：

- 用了 Pinia 进行状态管理，通过 `@pinia-plugin-persistedstate/nuxt` 实现持久化
- `marked` v5 版本默认没有 sanitize HTML 的功能（去掉 Markdown 里面 \<script\> 等危险内容），这里用了第三方的库 `sanitize-html` 实现
- 使用 `camelcase-keys` 把后端发过来的下划线风格的数据转换成了小驼峰格式
