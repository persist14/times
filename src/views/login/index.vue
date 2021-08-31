<template>
  <div class="login-container">
      <!-- 标题 -->
      <van-nav-bar class="page-nav-bar"  title="登录">
        <van-icon @click="$router.back()" slot="left" class="backBeforePage" name="cross" />
      </van-nav-bar>
      <!-- 表单 -->
      <van-form  @submit="Onsubmit" ref="loginFormRef"  >
    <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
      type="number" maxlength="11"
    >
      <i slot="left-icon" class="toutiao toutiao-shouji" ></i>
    </van-field>
    <van-field
      v-model="user.code"
      name="code"
      placeholder="验证码"
      :rules="userFormRules.code"
    >

      <i slot="left-icon" class="toutiao toutiao-yanzhengma" ></i>
      <template #button>
        <van-count-down :time="time" format="ss s" v-if="isShowCountDown" @finish="isShowCountDown = false" />
    <van-button v-else  round size="small" type="primary" class="send-sms-btn"  native-type="button" @click="sendConfirmCode">发送验证码</van-button>
  </template>
    </van-field>
    <div class="login-sub-warp">
      <van-button   block type="info" class="login-btn" native-type="submit">登录</van-button>
    </div>
  </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isShowCountDown: false,
      time: 1000 * 60
    }
  },
  methods: {
    async Onsubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duraction: 0
      })

      try {
        const { data } = await login(this.user)
        this.$store.commit('setToken', data.data)
        this.$toast.success('登录成功')

        // 登陆成功后进行跳转
        this.$router.push('/my')
      } catch (error) {
        // 判断出错信息
        if (error.response.status === 400) {
          this.$toast.fail('用户名或密码错误')
        } else {
          this.$toast.fail('服务器端出错')
        }
      }
    },
    // 发送验证码
    async sendConfirmCode () {
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 这里说明校验手机号通过 显示倒计时
      this.isShowCountDown = true
      // 发送获取短信的请求
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('发送短信频繁， 请稍后再试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    background-color: #ededed;
    border: none;
    color: #666;
  }
  .login-sub-warp {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
