<template>
  <el-button type="default" size="small" icon="Refresh" circle />
  <el-button type="default" size="small" icon="FullScreen" circle />
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

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: 'Right',
}
</script>
<style scoped></style>
