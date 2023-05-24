<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              @click="loginHandle"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

import { userStore } from '@/store/modules/user.ts'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
//收集账号与密码数据
let loginForm = reactive({
  username: '',
  password: '',
})
let loading = ref(false)
const useUserStore = userStore()
const router = useRouter()
//登录按钮的回调
const loginHandle = async () => {
  loading.value = true
  /**
   * 1. 通知仓库发送登录请求
   *  成功：跳转到首页
   *  失败：弹出登录失败信息
   */
  try {
    //保证登录成功
    await useUserStore.userLogin(loginForm)
    router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 40px;

    h1 {
      color: #fff;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
