//引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
//全局组件对象
const allGlobalComponent = {
  SvgIcon
}
//对外暴露一个插件
export default {
  install(app) {
    //注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
