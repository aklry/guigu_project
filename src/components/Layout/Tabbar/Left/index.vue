<template>
  <el-icon @click="collapseHandle">
    <component :is="useSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="vertical-align: bottom">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 匹配路由的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { settingStore } from '@/store/modules/setting'
//引入路由对象
import { useRoute } from 'vue-router'
const useSettingStore = settingStore()
const collapseHandle = () => {
  useSettingStore.fold = !useSettingStore.fold
}

const route = useRoute()
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
