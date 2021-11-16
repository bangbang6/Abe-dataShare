<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <img :src="logo" class="sidebar-logo">
        <div class="sidebar-title">智慧城市数据共享与交换平台</div>
      </div>
      <div class="menu">
        <div :class="['login-text',activeIndex === 0?'active':'']" @click="e=>activeIndex=0">账号密码登录</div>
        <div :class="['register-text',activeIndex === 1?'active':'']" @click="e=>activeIndex=1">注册</div>
        </el-menu>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item v-if="activeIndex===1" prop="repassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input

          :key="passwordType"
          ref="repeat"
          v-model="loginForm.repassword"
          :type="passwordType"
          placeholder="Password Repeat"
          name="repeatPassword"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div v-if="activeIndex===0" class="radio">
        <el-radio-group v-model="userRole">
          <el-radio :label="0">用户</el-radio>
          <el-radio :label="1">管理员</el-radio>

        </el-radio-group>
      </div>
      <div v-if="activeIndex===1" class="radio">
        <el-radio-group v-model="channel">
          <el-radio v-for="item in channels" :key="item.id" :label="item.id">{{ item.channelName }}</el-radio>

        </el-radio-group>
      </div>

      <el-button
        v-if="activeIndex===0"
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >Login</el-button>
      <el-button
        v-else
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >Register</el-button>
    </el-form>
  </div>
</template>

<script>
import { adminLogin, getAllChannel, register, userLogin } from '@/api/user'
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validaterePassword = (rule, value, callback) => {
      console.log('value', value)
      console.log('value2', this.loginForm.password)
      if (value !== this.loginForm.password) {
        callback('前后密码不一致')
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        repassword: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        repassword: [{ required: true, trigger: 'blur', validator: validaterePassword }]
      },

      logo: require('@/assets/logo.png'),
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      activeIndex: 0,
      userRole: 0,
      channel: 1,
      channels: []
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  async mounted () {
    this.channels = await getAllChannel()
    console.log('this.channels', this.channels)
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const info = await register({ ...this.loginForm, channelId: this.channel })
          console.log('register', info)
          setToken('abe-token', info.token)
          setToken('abe-username', info.user.username)
          this.$router.push({ path: this.redirect || '/info' })
        }
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          if (this.userRole === 0) {
            const res = await userLogin(this.loginForm)
            console.log('login', res)
            setToken('abe-token', res.token)
            setToken('abe-username', res.user.username)
            this.$router.push({ path: this.redirect || '/info' })
          } else {
            const res = await adminLogin(this.loginForm)
            console.log('login', res)
            setToken('abe-token', res.token)
            setToken('abe-username', res.user.username)
            this.$router.push({ path: this.redirect || '/info' })
          }

        /*   this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/info' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          }) */
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .radio{
    height:34px;
    .el-radio__label{
      color: white;
    }
    /* line-height: 54px; */
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .menu{
    display: flex;
    align-items: center;
    justify-content: space-around;
    color:white;
    height: 40px;
    margin-bottom:20px;
    div{
      cursor: pointer;
      font-size: 14px;
      width:160px;
      height:50px;
      text-align: center;
      line-height: 50px;
      &.active{
        color: #2593FC;
        border-bottom:1px #2593FC solid
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 560px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    display: flex;
    font-size: 32px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    .sidebar-logo{
    width:32px;
    height:32px;

    }
    div {
      margin-left: 20px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
