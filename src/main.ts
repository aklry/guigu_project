import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
//配置element-plus国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
//引入自定义插件:注册整个项目的全局组件
import globalComponent from '@/components/index.ts'
//引入模板的全局样式
import '@/styles/index.scss'
//引入路由
import router from './router'
const app = createApp(App)
//将应用挂载到挂载点
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
})
//安装自定义插件
app.use(globalComponent)
app.use(router)
app.mount('#app')
