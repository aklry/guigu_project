import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
//配置element-plus国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const app = createApp(App)
//将应用挂载到挂载点
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
})
app.mount('#app')
