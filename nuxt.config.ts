import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts
} from 'unocss';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 用到的 Nuxt Modules
  modules: [
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
    'nuxt-lodash',
    '@vueuse/nuxt'
  ],
  devtools: { enabled: true },
  // 定义自动导入扫描的文件夹，默认只有 `utils` 和 `composables`
  imports: {
    dirs: ['./utils', './composables', './api', './stores']
  },
  // 运行时的一些配置，参见：<https://nuxt.com/docs/getting-started/configuration>
  runtimeConfig: {
    public: {
      apiBase: process.env.API_ADDRESS ?? '/api'
    }
  },
  css: [
    // css 样式重置
    '@unocss/reset/tailwind.css',
    // element-plus 的 Nuxt 模块对样式的处理有一些问题，所以改成直接全局引入
    'element-plus/dist/index.css',
    '~/assets/styles/global.scss'
  ],
  // UnoCSS 配置
  unocss: {
    presets: [
      presetAttributify(),
      presetIcons(),
      presetUno(),
      presetWebFonts(),
      presetTypography()
    ]
  },
  elementPlus: {
    // 把自动导入样式给关了
    importStyle: false
  }
});
