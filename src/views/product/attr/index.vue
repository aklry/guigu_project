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
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="120"
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="(item, index) in row.attrValueList"
              :key="index"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #="{ row }">
            <el-button icon="Edit" size="small" />
            <el-button icon="Delete" size="small" type="danger" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { categoryStore } from '@/store/modules/category'
import type { AttrResponseData, AttrList } from '@/api/product/attr/type'
//引入获取已有属性与属性值接口
import { reqAttr } from '@/api/product/attr'
const useCategoryStore = categoryStore()
//存储已有属性与属性值
let attrArr = ref<AttrList>([])
watch(
  () => useCategoryStore.c3Id,
  async () => {
    //清空上一次请求查询的属性与属性值
    attrArr.value = []
    //保证三级分类id有才发请求
    if (!useCategoryStore.c3Id) return
    //获取分类的ID
    const { c1Id, c2Id, c3Id } = useCategoryStore
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    if (result.code === 200) {
      attrArr.value = result.data
    }
  },
)
</script>

<style scoped></style>
