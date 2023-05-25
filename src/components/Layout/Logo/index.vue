<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
.logo {
  display: flex;
  align-items: center;
  width: 100%;
  height: $sliderLogoHeight;
  color: #fff;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
  p {
    font-size: $sliderTitleFontSize;
  }
}
</style>
