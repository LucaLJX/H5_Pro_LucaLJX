<template>
  <div id="capsule-wrapper">
    <!-- 背景 -->
    <img class="capsule-wrapper-bg" src="./../../assets/images/capsule/bg.png" alt="">
    <!-- 标题 -->
    <img class="capsule-title-bg" src="./../../assets/images/capsule/word-bg-1.png" alt="">
    <p id="capsule-title-word-1" class="capsule-title-word">联想ThinkCloud</p>
    <p id="capsule-title-word-2" class="capsule-title-word" v-if="$store.state.starIndex === 1">OpenStack企业版</p>
    <p id="capsule-title-word-2" class="capsule-title-word" v-if="$store.state.starIndex === 2">Manager云管理平台</p>
    <p id="capsule-title-word-2" class="capsule-title-word" v-if="$store.state.starIndex === 3">国产虚拟化</p>
    <!-- 标题--球 -->
    <img v-if="$store.state.starIndex === 1" class="capsule-title-ball" src="./../../assets/images/capsule/ball-1-a.png" alt="">
    <img v-if="$store.state.starIndex === 2" class="capsule-title-ball" src="./../../assets/images/capsule/ball-2-a.png" alt="">
    <img v-if="$store.state.starIndex === 3" class="capsule-title-ball" src="./../../assets/images/capsule/ball-3-a.png" alt="">
    <!-- content -->
    <div class="capsule-content">
      <div class="capsule-content-wrapper">
        <img class="capsule-content-img" src="./../../assets/images/capsule/content-bg.png" alt="">
        <div class="capsule-content-words" v-if="$store.state.starIndex === 1">
          <p class="capsule-content-p">OpenStack云平台</p>
          <p class="capsule-content-p">云计算技术经过多年的发展和进化，OpenStack架构逐步占据了绝对主流的地位。企业级的OpenStack解决方案是指在社区版本之上进行了企业级开发，专门用于私有云和混合云的应用场景，提供计算虚拟化SDC、存储虚拟化SDS、网络虚拟化SDN、云运维和云安全等功能，对各种X86服务器、分布式存储和商业存储保持良好的兼容性，为客户统一管理数据中心所有硬件和软件资源，根据工作负载和业务要求以动态和自动化的方式配置和管理IT资源，提供多级的高可靠、高可用和快速弹性扩展能力。</p>
        </div>
        <!-- <div class="capsule-content-hide"></div> -->
        <div class="capsule-content-words" v-if="$store.state.starIndex === 2">
          <p class="capsule-content-p">Manager云管理平台</p>
          <p class="capsule-content-p">随着企业云平台建设的起步及不断深入，提升管理能力、简化运维工作的需求日益迫切。云管理平台成为企业是否真正上云、高效上云的重要标志。云管理平台是面向云计算领域企业级的通用型管理工具，基于云环境实现虚拟机和应用的快速部署及资源的弹性供应，在云数据中心构建和运维过程中提供全方位、多层次的监控管理和集中管理以及自动化动态调度能力。旨在为企业云数据中心提供云平台的快捷部署、异构虚拟化环境的统一管理、资源弹性伸缩和按需供应等云计算关键功能的同时，轻松实现云数据中心多维度、立体式监管，提升动态交付和自动化运维能力。如果用一句话概述云平台和云管平台的关系，那么就是：云平台是建设好云资源，如何管好、用好、控好云资源，就需要云管理平台了。</p>
        </div>
        <div class="capsule-content-words" v-if="$store.state.starIndex === 3">
          <p class="capsule-content-p">国产虚拟化</p>
          <p class="capsule-content-p">基于KVM和XEN架构的企业级虚拟化解决方案，通过对物理资源、虚拟资源、业务资源统一管理，为企业级客户的应用系统提供高性能、高安全、高可靠按需服务的的虚拟化资源池，减少计划内/外宕机时间，提高资源利用率，降低采购和运营成本，向上配合云平台使业务平滑上云。</p>
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
.capsule-content-hide {
  position: absolute;
  top: 2.2rem;
  left: 50%;
  width: 5rem;
  height: .2rem;
  margin-left: -2.4rem;
  background-color: black;
  opacity: .6;
  z-index: 9999;
}
.capsule-content-words {
  width: 5rem;
  font-size: .2rem;
  color: #fff;
  position: absolute;
  left: 50%;
  margin-left: -2.4rem;
  height: 1.8rem;
  top: .2rem;
  line-height: .3rem;
  overflow-y: scroll;
  z-index: 7777;
}
.capsule-content-p {
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
