import request from '@/utils/request.ts'
//引入数据类型
import type { TrademarkResponseData, hasTrademark } from './type'
//品牌管理模块接口地址

enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改品牌信息
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除已有品牌
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

//获取已有品牌的方法
/**
 *
 * @param page 当前第几页
 * @param limit 每页多少条数据
 * @returns
 */
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

//添加与修改品牌的方法
export const reqAddOrUpdateTrademark = (data: hasTrademark) => {
  if (data.id) {
    //修改已有品牌信息
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    //添加品牌信息
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data)
  }
}

//删除品牌方法
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_TRADEMARK_URL + id)
