<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select
            v-model="useCategoryStore.c1Id"
            @change="changeCategory2Handle"
          >
            <!-- label:展示的数据 value:select收集的数据 -->
            <el-option
              v-for="(item, index) in useCategoryStore.c1Data"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            v-model="useCategoryStore.c2Id"
            @change="changeCategory3Handle"
          >
            <el-option
              v-for="[key, value] of Object.entries(useCategoryStore.c2Data)"
              :label="value.name"
              :key="key"
              :value="value.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="useCategoryStore.c3Id">
            <el-option
              v-for="[key, value] of Object.entries(useCategoryStore.c3Data)"
              :label="value.name"
              :key="key"
              :value="value.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { categoryStore } from '@/store/modules/category'
const useCategoryStore = categoryStore()
const getC1 = () => {
  useCategoryStore.getC1()
}
onMounted(() => {
  getC1()
})
const changeCategory2Handle = () => {
  //清空二级、三级分类的数据
  useCategoryStore.c2Id = ''
  useCategoryStore.c3Data = []
  useCategoryStore.c3Id = ''
  useCategoryStore.getC2()
}
const changeCategory3Handle = () => {
  useCategoryStore.c3Id = ''
  useCategoryStore.getC3()
}
</script>

<style scoped></style>
