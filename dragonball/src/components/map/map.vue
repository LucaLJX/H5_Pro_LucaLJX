<template>
  <div id="map-wrapper">
    <!-- 背景 -->
    <img class="map-wrapper-bg" src="./../../assets/images/map/bg.png" alt="">
    <!-- 眼睛 -->
    <img id="map-eye" src="./../../assets/images/map/eye.png" alt="">
    <!-- 七个球 -->
    <!-- 一星 -->
    <img id="map-ball-1-1" class="map-ball map-ball-1" src="./../../assets/images/map/ball-1-a.png" alt="" @click="toCapsule(1)">
    <!-- 二星 -->
    <img v-if="store.state.starIndex >= 2" id="map-ball-2-1" class="map-ball map-ball-2" src="./../../assets/images/map/ball-2-a.png" alt="" @click="toCapsule(2)">
    <img v-if="store.state.starIndex < 2" id="map-ball-2-2" class="map-ball map-ball-2" src="./../../assets/images/map/ball-2-b.png" alt="" @click="toCapsule(2)">
    <!-- 三星 -->
    <img v-if="store.state.starIndex >= 3" id="map-ball-3-1" class="map-ball map-ball-3" src="./../../assets/images/map/ball-3-a.png" alt="" @click="toCapsule(3)">
    <img v-if="store.state.starIndex < 3" id="map-ball-3-2" class="map-ball map-ball-3" src="./../../assets/images/map/ball-3-b.png" alt="" @click="toCapsule(3)">
    <!-- 四星 -->
    <img id="map-ball-4-2" class="map-ball map-ball-4" src="./../../assets/images/map/ball-4-b.png" alt="" @click="toCapsule(4)">
    <!-- 五星 -->
    <img id="map-ball-5-2" class="map-ball map-ball-5" src="./../../assets/images/map/ball-5-b.png" alt="" @click="toCapsule(5)">
    <!-- 六星 -->
    <img id="map-ball-6-2" class="map-ball map-ball-6" src="./../../assets/images/map/ball-6-b.png" alt="" @click="toCapsule(6)">
    <!-- 七星 -->
    <img id="map-ball-7-2" class="map-ball map-ball-7" src="./../../assets/images/map/ball-7-b.png" alt="" @click="toCapsule(7)">
    <!-- search -->
    <img v-if="store.state.starIndex === 1" class="map-search" src="./../../assets/images/map/search.png" alt="" @touchstart="searchTouchStart" @touchmove="searchTouchMove" @touchend="searchTouchEnd">
    <!-- hand -->
    <img v-if="store.state.starIndex === 1 && showHand" id="map-hand-1" class="map-hand" src="./../../assets/images/map/hand-1.png" alt="">
    <img v-if="store.state.starIndex === 1 && showHand" id="map-hand-2" class="map-hand" src="./../../assets/images/map/hand-2.png" alt="">
    <!-- 一星提示语 -->
    <img v-if="store.state.starIndex === 1 && showWords" class="map-words" src="./../../assets/images/map/words.png" alt="">
    <!-- 二星提示语 -->
    <!-- 龟仙人 -->
    <div v-if="store.state.starIndex > 1" class="map-master">
      <div class="map-master-wrapper">
        <!-- 龟仙人图片 -->
        <img class="map-master-img" src="./../../assets/images/map/master.png" alt="">
        <!-- 文字 -->
        <div class="map-master-words-wrapper">
          <p class="map-master-words-1" v-if="$store.state.starIndex === 2">
            年轻人，你已经闯过第一关了，但是不要骄傲，你只能算是勉强入门了，想成为一个白骨精，路还远着呢，下面试试第二关。
          </p>
          <p class="map-master-words-1" v-if="$store.state.starIndex === 3">
           凡人，我看到了你的天赋，但是只有天赋是不够的，还需要进行不断的练习和提升，你准备好进入第三关了吗？
          </p>
          <p class="map-master-words-2">
            <span class="map-master-words-3">P.</span>s&nbsp;点击上方浮动的龙珠，继续寻找下一颗
          </p>
        </div>
      </div>
    </div>
    <!-- 弹出框--报错--需要选择选项才可以下一题 -->
    <div class="question-modal" v-if="wrongModal">
      <div class="question-modal-container">
        <div class="question-modal-border">
          <div class="question-modal-wrapper">
            <div class="question-modal-content-2">
              <p v-if="tooSmall === true" class="question-modal-content-2-word">您已探索过{{ clickIndexStr }}星珠，请探索{{ starNextStr }}星珠。</p>
              <p v-if="tooBig === true" class="question-modal-content-2-word">请先探索{{ starNextStr }}星珠。</p>
            </div>
            <div class="question-modal-bottom">
              <div class="question-modal-btn-2" @click="closeWrongModal()">
                <p class="question-modal-btn-word">确定</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $store from './../store/store.js';
