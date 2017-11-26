<template>
  <div id="explain-wrapper">
    <!-- 背景 -->
    <img class="wxplain-wrapper-bg" src="./../../assets/images/explain/bg.png" alt="">
    <!-- 龟仙人 -->
    <div class="explain-master">
      <div class="explain-master-wrapper">
        <!-- 龟仙人图片 -->
        <img class="explain-master-img" src="./../../assets/images/explain/master.png" alt="">
        <!-- 龟仙人名字 -->
        <h3 class="explain-master-name">龟仙人</h3>
        <!-- 按钮 -->
        <div class="explain-master-btn" @click="toDragonMap">
          <p class="explain-master-btn-words">去搜寻龙珠</p>
          <div class="explain-master-btn-triangle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created: function () {

  },
  methods: {
    // 页面跳转
    toDragonMap () {

    }
  }
}
</script>

<style lang="less" scoped>
#explain-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
.wxplain-wrapper-bg {
  width: 100%;
}
/**
龟仙人
*/ 
.explain-master {
  width: 6.4rem;
  height: 5.95rem;
  position: absolute;
  bottom: .5rem;
}
.explain-master-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.explain-master-img {
  width: 100%;
  height: 100%;
  position: absolute;
}
.explain-master-name {
  color: #fff;
  font-size: .36rem;
  font-family: "FZLTZCHK-GBK1-0", "Microsoft YaHei", Georgia, Serif;
  position: absolute;
  right: .6rem;
  top: 3rem;
}
/**
按钮
*/ 
.explain-master-btn {
  width: 3.3rem;
  height: .46rem;
  border: .04rem solid #ff9348;
  border-radius: .23rem;
  position: absolute;
  left: 50%;
  bottom: .2rem;
  margin-left: -1.65rem;
}
.explain-master-btn-words {
  color: #fff;
  font-family: "FZLTZCHK-GBK1-0", "Microsoft YaHei", Georgia, Serif;
  font-size: .24rem;
  display: inline-block;
  height: .46rem;
  line-height: .46rem;
  margin-left: 1rem;
  float: left;
}
.explain-master-btn-triangle {
  float: left;
  border-top:.12rem solid transparent;
  border-bottom: .12rem solid transparent;
  border-left: .18rem solid #ff9348;
  margin-top: .12rem;
  margin-left: .12rem;
}
</style>

