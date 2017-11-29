<template>
  <div id="capsule-wrapper">
    <!-- 背景 -->
    <img class="capsule-wrapper-bg" src="./../../assets/images/capsule/bg.png" alt="">
    <!-- 标题 -->
    <img class="capsule-title-bg" src="./../../assets/images/capsule/word-bg-1.png" alt="">
    <p id="capsule-title-word-1" class="capsule-title-word">联想ThinkCloud</p>
    <p id="capsule-title-word-2" class="capsule-title-word">OpenStack企业版</p>
    <!-- 标题--球 -->
    <img v-if="$store.state.starIndex === 1" class="capsule-title-ball" src="./../../assets/images/capsule/ball-1-a.png" alt="">
    <img v-if="$store.state.starIndex === 2" class="capsule-title-ball" src="./../../assets/images/capsule/ball-1-a.png" alt="">
    <img v-if="$store.state.starIndex === 3" class="capsule-title-ball" src="./../../assets/images/capsule/ball-1-a.png" alt="">
    <!-- content -->
    <div class="capsule-content">
      <div class="capsule-content-wrapper">
        <img class="capsule-content-img" src="./../../assets/images/capsule/content-bg.png" alt="">
        <div class="capsule-content-words">
          OpenStack云平台
          云计算技术经过多年的发展和进化，OpenStack架构逐步
          占据了绝对主流的地位。企业级的OpenStack解决方案是
          指在社区版本之上进行了企业级开发，专门用于私有云和
          混合云的应用场景，提供计算虚拟化SDC、存储虚拟化SDS
          网络虚拟化SDN、云运维和云安全等功能。
        </div>
      </div>
    </div>
    <!-- 标题-2 -->
    <img class="capsule-title-bg-2" src="./../../assets/images/capsule/word-bg-2.png" alt="">
    <p class="capsule-title-2">获得装备</p>
    <!-- 胶囊 -->
    <img class="capsule-capsule-img" src="./../../assets/images/capsule/capsule.png" alt="">
    <p id="capsule-name-1" class="capsule-name">万能胶囊一号</p>
    <p id="capsule-name-2" class="capsule-name">万能胶囊二号</p>
    <!-- 说明 -->
    <div class="capsule-desc">
      <p class="capsule-desc-content">答题过程中，你可以使用“万能胶囊一号”帮你发现一个正确答案，也可以使用“万能胶囊二号”帮你排除一个错误答案，各有一次机会，要珍惜哦</p>
    </div>
    <!-- 按钮 -->
    <img v-if="$store.state.starIndex === 1" class="capsule-btn" src="./../../assets/images/capsule/btn-1.png" alt="" @click="toQuestion">
    <img v-if="$store.state.starIndex === 2" class="capsule-btn" src="./../../assets/images/capsule/btn-2.png" alt="" @click="toQuestion">
    <img v-if="$store.state.starIndex === 3" class="capsule-btn" src="./../../assets/images/capsule/btn-3.png" alt="" @click="toQuestion">
  </div>
</template>

<script>
import $store from './../store/store.js';
export default {
  data () {
    return {
      store: $store
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  methods: {
    toQuestion () {
      let _this = this;
      _this.$router.push('question');
    }
  }
}
</script>

<style lang="less" scoped>
#capsule-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
.capsule-wrapper-bg {
  width: 100%;
}
/**
标题部分框、球、文字
*/
.capsule-title-bg {
  width: 6.4rem;
  height: 1.04rem;
  position: absolute;
  top: .37rem;
  z-index: 10;
}
.capsule-title-word {
  position: absolute;
  color: #ffcc5e;
  font-size: .38rem;
  z-index: 50;
}
#capsule-title-word-1 {
  top: .43rem;
  left: 2.1rem;
}
#capsule-title-word-2 {
  top: .87rem;
  left: 2.1rem;
}
.capsule-title-ball {
  height: 1.55rem;
  position: absolute;
  top: .07rem;
  left: .3rem;
  z-index: 50;
}
/**
content
*/
.capsule-content {
  width: 6.4rem;
  height: 2.72rem;
  position: absolute;
  top: 2.1rem;
}
.capsule-content-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.capsule-content-words {
  width: 5rem;
  font-size: .2rem;
  color: #fff;
  position: absolute;
  left: 50%;
  margin-left: -2.3rem;
  top: .3rem;
  line-height: .3rem;
}
.capsule-content-img {
  width: 100%;
  height: 100%;
}
/**
标题2
*/
.capsule-title-bg-2 {
  width: 6.4rem;
  height: .6rem;
  position: absolute;
  bottom: 4.5rem;
  z-index: 10;
}
.capsule-title-2 {
  position: absolute;
  color: #ffcc5e;
  font-size: .3rem;
  z-index: 50;
  bottom: 4.63rem;
  left: 2.46rem;
  letter-spacing: .1rem;
}
/**
胶囊
*/
.capsule-capsule-img {
  width: 6.4rem;
  height: 3.34rem;
  position: absolute;
  bottom: 1.5rem;
  z-index: 30;
}
.capsule-name {
  font-size: .24rem;
  z-index: 40;
  position: absolute;
  color: #ffcc5e;
  bottom: 2.4rem;
}
#capsule-name-1 {
  left: .9rem;
}
#capsule-name-2 {
  left: 4rem;
}
/**
说明
*/
.capsule-desc {
  width: 6rem;
  height: .5rem;
  position: absolute;
  bottom: 1.7rem;
  left: .2rem;
}
.capsule-desc-content {
  color: #ffcc5e;
  font-size: .18rem;
  line-height: .24rem;
  text-align: center;
}
/**
按钮
*/
.capsule-btn {
  width: 6.4rem;
  height: .86rem;
  position: absolute;
  bottom: .5rem;
}
</style>
