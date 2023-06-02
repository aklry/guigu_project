<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div class="data_table" v-show="scene === 0">
        <el-button
          :disabled="useCategoryStore.c3Id ? false : true"
          type="primary"
          icon="Plus"
          @click="addAttrHandle"
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
              <el-button icon="Edit" size="small" @click="updateAttrHandle" />
              <el-button icon="Delete" size="small" type="danger" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="operation" v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请你输入属性名称"
              v-model="attrParams.attrName"
            />
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          type="primary"
          icon="Plus"
          @click="addAttrValueHandle"
        >
          添加属性值
        </el-button>
        <el-button type="default" @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="80"
            align="center"
            label="序号"
            type="index"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <!-- row即为当前属性值对象 -->
              <el-input
                placeholder="请你输入属性值名称"
                v-model="row.valueName"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                :ref="(element:any)=>inputArr[$index]=element"
              />
              <div @click="toEdit(row, $index)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="($index:number) => attrParams.attrValueList.splice($index, 1)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveHandle"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick } from 'vue'
import { categoryStore } from '@/store/modules/category'
import type {
  AttrResponseData,
  AttrList,
  Attr,
  AttrValue,
} from '@/api/product/attr/type'
//引入获取已有属性与属性值接口
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr'
import { ElMessage } from 'element-plus'
const useCategoryStore = categoryStore()
//存储已有属性与属性值
let attrArr = ref<AttrList>([])
//控制卡片中的内容二选一
let scene = ref<number>(0) // 0:显示table 1:展示添加与修改
//收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '', //三级分类的id
  categoryLevel: 3, //代表的是3级分类
})
//准备一个数组，存储对应的组件(el-input)实例
let inputArr = ref<any>([])
watch(
  () => useCategoryStore.c3Id,
  () => {
    getAttr()
  },
)
const getAttr = async () => {
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
}
//添加属性按钮
const addAttrHandle = () => {
  scene.value = 1
  //每一次点击时，先清空一下数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: useCategoryStore.c3Id, //三级分类的id
    categoryLevel: 3, //代表的是3级分类
  })
}
//编辑属性按钮
const updateAttrHandle = () => {
  scene.value = 1
}
//取消按钮
const cancel = () => {
  scene.value = 0
}
//添加属性值按钮
const addAttrValueHandle = () => {
  //当点击添加属性值的按钮时,向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制每一个属性值编辑模式与查看模式的切换
  })
  nextTick(() => {
    inputArr.value[inputArr.value.length - 1].focus()
  })
}
//点击保存按钮
const saveHandle = async () => {
  //发送请求
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    //添加|修改数据成功 -> 切换场景
    scene.value = 0
    ElMessage.success(`${attrParams.id ? '修改成功' : '添加成功'}`)
    getAttr()
  } else {
    ElMessage.error(`${attrParams.id ? '修改失败' : '添加失败'}`)
  }
}
//属性值表单元素失去焦点事件
const toLook = (row: AttrValue, $index: number) => {
  //非法情况1(不能为空)
  if (row.valueName.trim() === '') {
    //提示信息
    ElMessage.error('属性值不能为空')
    attrParams.attrValueList.splice($index, 1)
    return
  }
  //非法情况2(不能重复)
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    //提示信息
    ElMessage.error('属性值不能重复')
    //将重复的属性值从数组中删掉
    attrParams.attrValueList.splice($index, 1)
    return
  }
  row.flag = false
}
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true
  //nextTick响应式数据发生变化，获取更新后的dom(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
</script>

<style scoped></style>
