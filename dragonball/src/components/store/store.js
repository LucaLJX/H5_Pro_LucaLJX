import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    // 判断当前是几星
    starIndex: 2,
    // 总答题数
    totalTime: 0,
    // 正确次数
    rightTime: 0
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


