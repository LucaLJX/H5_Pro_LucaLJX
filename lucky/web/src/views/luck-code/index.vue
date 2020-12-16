<template>
  <div id='luckCode'>
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
    <div class='code-wrapper'>
      <h2>尊敬的{{ info.name }}</h2>
      <p>您的抽奖码是</p>
      <h1>{{ info.code }}</h1>
    </div>
  </div>
</template>

<script>
import 'sass-rem/_rem.scss'
import { getHost } from '../../utils'

export default {
  data() {
    return {
      title: '验证码',
      info: {},
    }
  },
  async mounted() {
    console.log(this.$route)
    const { query: { phone } } = this.$route
    console.log(phone)
    if (phone) {
      const result = await this.getCode(phone)
      console.log(result)
      this.info = result
    }
  },
  methods: {
    getCode(phone) {
      return new Promise((resolve, reject) => {
        this.axios.get(`${getHost()}/lottery/user/detail/phone/${phone}`).then(response => {
          resolve(response.data.data)
        }).catch(e => {
          reject(e)
        })
      })
    },
  },
}
</script>

<style>
h2 {
  font-size: 1rem;
}
#luckCode {
  min-height: 100vh;
  width: 100%;
}
</style>
