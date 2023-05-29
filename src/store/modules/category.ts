import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryState } from './types/type'
import type { CategoryResponseData } from '@/api/product/attr/type'
export const categoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Data: [],
      c1Id: '',
      //存储二级分类数据
      c2Data: [],
      //存储二级分类数据的id
      c2Id: '',
      //存储三级分类数据
      c3Data: [],
      //存储三级分类数据的id
      c3Id: '',
    }
  },
  actions: {
    //获取一级分类数据
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Data = result.data
      }
    },
    //获取二级分类数据
    async getC2() {
      let result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code === 200) {
        this.c2Data = result.data
      }
    },
    //获取三级分类数据
    async getC3() {
      let result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code === 200) {
        this.c3Data = result.data
      }
    },
  },
  getters: {},
})
