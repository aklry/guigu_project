import type { RouteRecordRaw } from 'vue-router'
//定义仓库state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
