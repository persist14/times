<template>
  <div class="my-container">
    <!-- 用户信息显示 已登录 -->
    <div class="header user-info" v-if="user">
        <!-- 上 -->
        <div class="base-info">
         <!-- 左 -->
         <div class="left">
            <van-image
            class="avatar" round   fit="cover"
            :src="userInfo.photo"
          />
         <span class="text">
            {{userInfo.name}}
         </span>
          </div>
          <!-- 右 -->
          <div class="right">
            <van-button size="mini" round >编辑资料</van-button>
          </div>
         </div>

        <!-- 下 -->
        <div class="data-info">
          <div class="dataItem">
            <!-- 上 -->
          <div class="count"> {{userInfo.art_count}}
          </div>
          <!-- 下 -->
          <div class="text">头条</div>
          </div>
          <div class="dataItem">
            <!-- 上 -->
          <div class="count">{{userInfo.follow_count}}
          </div>
          <!-- 下 -->
          <div class="text">关注</div>
          </div>
          <div class="dataItem">
            <!-- 上 -->
          <div class="count">{{userInfo.fans_count}}
          </div>
          <!-- 下 -->
          <div class="text">粉丝</div>
          </div>
          <div class="dataItem">
            <!-- 上 -->
          <div class="count">{{userInfo.like_count}}
          </div>
          <!-- 下 -->
          <div class="text">获赞</div>
          </div>
        </div>
    </div>
    <!-- 未登录 -->
    <div class=" header login-bg" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" class="avatar" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid cell-msg" clickable >
      <van-grid-item class="grid-item" >
        <i slot="icon" class="toutiao toutiao-shoucang" ></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item" >
        <i slot="icon" class="toutiao toutiao-lishi" ></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 单元格导航 -->
    <van-cell class="cell-msg">
      <van-cell title="消息通知" is-link />
    </van-cell>
    <van-cell class="cell-msg">
      <van-cell  title="小智同学" is-link />
    </van-cell>
    <!-- 退出登录 已登录 -->
    <van-cell class="loginOut"  title="退出登录" v-if="user" clickable @click="logout"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    // 拿到vuex中state的usertoken值
    ...mapState(['user'])
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确定退出'
      }).then(() => {
        this.$store.commit('setToken', null)
      }).catch(() => {
        // console.log('取消退出')
      })
    },
    // 加载用户自己信息
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        console.log('获取用户信息失败，请稍后再试', err)
      }
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
    .header{
      height: 361px;
      background: url('~@/assets/banner.png');
      background-size: cover;
      display: flex;
        justify-content: center;
        align-items: center;
      .login-btn {
        .avatar {
          width: 132px;
        }
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span.text {
          display: block;
          margin-top: 15px;
          font-size: 28px;
          color: #fff;
        }
      }
    }
    .user-info {
      display: flex;
      flex-direction: column;
      .base-info {
        width: 100%;
        height: 231px;
        // background-color: pink;
        padding: 76px 32px 23px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .avatar {
            align-items: center;
            width: 132px;
            height: 132px;
            margin-right: 25px;
            border: 4px solid #fff;
          }
           span.text {
          font-size: 30px;
          color: #fff;
        }
        }
      }
      .data-info {
        width: 100%;
        // background-color:#ccc;
        display: flex;
        .dataItem {
          height: 130px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 36px;
          }
          .text {
            font-size: 23px;
          }
          color: #fff;
        }
      }
    }
    .grid {
      .grid-item {
        height: 141px;
        i.toutiao {
          font-size: 45px;
        }
        .toutiao-shoucang {
          color: #eb5253;
        }
         .toutiao-lishi {
          color: #ff9d1d;
        }
        span.text {
          font-size: 28px;
        }
      }
    }
    .loginOut {
      text-align: center;
      color: #f33;
    }
    .cell-msg {
      margin-bottom: 9px;
    }
   }
</style>
