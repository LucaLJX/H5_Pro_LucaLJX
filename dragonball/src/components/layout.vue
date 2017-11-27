<template>
  <div id="layout">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './store/store.js'
export default {
  data () {
    return {

    }
  },
  created: function () {
    let _path = this.$route.path;
    if (_path.length === 1) {
      this.$router.push('home');
    }
    console.log(store.state.count)
  }
}
</script>

<style lang="less" scoped>
  #layout {
    width: 100%;
    height: 100%;
  }
</style>
