import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
//引入数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { routes } from '@/router/routes'
export const userStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: routes, //仓库存储动态生成的路由,
      username: '', //用户姓名,
      avatar: '', //用户头像
    }
  },
  actions: {
    //用户登录逻辑
    async userLogin(data: loginFormData) {
      //登录请求
      let result: loginResponseData = await reqLogin(data)
      //登录请求:成功200->token
      //登录请求:失败201->错误信息
      if (result.code === 200) {
        //存储token
        this.token = result.data as string
        //本地持久化token
        SET_TOKEN(result.data as string)
        //保证async函数返回成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //获取用户信息
    async getUserInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      //退出登录接口(通知服务器本地用户唯一标识失效)
      let result: any = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        ;(this.username = ''), (this.avatar = '')
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
