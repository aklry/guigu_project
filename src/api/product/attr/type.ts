export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//分类ts类型
export interface CategoryObject {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

//相应的分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObject[]
}

//属性与属性值的ts类型

//属性值对象的ts类型
export interface AttrValue {
  id: number
  valueName: string
  attrId: number
}
//存储每一个属性值对象的数组类型
export type attrValueList = AttrValue[]
//属性对象
export interface Attr {
  id: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: attrValueList
}

//存储每一个属性对象的数组的ts类型
export type AttrList = Attr[]

//属性接口返回的数据类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
