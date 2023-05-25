import { defineStore } from 'pinia'
//引入接口
import { reqLogin } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { routes } from '@/router/routes'
export const userStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: routes, //仓库存储动态生成的路由
    }
  },
  actions: {
    //用户登录逻辑
    async userLogin(data: loginForm) {
      //登录请求
      let result: loginResponseData = await reqLogin(data)
      //登录请求:成功200->token
      //登录请求:失败201->错误信息
      if (result.code === 200) {
        //存储token
        this.token = result.data.token as string
        //本地持久化token
        SET_TOKEN(result.data.token as string)
        //保证async函数返回成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
