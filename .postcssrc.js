module.exports = {
  plugins: {
    // 这里的 autoprefixer 已经默认在vuecli中默认设置过了 所以这里不用设置 这个属性
    // 设置了会起冲突 终端会报警告
    /* 'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, */
    'postcss-pxtorem': {
      // 这里设置的是 rem适配的每个单位宽度  rem默认将页面分为十个单位
      // 所以rootValue设置应该是设计稿宽度的十分之一
      // vant的设计稿宽度 默认是按照375进行设置
      // 我们自己的设计稿不可能都和vant中的设计稿一样 所以这里需要动态解决
      // rootValue 有两种类型 number和Function  动态解决方式 使用function
      // rootValue: 37.5,
      rootValue ({ file }) {
        // console.log(file);
        // 判定当前参数返回的字符串中是否含有vant 有的话按vant的设计稿的宽度 没有的话按照自己的设计稿宽度
        return file.indexOf('vant') === -1 ? 75 : 37.5
      },

      // 这里设置的是 那些属性是需要转换成rem的单位 默认 全部
      propList: ['*']
    }
  }
}
