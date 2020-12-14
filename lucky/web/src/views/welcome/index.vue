<template>
  <div id="checkIn">
    <div class="wrapper">
      <h3>幸运抽奖</h3>
      <div class="button-wrapper">
        <van-button
          class="sign-button"
          type='info'
          size='small'
          @click="jumpCheckIn()">抽奖登记</van-button>
        <van-button class="sign-button" type='info' size='small'>查看我的抽奖码</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import 'vant/lib/index.css'

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
  },
  methods: {
    jumpCheckIn() {
      this.$router.push('/checkIn')
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  min-height: 100vh;
  width: 100%;
  padding-top: 4rem;
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
