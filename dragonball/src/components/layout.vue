<template>
  <div id="layout">
    <router-view></router-view>
  </div>
</template>

<script>
import $store from './store/store.js';
import $axios from 'axios';
export default {
  data () {
    return {
      store: $store,
      title: ''
    }
  },
  created: function () {
    let _path = this.$route.path;
    let _this = this;
    if (_path.length === 1) {
      _this.$router.push('home');
    }
    $store.state.openid = _this.getQueryString('openid');
    let getUrl = 'answerRecord/' + _this.$store.state.splitKey + '/' + _this.$store.state.openid + '/';
    $axios.get(_this.$store.state.host + getUrl)
    .then(function (res) {
      console.log(res);
      // 判断星级
      if (res.data.count < 5) {
        _this.$store.state.starIndex = 1;
      } else if (res.data.count >= 5 && res.data.count < 10) {
        _this.$store.state.starIndex = 2;
      } else if (res.data.count >= 10 && res.data.count < 15) {
        _this.$store.state.starIndex = 3;
      } else {
        _this.$store.state.allFinish = true;
      }
      // 判断对题
      for (let i = 0; i < res.data.data.length; i++) {
        const node = res.data.data[i];
        if (parseInt(node.answerStatus) === 1) {
          $store.state.rightTime++;
        }
      }
      // 计算正确率
      if ($store.state.allFinish) {
        $store.state.accuracy = (($store.state.rightTime / 15) * 100).toFixed(0);
      }
      // 判断称号
      if ($store.state.accuracy === 100) {
        $store.state.title = '后厂村传奇';
      } else if ($store.state.accuracy < 100 && $store.state.accuracy >= 80) {
        $store.state.title = '西北旺精英';
      } else if ($store.state.accuracy < 80 && $store.state.accuracy >= 60) {
        $store.state.title = '中关村勇士';
      } else {
        $store.state.title = '传说中的猪队友';
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
}
</script>

<style lang="less" scoped>
  #layout {
    width: 100%;
    height: 100%;
  }
</style>
