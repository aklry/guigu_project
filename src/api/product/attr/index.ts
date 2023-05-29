//属性管理相关API
import request from '@/utils/request'
import type { CategoryResponseData } from './type'
enum API {
  //一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  //二级分类接口地址
  C2_URL = '/admin/product/getCategory2/',
  //三级分类接口地址
  C3_URL = '/admin/product/getCategory3/',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)

export const reqC2 = (id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + id)

export const reqC3 = (id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + id)
