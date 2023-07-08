// 该插件只在客户端注册，编辑器组件只用于客户端

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(mavonEditor);
});
