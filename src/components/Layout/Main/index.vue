<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>
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
