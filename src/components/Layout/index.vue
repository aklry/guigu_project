<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: useSettingStore.fold ? true : false }"
    >
      <Logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :collapse="useSettingStore.fold ? true : false"
          background-color="#001529"
          text-color="#fff"
          router
          :default-active="route.path"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="useUserStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: useSettingStore.fold ? true : false }"
    >
      <Tabbar />
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: useSettingStore.fold ? true : false }"
    >
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
//引入左侧菜单的logo
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
//引入右侧内容展示区域组件
import Main from './Main/index.vue'
//引入顶部tabbar
import Tabbar from './Tabbar/index.vue'
//获取用户相关仓库
import { userStore } from '@/store/modules/user'
import { settingStore } from '@/store/modules/setting'
import { useRoute } from 'vue-router'
const useUserStore = userStore()
const useSettingStore = settingStore()
//获取路由对象
const route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';

.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $sliderWidth;
    height: 100vh;
    background-color: $sliderBackgroundColor;
    transition: width 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $sliderLogoHeight);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $sliderMinWidth;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $sliderWidth);
    height: $tabbarHeight;
    top: 0;
    left: $sliderWidth;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $sliderMinWidth);
      left: $sliderMinWidth;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $sliderWidth);
    height: calc(100vh - $tabbarHeight);
    top: $tabbarHeight;
    left: $sliderWidth;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $sliderMinWidth);
      left: $sliderMinWidth;
    }
  }
}
</style>
