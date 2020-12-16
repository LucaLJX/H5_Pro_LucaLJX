<template>
  <div id="checkIn">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      style="height: 100vh; width: 100%;"
    >
    </vue-particles>
    <div class="wrapper">
      <h3>幸运抽奖</h3>
      <div class="button-wrapper">
        <van-button
          class="sign-button"
          type='info'
          size='small'
          @click="jumpCheckIn()">抽奖登记</van-button>
        <van-button
          class="sign-button"
          type='info'
          size='small'
          @click="jumpCheckCode()">查看我的抽奖码</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import 'vant/lib/index.css'
import { getHost } from '../../utils'

export default {
  data() {
    return {
      test: '123',
      name: '',
      phone: '',
    }
  },
  mounted() {
    console.log('12')
    getHost()
  },
  methods: {
    jumpCheckIn() {
      this.$router.push('/checkIn')
    },
    jumpCheckCode() {
      this.$router.push('/checkCode')
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
  width: 100%;
  padding-top: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  h3 {
    height: 3rem;
    text-align: center;
  }
}
.button-wrapper {
  width: auto;

  .sign-button {
    width: 50%;
    display: block;
    margin: 1rem auto;
  }
}
</style>
