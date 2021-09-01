<template>
  <div class="home-container" >
    <!-- 搜索区域 -->
     <van-nav-bar class="page-nav-bar" fixed  >
        <van-button  class="search-btn" to="/search"  slot="title" size="small"  icon="search" round type="info">搜索</van-button>
      </van-nav-bar>
      <!--导航栏区域 -->
      <!-- swipeable 开启滑动切换 -->
      <van-tabs v-model="active" class="channel-tabs" animated swipeable >
        <van-tab :title="item.name" v-for="item of userChannels" :key="item.id">
          <ArticalList :channel="item" />
        </van-tab>
        <!-- 站位符 让最后一个盒子显示完整 -->
        <div slot="nav-right" class="placeholder" ></div>
        <div slot="nav-right" class="hamburger-btn" @click="isChannelsEditShow = true">
          <i class="toutiao toutiao-gengduo" ></i>
        </div>
      </van-tabs>
      <!-- 频道编辑弹出层 -->
      <van-popup
        v-model="isChannelsEditShow"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <ChannelEidt :myChannels="userChannels" :active="active" @update-active="updateActive"></ChannelEidt>
      </van-popup>
  </div>

</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticalList from './components/ArticalList.vue'
import ChannelEidt from './components/Channles-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'homeIndex',
  components: {
    ArticalList,
    ChannelEidt
  },
  data () {
    return {
      active: 0,
      userChannels: [],
      isChannelsEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        let channels = []

        // 判断用户时候登陆 登陆获取用户的频道列表数据 未登录获取本地存储的数据 本地存储没数据到的情况下使用默认的频道列表数据
        if (this.user) {
          const { data } = await getUserChannels()
          // console.log(data)
          channels = data.data.channels
          // console.log(channels)
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannels()
            console.log(data)
            channels = data.data.channels
          }
        }
        this.userChannels = channels
      } catch (error) {
        console.log('加载用户频道列表失败')
      }
    },
    updateActive (index, isChannelsEditShow) {
      this.active = index
      this.isChannelsEditShow = isChannelsEditShow
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style  lang="less" scoped>
 .home-container {
   padding-top: 174px;
   padding-bottom: 100px;
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
     .van-icon {
       color: #fff;
       font-size: 32px;
     }
  }
  /deep/ .channel-tabs {
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      color: #777;
    }
    .van-tabs__wrap {
      height: 82px !important;
      position: fixed;
      top: 92px;
      left: 0;
       right: 0;
      z-index: 1;
      .van-tab--active {
        color: #333;
      }
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px;
      height: 6px;
      background-color: #3296fa;
    }
    .van-tabs__nav {
      padding-bottom: 0;
      padding-right:0 ;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        content: "";
        width: 1px;
        height: 100%;
        background: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
        position: absolute;
        left: 0;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;

    }
  }

 }
</style>
