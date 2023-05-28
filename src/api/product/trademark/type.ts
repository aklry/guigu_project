export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//已有品牌的数据类型
export interface hasTrademark {
  id?: number
  tmName: string
  logoUrl: string
}

//包含全部品牌数据的ts数据类型
export type Records = hasTrademark[]

//获取已有全部品牌的数据ts类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
