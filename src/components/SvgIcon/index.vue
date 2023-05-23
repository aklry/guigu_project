<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
//接收父组件传递过来的参数
defineProps({
  //xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: String,
  //接收父组件传递的颜色参数
  color: {
    type: String,
    default: '',
  },
  //接收父组件传递的图标宽度
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style></style>
