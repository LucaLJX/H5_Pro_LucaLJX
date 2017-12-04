<template>
  <div id="layout">
    <router-view></router-view>
    <div class="layout-loading" v-if="$store.state.isLoading">
      <div class="layout-loading-wrapper">
        <div class="layout-loading-div">
          <div class="spinner">
            <div class="spinner-container container1">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
              <div class="circle4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      if (_path.length === 1) {
        _this.$router.push({path: 'home', query: { title: _this.$store.state.title }});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    $store.state.isLoading = true;
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
    position: relative;
    overflow: hidden;
  }
  .layout-loading {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999999;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .8)
  }
  .layout-loading-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .layout-loading-div {
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    left: 50%;
    margin-left: -.8rem;
    top: 50%;
    margin-top: -.8rem;
  }
  // 
  .spinner {
    width: 100%;
    height: 100%;
    position: relative;
  }
 
  .container1 > div, .container2 > div, .container3 > div {
    width: .3rem;
    height: .3rem;
    background-color: #ff9348;
  
    border-radius: 100%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
 
  .spinner .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .container2 {
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }
  
  .container3 {
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
  }
  
  .circle1 { top: 0; left: 0; }
  .circle2 { top: 0; right: 0; }
  .circle3 { right: 0; bottom: 0; }
  .circle4 { left: 0; bottom: 0; }
  
  .container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  
  .container3 .circle1 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  
  .container1 .circle2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  
  .container2 .circle2 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  
  .container3 .circle2 {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  
  .container1 .circle3 {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  
  .container2 .circle3 {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  
  .container3 .circle3 {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  
  .container1 .circle4 {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }
  
  .container2 .circle4 {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  
  .container3 .circle4 {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }
  
  @-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }
  
  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 40% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>
