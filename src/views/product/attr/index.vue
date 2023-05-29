<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0">
      <el-button
        :disabled="useCategoryStore.c3Id ? false : true"
        type="primary"
        icon="Plus"
      >
        添加平台属性
      </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column label="属性名称" width="120"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { categoryStore } from '@/store/modules/category'
const useCategoryStore = categoryStore()
</script>

<style scoped></style>
