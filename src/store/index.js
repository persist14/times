import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKENKEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(TOKENKEY)
    // user: JSON.parse(window.localStorage.getItem(TOKENKEY))
  },
  mutations: {
    setToken (state, data) {
      state.user = data

      // 为了保持持久化 需要将token保存在本地种
      // window.localStorage.setItem(TOKENKEY, JSON.stringify(state.user))
      setItem(TOKENKEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
