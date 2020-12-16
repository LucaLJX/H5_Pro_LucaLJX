<template>
  <div id="checkCode">
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
    <div class="checkCode-wrapper">
      <transition name="van-slide-right" v-if='!hasQuery'>
        <div class="wrapper" v-show="isCheck">
          <h3>查看我的抽奖码</h3>
          <!-- 注册页面 -->
          <van-cell-group>
            <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
          </van-cell-group>
          <div class="button-wrapper">
            <van-button
              class="sign-button"
              type='info' size='small' @click="submit()">提交</van-button>
          </div>
        </div>
      </transition>
      <transition name="van-slide-right">
        <div class="wrapper" v-show="!isCheck">
          <h3>抽奖码</h3>
          <p>您的抽奖码是：{{ code }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getHost } from '../../utils'

export default {
  data() {
    return {
      hasQuery: false,
      phone: '',
      isCheck: true,
      code: '',
    }
  },
  async created() {
    const { query: { phone } } = this.$route
    if (phone) {
      this.hasQuery = true
      const result = await this.getCode(phone)
      if (!result) {
        Toast.fail('未查询到您的抽奖码，请重新扫码进行登记！')
      } else {
        this.code = result.code
        this.isCheck = false
      }
    }
  },
  methods: {
    async submit() {
      if (!this.phone) {
        return Toast.fail('请输入手机号')
      }
      if (!(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(this.phone))) {
        return Toast.fail('请填写正确的手机号')
      }
      const result = await this.getCode(this.phone)
      if (!result) {
        Toast.fail('未查询到您的抽奖码，请重新扫码进行登记！')
      } else {
        this.code = result.code
        this.isCheck = false
      }
    },
    getCode(phone) {
      return new Promise((resolve, reject) => {
        this.axios.get(`${getHost()}/lottery/user/detail/phone/${phone}`).then(response => {
          const { data } = response.data
          resolve(data)
        }).catch(e => {
          Toast.fail('查询失败，请重试')
          reject(e)
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.checkCode-wrapper {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.wrapper {
  min-height: 100vh;
  width: 100%;
  h3 {
    height: 3rem;
    text-align: center;
    padding-top: 4rem;
  }
  p {
    text-align: center;
    font-size: 16px;
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
