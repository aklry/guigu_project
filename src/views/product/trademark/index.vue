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
              @click="editTrademarkHandle"
            />
            <el-button size="small" type="danger" icon="Delete" />
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
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="80">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80">
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
import { ref, onMounted, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
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
}
const editTrademarkHandle = () => {
  dialogFormVisible.value = true
}
//对话框底部确认按钮
const confirmSubmitHandle = async () => {
  let result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    //对话框隐藏
    dialogFormVisible.value = false
    ElMessage.success(`添加品牌${result.message}成功`)
    getHasTradeMark()
  } else {
    ElMessage.error('添加品牌失败')
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
