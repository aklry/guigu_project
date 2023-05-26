<template>
  <div>
    <h1>首页</h1>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
//获取仓库
import { userStore } from '@/store/modules/user'

const useUserStore = userStore()
//首页挂载完毕，发请求获取用户信息
onMounted(() => {
  useUserStore.getUserInfo()
})
</script>

<style scoped land="scss"></style>
