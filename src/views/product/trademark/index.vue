<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" icon="Plus" @click="addTrademarkHandle">
        添加品牌
      </el-button>
      <!-- 表格数据,用于展示已有品牌数据 -->
      <el-table :data="trademarkArr" style="margin: 10px 0" border>
        <el-table-column
          label="序号"
          width="80"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row }">
            <img
              :src="row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editTrademarkHandle(row)"
            />
            <el-popconfirm
              :title="`您确定要删除${row.tmName}这个品牌吗?`"
              width="200"
              @confirm="confirmDeleteHandle(row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页
      v-model:current-page:设置分页器当前页码
      v-model:page-size="":设置每页多少条数据
      page-sizes:每页显示个数选择器的选项设置
    -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        layout="prev, pager, next, jumper, ->, total, sizes, "
        @current-change="getHasTradeMark"
        @size-change="pageSizeChange"
        :total="total"
      />
    </el-card>
    <!-- 对话框组件：用于添加品牌与修改品牌 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        :model="trademarkParams"
        :rules="rules"
        style="width: 80%"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100" prop="tmName">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="default" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="confirmSubmitHandle">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index.ts'
//引入数据类型
import type {
  Records,
  TrademarkResponseData,
  hasTrademark,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

//当前页码
let currentPage = ref<number>(1)
//每页多少条数据
let pageSize = ref<number>(3)

let pageSizes = ref<number[]>([3, 5, 7, 9])
//定义已有品牌总数
let total = ref<number>(0)
//定义存储已有品牌的容器
let trademarkArr = ref<Records>([])
//定义控制对话框组件的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
//定义收集新增品牌数据
let trademarkParams = reactive<hasTrademark>({
  tmName: '',
  logoUrl: '',
})
//获取表单DOM元素
let formRef = ref()
//获取已有品牌数据
const getHasTradeMark = async (page = 1) => {
  currentPage.value = page
  let result: TrademarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
onMounted(() => {
  getHasTradeMark()
})
//分页器当前页码改变时
// const changeCurrentPage = () => {
//   getHasTradeMark()
// }

//当下拉菜单发生变化时
const pageSizeChange = () => {
  //当数据量发生变化时，让当前页码归一
  // currentPage.value = 1
  getHasTradeMark()
}

//添加品牌按钮
const addTrademarkHandle = () => {
  dialogFormVisible.value = true
  //将收集的表单数据清空
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  trademarkParams.id = 0

  //清除校验字段(第一种写法)
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  //清除校验字段(第二种写法)
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
//编辑按钮
const editTrademarkHandle = (row: hasTrademark) => {
  //展示已有品牌数据
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
  // trademarkParams.id = row.id
  Object.assign(trademarkParams, row)
  dialogFormVisible.value = true
  //清空校验规则错误信息
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
}
//对话框底部确认按钮(添加|修改品牌)
const confirmSubmitHandle = async () => {
  //在发请求之前对整个表单进行校验
  await formRef.value.validate()
  let result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    ElMessage.success(`${trademarkParams.id ? '修改品牌成功' : '添加品牌成功'}`)
    getHasTradeMark(trademarkParams.id ? currentPage.value : 1)
    //对话框隐藏
    dialogFormVisible.value = false
  } else {
    ElMessage.error(`${trademarkParams.id ? '修改品牌失败' : '添加品牌失败'}`)
    //对话框隐藏
    dialogFormVisible.value = false
  }
}
//气泡框确认删除按钮
const confirmDeleteHandle = async (id: number) => {
  let result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    getHasTradeMark(
      trademarkArr.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage.error('删除失败')
  }
}

//上传文件前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //要求上传图片格式 png|jpg|gif 4M
  if (
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传文件大小必须小于4M')
    }
  } else {
    ElMessage.error('图片格式必须为jpg|png|gif')
    return false
  }
  return true
}
//上传文件成功时触发的钩子函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  //response: 即服务器返回的数据
  response,
  uploadFile,
) => {
  trademarkParams.logoUrl = response.data
  formRef.value.clearValidate()
}
//自定义校验规则方法
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    //校验未通过
    callback(new Error('品牌名称位数大于等于两位'))
  }
}
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('logo图片务必上传'))
  }
}
//表单校验规则对象
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
  logoUrl: [{ required: true, trigger: 'blur', validator: validateLogoUrl }],
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
