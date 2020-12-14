<template>
  <div id="checkIn">
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
      const host = origin.indexOf('localhost') === -1 ? origin : ''
      this.axios.post(`${host}/lottery/user/register`, {
        name: this.name,
        phone: this.phone,
      }).then(response => {
        console.log(response)
        Toast.success('登记成功')
        this.$router.push({
          path: '/luckCode',
          query: {
            phone: this.phone,
          },
        })
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
