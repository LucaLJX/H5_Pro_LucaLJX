<template>
  <div id="share-wrapper">
    <!-- 背景 -->
    <img class="share-wrapper-bg" src="./../../assets/images/share/bg.png" alt="">
    <div class="share-wrapper-container">
      <!-- 第一句话 -->
      <p class="share-line-1">
        {{ strLine1 }}
      </p>
      <!-- 第二句话 -->
      <p class="share-line-2">
        {{ strLine2 }}
      </p>
      <!-- 第三句话 -->
      <p class="share-line-3">
        {{ strLine3 }}
      </p>
      <!-- 图片 -->
      <img v-if="imgUrl === 1" class="share-img" src="./../../assets/images/share/pic-1.png" alt="">
      <img v-if="imgUrl === 2" class="share-img" src="./../../assets/images/share/pic-2.png" alt="">
      <img v-if="imgUrl === 3" class="share-img" src="./../../assets/images/share/pic-3.png" alt="">
      <!-- 按钮 -->
      <div class="share-btn-wrapper">
        <div class="share-btn" @click="findDragonball()">
          <div class="share-left-btn-triangle"></div>
          <div class="share-left-btn-words">继续寻找龙珠</div>
        </div>
        <div class="share-btn">
          <div class="share-right-btn-triangle"></div>
          <div class="share-right-btn-words">炫耀一下</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $store from './../store/store.js';
export default {
  data () {
    return {
      store: $store,
      strLine1: '',
      strLine2: '',
      strLine3: '',
      imgUrl: null
    }
  },
  created: function () {
    let _this = this;
    console.log('share');
    console.log(_this.store.state.thisRightTime);
    switch (_this.store.state.thisRightTime) {
      case 5:
        _this.strLine1 = '恭喜你  获得了';
        _this.strLine2 = '一星珠';
        _this.strLine3 = '你离召唤神龙又近了一步';
        _this.imgUrl = 2;
        break;
      case 0:
        _this.strLine1 = '获得了';
        _this.strLine2 = '天下倒数第一武道大会入场券';
        _this.strLine3 = '错一道题容易，基本没答对还挺难的，你是个人才，但是IT行业可能不适合你';
        _this.imgUrl = 1;
        break;
      default:
        _this.strLine1 = '没有找到龙珠  但找到了';
        _this.strLine3 = '少年，你和一星珠的缘分没到，继续修炼吧';
        switch (_this.store.state.starIndex) {
          case 1:
            _this.strLine2 = '占卜婆婆的水晶球';
            _this.imgUrl = 3;
            break;
          case 2:
            _this.strLine2 = '如意宝';
            _this.imgUrl = 3;
            break;
          case 3:
            _this.strLine2 = '战斗力探测器';
            _this.imgUrl = 3;
            break;
        }
    }
  },
  methods: {
    // 继续寻找龙珠
    findDragonball () {
      let _this = this;
      _this.$store.state.starIndex++;
      _this.$store.state.rightTime += _this.$store.state.thisRightTime;
      _this.$router.push('map');
    }
  }
}
</script>

<style lang="less" scoped>
#share-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
.share-wrapper-bg {
  width: 100%;
}
.share-wrapper-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
// 第一句话
.share-line-1 {
  color: #9a3d21;
  font-size: .4rem;
  text-align: center;
  margin-top: .5rem;
}
// 第二句话
.share-line-2 {
  color: #e5431a;
  font-size: .35rem;
  text-align: center;
  margin-top: .2rem;
}
// 第三句话
.share-line-3 {
  color: #9a3d21;
  font-size: .3rem;
  text-align: center;
  margin-top: .2rem;
  padding-left: .4rem;
  padding-right: .4rem;
}
// img
.share-img {
  width: 2.6rem;
  height: 2.2rem;
  margin-left: 1.9rem;
  margin-top: .2rem;
}
// btn
.share-btn-wrapper {
  width: 6.4rem;
  height: 3rem;
  margin-top: .2rem;
}
.share-btn {
  width: 2rem;
  height: .46rem;
  border: .04rem solid #fff;
  border-radius: .23rem;
  float: left;
  margin-left: .7rem;
}
.share-left-btn-words {
  color: #fff;
  font-family: "FZLTZCHK-GBK1-0", "Microsoft YaHei", Georgia, Serif;
  font-size: .24rem;
  display: inline-block;
  height: .46rem;
  line-height: .46rem;
  margin-left: .1rem;
  float: left;
}
.share-left-btn-triangle {
  float: left;
  border-top:.12rem solid transparent;
  border-bottom: .12rem solid transparent;
  border-right: .18rem solid #fff;
  margin-top: .1rem;
  margin-left: .12rem;
}
.share-right-btn-words {
  color: #fff;
  font-family: "FZLTZCHK-GBK1-0", "Microsoft YaHei", Georgia, Serif;
  font-size: .24rem;
  display: inline-block;
  height: .46rem;
  line-height: .46rem;
  margin-right: .2rem;
  float: right;
}
.share-right-btn-triangle {
  float: right;
  border-top:.12rem solid transparent;
  border-bottom: .12rem solid transparent;
  border-left: .18rem solid #fff;
  margin-top: .1rem;
  margin-right: .12rem;
}
</style>
