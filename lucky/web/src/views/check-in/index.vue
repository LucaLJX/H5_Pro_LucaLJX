<template>
  <div id="checkIn">
    <van-button type='info' size='normal'>默认按钮</van-button>
    <van-button type='info' size='normal'>默认按钮</van-button>
    <van-button type='info' size='normal'>默认按钮</van-button>
    <van-cell-group>
      <van-field v-model="value" label="文本" placeholder="请输入用户名" />
    </van-cell-group>
  </div>
</template>

<script>
// import 'vant/lib/index.css'

export default {
  data() {
    return {
      test: '123',
    }
  },
  mounted() {
    console.log('12')
  },
}
</script>

<style lang="less" scoped>
</style>