import $ from 'jquery';
export default {
  data () {
    return {
      store: $store,
      starStr: '',
      starNextStr: '',
      wrongModal: false,
      tooBig: false,
      tooSmall: false,
      clickIndexStr: '',
      // 控制展示一星情况下的手还有文字
      showHand: true,
      showWords: true,
      // 雷达初始位置
      startY: null,
      // 雷达移动距离
      moveY: null,
      // 雷达移动最大距离
      moveMax: null
    }
  },
  created: function () {
    let _this = this;
    setTimeout(function () {
      $store.state.isLoading = false;
    }, 1000);
    switch (_this.store.state.starIndex) {
      case 1:
        _this.starStr = '零';
        _this.starNextStr = '一';
        break;
      case 2:
        _this.starStr = '一';
        _this.starNextStr = '二';
        break;
      case 3:
        _this.starStr = '二';
        _this.starNextStr = '三';
        break;
    }
  },
  methods: {
    // 触摸雷达
    searchTouchStart (e) {
      let _this = this;
      _this.startY = $('.map-search').offset().top;
      _this.moveMax = _this.startY / 2;
      _this.showHand = false;
      _this.showWords = false;
    },
    // 滑动雷达
    searchTouchMove (e) {
      let _this = this;
      _this.moveY = e.targetTouches[0].pageY;
      let height = $('.map-search').height();
      let endY = _this.moveY - (height / 2);
      if (endY <= _this.startY && endY >= (_this.startY / 2)) {
        $('.map-search').css('top', _this.moveY - (height / 2) + 'px');
      }
    },
    // 移除滑动
    searchTouchEnd () {
      let _this = this;
      let searchDom = $('.map-search');
      searchDom.css('z-index', '99999');
      let domWidth = 2.6;
      let domHeight = 2.6;
      let domLeft = -1.3;
      let domOpacity = 1;
      let domTop = searchDom.offset().top;
      function change () {
        domWidth += 0.06;
        domHeight += 0.06;
        domLeft -= 0.03;
        domTop -= 1;
        domOpacity -= 0.005;
        searchDom.css('width', domWidth + 'rem');
        searchDom.css('height', domHeight + 'rem');
        searchDom.css('margin-left', domLeft + 'rem');
        searchDom.css('top', domTop + 'px');
        searchDom.css('opacity', domOpacity);
      }
      let timeEvent = setInterval(change, 10);
      setTimeout(function () {
        clearInterval(timeEvent);
        _this.$router.push('capsule');
      }, 1000);
    },
    // 点击星星
    toCapsule (index) {
      let _this = this;
      let _index = index;
      switch (_index) {
        case 1:
          _this.clickIndexStr = '一';
          break;
        case 2:
          _this.clickIndexStr = '二';
          break;
        case 3:
          _this.clickIndexStr = '三';
          break;
        case 4:
          _this.clickIndexStr = '四';
          break;
        case 5:
          _this.clickIndexStr = '五';
          break;
        case 6:
          _this.clickIndexStr = '六';
          break;
        case 7:
          _this.clickIndexStr = '七';
      }
      if (_index === _this.store.state.starIndex) {
        if (_index > 3) {
          alert('您已全部答完题')
          return;
        }
        _this.$router.push('capsule');
      } else if (_index < _this.store.state.starIndex) {
        _this.tooSmall = true;
        _this.wrongModal = true;
      } else if (_index > _this.store.state.starIndex) {
        _this.tooBig = true;
        _this.wrongModal = true;
      }
    },
    closeWrongModal () {
      let _this = this;
      _this.wrongModal = false;
      _this.tooBig = false;
      _this.tooSmall = false;
    }
  }
}
</script>

