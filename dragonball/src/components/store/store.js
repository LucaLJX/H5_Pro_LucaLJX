import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    // 判断当前是几星
    starIndex: 1,
    // 总答题数
    totalTime: 0,
    // 正确次数
    rightTime: 0,
    // 本次答题正确次数
    thisRightTime: 0,
    openid: '',
    splitKey: '17d7ece13c634486a35f9600f18f6efd',
    host: 'http://question.vigoo.cn/',
    allFinish: false,
    accuracy: null,
    title: '',
    // 预加载
    isLoading: false
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addStar (state) {
      state.starIndex ++
    }
  }
})


