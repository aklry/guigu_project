<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格数据,用于展示已有品牌数据 -->
    <el-table :data="trademarkArr" style="margin: 10px 0;" border>
      <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit" />
          <el-button size="small" type="danger" icon="Delete" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页
      v-model:current-page:设置分页器当前页码
      v-model:page-size="":设置每页多少条数据
      page-sizes:每页显示个数选择器的选项设置
    -->
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizes"
      layout="prev, pager, next, jumper, ->, total, sizes, " :total="total" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark/index.ts'
//引入数据类型
import type { Records, TrademarkResponseData } from '@/api/product/trademark/type'

//当前页码
let currentPage = ref<number>(1)
//每页多少条数据
let pageSize = ref<number>(3)

let pageSizes = ref<number[]>([3, 5, 7, 9])
//定义已有品牌总数
let total = ref<number>(0)
//定义存储已有品牌的容器
let trademarkArr = ref<Records>([])
//获取已有品牌数据
const getHasTradeMark = async () => {
  let result: TrademarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(() => {
  getHasTradeMark()
})
</script>

<style scoped></style>
