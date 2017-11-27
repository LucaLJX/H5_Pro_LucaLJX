<template>
  <div id="map-wrapper">
    <!-- 背景 -->
    <img class="map-wrapper-bg" src="./../../assets/images/map/bg.png" alt="">
    <!-- 眼睛 -->
    <img id="map-eye" src="./../../assets/images/map/eye.png" alt="">
    <!-- 七个球 -->
    <!-- 一星 -->
    <img id="map-ball-1-1" class="map-ball map-ball-1" src="./../../assets/images/map/ball-1-a.png" alt="">
    <img id="map-ball-1-2" class="map-ball map-ball-1" src="./../../assets/images/map/ball-1-b.png" alt="">
    <!-- 二星 -->
    <img id="map-ball-2-1" class="map-ball map-ball-2" src="./../../assets/images/map/ball-2-a.png" alt="">
    <img id="map-ball-2-2" class="map-ball map-ball-2" src="./../../assets/images/map/ball-2-b.png" alt="">
    <!-- 三星 -->
    <img id="map-ball-3-1" class="map-ball map-ball-3" src="./../../assets/images/map/ball-3-a.png" alt="">
    <img id="map-ball-3-2" class="map-ball map-ball-3" src="./../../assets/images/map/ball-3-b.png" alt="">
    <!-- 四星 -->
    <img id="map-ball-4-2" class="map-ball map-ball-4" src="./../../assets/images/map/ball-4-b.png" alt="">
    <!-- 五星 -->
    <img id="map-ball-5-2" class="map-ball map-ball-5" src="./../../assets/images/map/ball-5-b.png" alt="">
    <!-- 六星 -->
    <img id="map-ball-6-2" class="map-ball map-ball-6" src="./../../assets/images/map/ball-6-b.png" alt="">
    <!-- 七星 -->
    <img id="map-ball-7-2" class="map-ball map-ball-7" src="./../../assets/images/map/ball-7-b.png" alt="">
    <!-- search -->
    <img v-if="false" class="map-search" src="./../../assets/images/map/search.png" alt="">
    <!-- hand -->
    <img v-if="false" id="map-hand-1" class="map-hand" src="./../../assets/images/map/hand-1.png" alt="">
    <img v-if="false" id="map-hand-2" class="map-hand" src="./../../assets/images/map/hand-2.png" alt="">
    <!-- 一星提示语 -->
    <img v-if="false" class="map-words" src="./../../assets/images/map/words.png" alt="">
    <!-- 二星提示语 -->
    <!-- 龟仙人 -->
    <div class="map-master">
      <div class="map-master-wrapper">
        <!-- 龟仙人图片 -->
        <img class="map-master-img" src="./../../assets/images/map/master.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

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
}
/**
二星+提示语
*/ 
.map-master {
  width: 6.4rem;
  height: 5.95rem;
  position: absolute;
  bottom: .5rem;
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
</style>
