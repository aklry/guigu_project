<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.logo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: $sliderLogoHeight;
  color: #fff;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $sliderTitleFontSize;
  }
}
</style>
