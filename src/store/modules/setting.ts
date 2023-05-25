import { defineStore } from 'pinia'
//layout组件相关配置仓库
export const settingStore = defineStore('setting', {
  state: () => {
    return {
      fold: false, //控制菜单是否折叠
    }
  },
})
