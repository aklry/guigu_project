import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObject } from '@/api/product/attr/type'
//定义仓库state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
export interface CategoryState {
  c1Data: CategoryObject[]
  c1Id: string | number
  c2Id: string | number
  c3Id: string | number
  c2Data: CategoryObject[]
  c3Data: CategoryObject[]
}
