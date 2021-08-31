<template>
  <div class="channles-edit">
    <!-- 我的频道 -->
    <van-cell>
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain size="mini" class="btnStyle" round @click="isEdit = !isEdit" >{{isEdit? '完成':'编辑' }}</van-button>
    </van-cell>
    <!-- 我的频道内容 -->
    <van-grid :gutter="10" :border="false" class="my-grid">
      <van-grid-item  v-for="(item, index) in myChannels" :key="index"  class="grid-item" @click="onMyChannelsChange(item, index)"  >
          <van-icon slot="icon" name="clear" v-show="isEdit && !flxChannels.includes(item.id)" ></van-icon>
          <span slot="text" class="text" :class="{active: active === index}">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 编辑频道 -->
     <van-cell >
      <div slot="title" class="title-text">编辑频道</div>
    </van-cell>
    <!-- 编辑频道内容 -->
    <van-grid :gutter="10" :border="false" class="recommend-grid">
      <van-grid-item v-for="(item, index) in recommendChannels" :key="index" :text="item.name" icon="plus" class="grid-item" @click="onAddChannels(item)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsData, addChannels, deleteUserChannels } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEidt',
  data () {
    return {
      allChannels: [],
      isEdit: false,
      flxChannels: [0] // 控制那个频道不允许删除
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannelsData()
        this.allChannels = data.data.channels
      } catch (err) {
        console.log('获取数据失败')
      }
    },
    // 添加频道 到我的频道里
    async onAddChannels (channels) {
      this.myChannels.push(channels)
      // 判断当前用户是否登录 登录存储在线上 未登录存储在本地
      if (this.user) {
        // 登录的情况下
        try {
          const result = await addChannels({
            id: channels.id,
            seq: this.myChannels.length // 序号 序号刚好等于添加完数据数组的长度
          })
          console.log(result)
        } catch (err) {
          this.$toast('保存失败，请稍后再试')
        }
      } else {
        // 未登录的情况下
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 获取当前点击的按钮获取数据 返回给父组件
    onMyChannelsChange (channels, index) {
      // 判断当前频道的状态是编辑还是正常显示
      if (this.isEdit) {
        // 判断当前点击的按钮是不是禁止删除的按钮 是的话 直接返回 不做操作
        if (this.flxChannels.includes(channels.id)) {
          return
        }
        // 判断当前删除的索引是否在当前点击元素之前
        // 在当前元素之前 让它的active索引 - 1
        // 由于这里传给父亲的事件和正常点击按钮事件一样，所以传回去后 要关闭弹框 这里传个true 在父元素接收 不让他关闭
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 处理持久化
        this.deleteChannels(channels)
      } else {
        this.$emit('update-active', index, false)
      }
    },
    // 删除频道列表
    async deleteChannels (channel) {
      if (this.user) {
        try {
          await deleteUserChannels(channel.id)
        } catch (err) {
          this.$toast('操作失败，请稍后再试')
        }
      } else {
        // 更新本地存储
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  },
  computed: {
    // 写在这里是由于添加的时候 会产生数据的变化 会重新计算 不用写删除的操作
    recommendChannels () {
      // filter 会自动创建一个数组并保存
      return this.allChannels.filter(channels => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channels.id
        })
      })
    },
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped >
  .channles-edit {
    padding: 85px 0;
  }
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .btnStyle {
   width: 104px;
   height: 48px;
   font-size: 26px;
   color: #f85959;
   border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text, .text {
        white-space: nowrap;
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: #f00
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
        }
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
          position: absolute;
          right: 3px;
          top: -10px;
          font-size: 36px;
          color: #cacaca;
          z-index: 100;
      }
      .van-grid-item__icon-wrapper{
        position: unset;
      }
    }
  }
</style>
