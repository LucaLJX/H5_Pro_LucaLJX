<template>
  <div id="home-wrapper">
    <!-- 背景 -->
    <img class="home-wrapper-bg" src="./../../assets/images/home/bg.png" alt="">
    <!-- end -->
    <div v-if="$store.state.allFinish" class="home-end">
      <div class="home-end-wrapper">
        <img class="home-end-img" src="./../../assets/images/home/end.png" alt="">
        <div class="home-end-words-wrapper">
          <p class="home-end-words">勇士，你已经收集到三颗龙珠了，</p>
          <p class="home-end-words">我期待着你改变人类的未来</p>
          <p class="home-end-words">你在搜集龙珠的路上共答对<span class="home-end-words-red">{{ $store.state.accuracy }}%</span>的问题</p>
          <p class="home-end-words">解锁<span class="home-end-words-red">{{ $store.state.title }}</span>称号</p>
          <!-- code -->
          <img class="home-end-words-code" src="./../../assets/images/home/qrcode.png" alt="">
        </div>
      </div>
    </div>
    <!-- 眼睛 -->
    <img id="home-eye" src="./../../assets/images/home/eye.png" alt="">
    <!-- 七个球 -->
    <img id="home-ball-1" class="home-ball" src="./../../assets/images/home/ball-1.png" alt="">
    <img id="home-ball-2" class="home-ball" src="./../../assets/images/home/ball-2.png" alt="">
    <img id="home-ball-3" class="home-ball" src="./../../assets/images/home/ball-3.png" alt="">
    <img id="home-ball-4" class="home-ball" src="./../../assets/images/home/ball-4.png" alt="">
    <img id="home-ball-5" class="home-ball" src="./../../assets/images/home/ball-5.png" alt="">
    <img id="home-ball-6" class="home-ball" src="./../../assets/images/home/ball-6.png" alt="">
    <img id="home-ball-7" class="home-ball" src="./../../assets/images/home/ball-7.png" alt="">

    <!-- 底部searcher -->
    <div class="home-searcher">
        <div class="home-searcher-wrapper">
            <img class="home-searcher-img" src="./../../assets/images/home/searcher.png" alt="" @touchstart="searchTouchStart" @touchmove="searchTouchMove"
            @touchend="searchTouchEnd">
            <p class="home-searcher-words">滑动开始冒险</p>
        </div>
    </div>
  </div>
</template>

