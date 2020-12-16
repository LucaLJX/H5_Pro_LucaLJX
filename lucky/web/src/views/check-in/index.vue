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
      <h3>抽奖登记</h3>
      <!-- 注册页面 -->
      <van-cell-group>
        <van-field v-model="name" label="姓名" placeholder="请输入宾客姓名" />
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
      </van-cell-group>
      <div class="button-wrapper">
        <van-button class="sign-button" type='info' size='small' @click="submit()">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import 'vant/lib/index.css'
import { Toast } from 'vant'
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
  },
  methods: {
    async submit() {
      if (!this.name) {
        console.log('555')
        return Toast.fail('请输入宾客姓名')
      }
      if (!this.phone) {
        return Toast.fail('请输入手机号')
      }
      if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(this.phone))) {
        return Toast.fail('请填写正确的手机号')
      }
      this.axios.post(`${getHost()}/lottery/user/register`, {
        name: this.name,
        phone: this.phone,
      }).then(response => {
        console.log(response)
        Toast.success('登记成功')
        setTimeout(() => {
          Toast.clear()
          this.$router.push({
            path: '/checkCode',
            query: {
              phone: this.phone,
            },
          })
        }, 800)
      }).catch(e => {
        console.log(e)
        Toast.fail('登记失败，请重试')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
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
