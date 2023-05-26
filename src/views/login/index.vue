<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
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
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入登录时间函数
import { getTime } from '@/utils/time'
//收集账号与密码数据
let loginForm = reactive({
  username: '',
  password: '',
})
//获取el-form组件
let loginForms = ref()
//定义用户名校验规则
const validateUserName = (rule: any, value: any, callback: any) => {
  //rule:数组校验规则对象
  //value: 表单元素的文本内容
  //callback: 函数，符合条件->放行
  //                不符合条件 -> 执行相对应代码(注入错误提示信息)
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
//定义密码校验规则
const validatePassword = (rule: any, value: any, callback: any) => {
  if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
    callback()
  } else {
    callback(new Error('密码至少8个字符,至少一个字母和一个数字'))
  }
}
//定义表单校验规则
let rules = {
  username: [
    // { required: true, min: 6, max: 10, message: '账号长度至少6位,但不能大于10位', trigger: 'change' },
    { trigger: 'change', validator: validateUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
    { trigger: 'change', validator: validatePassword },
  ],
}
let loading = ref(false)
const useUserStore = userStore()
const router = useRouter()
const route = useRoute()
//登录按钮的回调
const loginHandle = async () => {
  //保证所有的表单项校验通过之后再发请求
  await loginForms.value.validate()
  loading.value = true
  /**
   * 1. 通知仓库发送登录请求
   *  成功：跳转到首页
   *  失败：弹出登录失败信息
   */
  try {
    //保证登录成功
    await useUserStore.userLogin(loginForm)
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
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
