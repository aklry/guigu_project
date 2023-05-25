<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { settingStore } from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'
//控制当前组件是否销毁重建
let flag = ref(true)
const useSettingStore = settingStore()
//监听仓库内部的数据是否发生变化,如果发生变化，说明用户点击过刷新按钮
watch(
  () => useSettingStore.refresh,
  () => {
    //点击刷新按钮，路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
