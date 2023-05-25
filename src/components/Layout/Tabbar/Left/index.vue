<template>
  <el-icon @click="collapseHandle">
    <component :is="useSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 动态展示路由名字与标题 -->
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { settingStore } from '@/store/modules/setting'
const useSettingStore = settingStore()
const collapseHandle = () => {
  useSettingStore.fold = !useSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Left',
}
</script>
<style lang="scss" scoped>
.el-icon {
  margin-right: 10px;
}
</style>
