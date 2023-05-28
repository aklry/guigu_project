import request from '@/utils/request.ts'
//引入数据类型
import type { TrademarkResponseData } from './type'
//品牌管理模块接口地址

enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
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
