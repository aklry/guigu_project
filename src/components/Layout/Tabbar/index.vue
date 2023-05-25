<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Left />
    </div>
    <div class="tabbar_right">
      <Right />
    </div>
  </div>
</template>

<script setup lang="ts">
import Left from './Left/index.vue'
import Right from './Right/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style lang="scss" scoped>
.tabbar {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    rgb(232, 223, 223),
    rgb(201, 178, 178),
    rgb(228, 220, 220)
  );
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
