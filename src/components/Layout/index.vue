<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider"></div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar"></div>
    <!-- 内容展示区域 -->
    <div class="layout_main"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $sliderWidth;
    height: 100vh;
    background-color: $sliderBackgroundColor;
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $sliderWidth);
    height: $tabbarHeight;
    top: 0;
    left: $sliderWidth;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $sliderWidth);
    height: calc(100vh - $tabbarHeight);
    top: $tabbarHeight;
    left: $sliderWidth;
    padding: 20px;
    overflow: auto;
  }
}
</style>