<style lang="less" scoped>
#map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
.map-wrapper-bg {
  width: 100%;
}
/**
eye
*/
#map-eye {
  width: 6.4rem;
  position: absolute;
  top: 2.15rem;
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
.map-ball {
  position: absolute;
  z-index: 1000;
}
// 一星
.map-ball-1 {
  width: 1.36rem;
  height: 1.36rem;;
  top: 3rem;
  left: 2.6rem;
}
// 二星
.map-ball-2 {
  width: 1.37rem;
  height: 1.35rem;;
  top: 4rem;
  left: .6rem;
}
// 三星
.map-ball-3 {
  width: 1.37rem;
  height: 1.36rem;;
  top: 1rem;
  left: 1.4rem;
}
// 四星
.map-ball-4 {
  width: 1.36rem;
  height: 1.32rem;;
  top: 1.3rem;
  left: 4.4rem;
}
// 五星
.map-ball-5 {
  width: 1.58rem;
  height: 1.6rem;;
  top: 3.3rem;
  left: 4.8rem;
}
// 六星
.map-ball-6 {
  width: 1.37rem;
  height: 1.35rem;;
  top: 4.5rem;
  left: 3.5rem;
}
// 七星
.map-ball-7 {
  width: 1.37rem;
  height: 1.36rem;;
  top: 2.5rem;
  left: .2rem;
}
/**
search
*/ 
.map-search {
  position: absolute;
  width: 2.6rem;
  height: 2.6rem;
  bottom: 1rem;
  left: 50%;
  margin-left: -1.3rem;
  z-index: 9999;
}
/**
hand
*/ 
.map-hand {
  width: 1.58rem;
  height: 2.18rem;
  position: absolute;
  bottom: 0;
  left: 1.5rem;
  z-index: 10000;
}
@keyframes hand1Blink {
  0% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  20% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  40% {
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
  }
  60% {
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
  }
  80% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  100% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
}
@-webkit-keyframes hand1Blink {
  0% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  20% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  40% {
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
  }
  60% {
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
  }
  80% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  100% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
}
@keyframes hand2Blink {
  0% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  20% {
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
  }
  40% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  60% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  80% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  100% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
}
@-webkit-keyframes hand2Blink {
  0% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  20% {
    filter: alpha(opacity=100); /* IE */
    -moz-opacity: 1; /* 老版Mozilla */
    -khtml-opacity: 1; /* 老版Safari */
    opacity: 1; /* 支持opacity的浏览器*/
  }
  40% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  60% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  80% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  100% {
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
}
#map-hand-1 {
  animation: hand1Blink 2s infinite linear;
  -webkit-animation: hand1Blink 2s infinite linear;
}
#map-hand-2 {
  animation: eyeBlink 2s infinite linear;
  -webkit-animation: hand2Blink 2s infinite linear;
}
/**
一星提示语
*/ 
.map-words {
  width: 2.74rem;
  height: .96rem;
  right: .5rem;
  bottom: 3rem;
  position: absolute;
  z-index: 8888;
}
/**
二星+提示语
*/ 
.map-master {
  width: 6.4rem;
  height: 5.95rem;
  position: absolute;
  bottom: .5rem;
  z-index: 500;
}
.map-master-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.map-master-img {
  width: 100%;
  height: 100%;
  position: absolute;
}
.map-master-words-wrapper {
  width: 5rem;
  position: absolute;
  top: 4.1rem;
  left: 50%;
  margin-left: -2.5rem;
  color: #fff;
  font-family: "FZLTZCHK-GBK1-0", "Microsoft YaHei", Georgia, Serif;
}
.map-master-words-1 {
  font-size: .25rem;
  line-height: .36rem;
}
.map-master-words-2 {
  font-size: .25rem;
  line-height: .4rem;
  color: #ffb932;
}
.map-master-words-3 {
  font-size: .3rem;
  color: #ffb932;
}
/**
Modal样式
*/
.question-modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0rem;
  z-index: 8888;
}
.question-modal-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.question-modal-border {
  width: 5.6rem;
  min-height: 2.5rem;
  border: .02rem solid #fff;
  position: absolute;
  left: 50%;
  margin-left: -2.8rem;
  top: 3rem;
  background-color: rgba(0, 0, 0, .9);
  border-radius: .2rem;
}
.question-modal-wrapper {
  width: 100%;
  min-height: 2.5rem;
  position: relative;
}
.question-modal-content {
  padding-bottom: .65rem;
}
.question-modal-content-img {
  width: .8rem;
  height: .8rem;
  margin-left: 2.4rem;
  margin-top: .3rem;
  margin-bottom: .2rem;
}
.question-modal-content-word {
  text-align: center;
  color: #fff;
  font-size: .26rem;
}
.question-modal-bottom {
  z-index: 9999;
  height: .65rem;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.question-modal-btn {
  width: 1.7rem;
  height: .48rem;
  border: .02rem solid #ff9348;
  border-radius: .24rem;
  float: left;
  margin-left: .68rem;
  
}
.question-modal-btn-word {
  text-align: center;
  line-height: .48rem;
  height: .48rem;
  color: #fff;
  font-size: .26rem;
}
.question-modal-content-2 {
  width: 100%;
  position: absolute;
  top: .6rem;
  text-align: center;
  color: #fff;
  font-size: .26rem;
}
.question-modal-btn-2 {
  width: 1.7rem;
  height: .48rem;
  border: .02rem solid #ff9348;
  border-radius: .24rem;
  float: left;
  margin-left: 1.8rem;
}
</style>