<script>
import $store from './../store/store.js';
import $ from 'jquery';
export default {
  data() {
    return {
      store: $store,
      searchImgObj: {
        // 初始距离
        start: null,
        // 滑动距离
        moveX: null,
        // 最大滑动距离
        moveMax: null
      }
    };
  },
  created: function() {
    setTimeout(function () {
      $store.state.isLoading = false;
    }, 1000);
  },
  methods: {
    // 页面跳转
    searchTouchStart () {
      let _this = this;
      _this.start = $('.home-searcher-img').offset().left;
      // 容器的宽度
      let wrapperWidth = $('.home-searcher').width();
      // 拖拽图片宽度
      let imgWidth = $('.home-searcher-img').width();
      // 最大移动距离
      _this.moveMax = wrapperWidth - imgWidth;
    },
    searchTouchMove (e) {
      let _this = this;
      _this.moveX = e.targetTouches[0].pageX - _this.start;
      if (_this.moveX > 0 && _this.moveX < _this.moveMax) {
        $('.home-searcher-img').css('left', _this.moveX + 'px');
      }
    },
    searchTouchEnd () {
      let _this = this;
      let minMoveX = _this.moveMax / 2;
      if (_this.moveX > minMoveX) {
        _this.$router.push('/explain');
      } else {
        do {
          $('.home-searcher-img').css('left', _this.moveX + 'px');
          _this.moveX--
        } while (_this.moveX > 0);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#home-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
.home-wrapper-bg {
  width: 100%;
}
/**
eye
*/
#home-eye {
  width: 6.4rem;
  position: absolute;
  top: 3.95rem;
  animation: eyeBlink 1s infinite linear;
  -webkit-animation: eyeBlink 1s infinite linear;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
@keyframes eyeBlink {
  0% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  100% {
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
  }
}
@-webkit-keyframes eyeBlink {
  0% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  100% {
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
  }
}
/**
    七个球 
*/
.home-ball {
  position: absolute;
}
@keyframes animationUp2Down {
  0% {
    transform: translateY(-0.15rem);
    -ms-transform: translateY(-0.15rem); /* IE 9 */
    -moz-transform: translateY(-0.15rem); /* Firefox */
    -webkit-transform: translateY(-0.15rem); /* Safari 和 Chrome */
    -o-transform: translateY(-0.15rem); /* Opera */
  }
  100% {
    transform: translateY(0.15rem);
    -ms-transform: translateY(0.15rem); /* IE 9 */
    -moz-transform: translateY(0.15rem); /* Firefox */
    -webkit-transform: translateY(0.15rem); /* Safari 和 Chrome */
    -o-transform: translateY(0.15rem); /* Opera */
  }
}
@-webkit-keyframes animationUp2Down {
  0% {
    transform: translateY(-0.15rem);
    -ms-transform: translateY(-0.15rem); /* IE 9 */
    -moz-transform: translateY(-0.15rem); /* Firefox */
    -webkit-transform: translateY(-0.15rem); /* Safari 和 Chrome */
    -o-transform: translateY(-0.15rem); /* Opera */
  }
  100% {
    transform: translateY(0.15rem);
    -ms-transform: translateY(0.15rem); /* IE 9 */
    -moz-transform: translateY(0.15rem); /* Firefox */
    -webkit-transform: translateY(0.15rem); /* Safari 和 Chrome */
    -o-transform: translateY(0.15rem); /* Opera */
  }
}
@keyframes animationDown2Up {
  0% {
    transform: translateY(0.15rem);
    -ms-transform: translateY(0.15rem); /* IE 9 */
    -moz-transform: translateY(0.15rem); /* Firefox */
    -webkit-transform: translateY(0.15rem); /* Safari 和 Chrome */
    -o-transform: translateY(0.15rem); /* Opera */
  }
  100% {
    transform: translateY(-0.15rem);
    -ms-transform: translateY(-0.15rem); /* IE 9 */
    -moz-transform: translateY(-0.15rem); /* Firefox */
    -webkit-transform: translateY(-0.15rem); /* Safari 和 Chrome */
    -o-transform: translateY(-0.15rem); /* Opera */
  }
}
@-webkit-keyframes animationDown2Up {
  0% {
    transform: translateY(0.15rem);
    -ms-transform: translateY(0.15rem); /* IE 9 */
    -moz-transform: translateY(0.15rem); /* Firefox */
    -webkit-transform: translateY(0.15rem); /* Safari 和 Chrome */
    -o-transform: translateY(0.15rem); /* Opera */
  }
  100% {
    transform: translateY(-0.15rem);
    -ms-transform: translateY(-0.15rem); /* IE 9 */
    -moz-transform: translateY(-0.15rem); /* Firefox */
    -webkit-transform: translateY(-0.15rem); /* Safari 和 Chrome */
    -o-transform: translateY(-0.15rem); /* Opera */
  }
}
#home-ball-1 {
  width: 1.8rem;
  height: 1.8rem;
  top: 6.2rem;
  right: 0.9rem;
  animation: animationUp2Down 1s infinite linear;
  -webkit-animation: animationUp2Down 1s infinite linear;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
#home-ball-2 {
  width: 1.18rem;
  height: 1.2rem;
  top: 3.4rem;
  right: 0rem;
  animation: animationDown2Up 1s infinite linear;
  -webkit-animation: animationDown2Up 1s infinite linear;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
#home-ball-3 {
  width: 1.5rem;
  height: 1.5rem;
  top: 5.9rem;
  left: 0;
  animation: animationUp2Down 1s infinite linear;
  -webkit-animation: animationUp2Down 1s infinite linear;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
#home-ball-4 {
  width: 1.2rem;
  height: 1.2rem;
  top: 4.53rem;
  left: 0.85rem;
  animation: animationDown2Up 1s infinite linear;
  -webkit-animation: animationDown2Up 1s infinite linear;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
#home-ball-5 {
  width: 1.19rem;
  height: 1.77rem;
  top: 4.5rem;
  right: 0rem;
  animation: animationUp2Down 1s infinite linear;
  -webkit-animation: animationUp2Down 1s infinite linear;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
#home-ball-6 {
  width: 1.2rem;
  height: 1.2rem;
  top: 6.5rem;
  left: 1.76rem;
  animation: animationDown2Up 1s infinite linear;
  -webkit-animation: animationDown2Up 1s infinite linear;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}
#home-ball-7 {
  width: 1.5rem;
  height: 1.5rem;
  top: 2.6rem;
  left: 0rem;
  animation: animationUp2Down 1s infinite linear;
  -webkit-animation: animationUp2Down 1s infinite linear;
  animation-direction: alternate;
  -webkit-animation-direction: alternate;
}

/**
    底部searcher
*/
.home-searcher {
  // 颜色最深处#2d2d2d，rgba(45,45,45)
  // 颜色最浅处#555555,rgba(85,85,85)
  width: 4.88rem;
  height: 1.22rem;
  background-color: rgba(20, 20, 20, 0.7);
  position: absolute;
  bottom: 0.3rem;
  left: 50%;
  margin-left: -2.44rem;
  border-radius: 0.61rem;
  z-index: 1000;
}
.home-searcher-wrapper {
  width: 4.88rem;
  height: 1.22rem;
  position: relative;
}
.home-searcher-img {
  width: 1.22rem;
  position: absolute;
  top: -0.16rem;
}
.home-searcher-words {
  display: block;
  height: 1.22rem;
  line-height: 1.22rem;
  font-size: 0.45rem;
  font-family: "FZLTZCHK-GBK1-0", "Microsoft YaHei", Georgia, Serif;
  color: #ffe020;
  letter-spacing: 0.05rem;
  text-align: right;
  padding-right: 0.61rem;
}
/**
end
*/
.home-end {
  width: 6.4rem;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  position: absolute;
  top: 0;
  z-index: 99999;
}
.home-end-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.home-end-img {
  width: 100%;
}
.home-end-words-wrapper {
  width: 4rem;
  position: absolute;
  top: 2.3rem;
  left: 50%;
  margin-left: -2rem;
}
.home-end-words {
  text-align: center;
  font-size: .26rem;
  line-height: .4rem;
  color: #4a4a4a;
  font-weight: bold;
}
.home-end-words-red {
  color: #e33b00;
}
.home-end-words-code {
  width: 3.08rem;
  height: 1.53rem;
  margin-left: .46rem;
}
</style>
