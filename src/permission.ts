//路由鉴权(某一个路由什么条件下可以被访问)
import router from '@/router'
import nprogress from 'nprogress'
import setting from './setting'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//引入存储用户信息的仓库
import store from './store'
import { userStore } from './store/modules/user'
const useUserStore = userStore(store)
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.start()
  //获取token,判断用户是否登录
  let token = useUserStore.token
  //获取用户名字
  let username = useUserStore.username
  if (token) {
    if (to.path === '/login') {
      return next({ path: '/' })
    } else {
      if (username) {
        return next()
      } else {
        try {
          //获取用户信息
          await useUserStore.getUserInfo()
          next()
        } catch (error) {
          //token过期: 获取不到用户信息

          /**
           * 1.退出登录
           * 2.重定向到login
           */
          useUserStore.userLogout()
          next({
            path: '/login',
            query: {
              redirect: to.path,
            },
          })
        }
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: { path: to.path },
      })
    }
  }
})

router.afterEach((to, from, next) => {
  nprogress.done()
})
//用户未登录: 用户只能访问login
//用户登录成功: 不能访问login[指向首页]
