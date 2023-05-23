//统一管理user相关接口
import request from '@/utils/request.ts'
import type { loginForm, loginResponseData, userResponseData } from './type.ts'
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

//登录接口方法
export const reqLogin = (data: loginForm) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}
//获取用户信息
export const reqUserInfo = () => {
  return request.get<any, userResponseData>(API.USERINFO_URL)
}
