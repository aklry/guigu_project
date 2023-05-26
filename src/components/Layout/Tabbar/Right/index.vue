<template>
  <el-button
    type="default"
    size="small"
    icon="Refresh"
    circle
    @click="refreshHandle"
  />
  <el-button type="default" size="small" icon="FullScreen" circle @click="fullScreenHandle" />
  <el-button type="default" size="small" icon="setting" circle />
  <img
    src="../../../../../public/logo.png"
    style="width: 24px; height: 24px; margin: 0 10px"
  />
  <!-- 退出登录 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { settingStore } from '@/store/modules/setting'
const useSettingStore = settingStore()
const refreshHandle = () => {
  useSettingStore.refresh = !useSettingStore.refresh
}
//实现全屏模式
const fullScreenHandle = () => {
  //判断当前屏幕是不是全屏
  let full = document.fullscreenElement //null -> 非全屏
  //切换全屏模式
  if (!full) {
    //文档根节点requestFullscreen,实现全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
export default {
  name: 'Right',
}
</script>
<style scoped></style>
