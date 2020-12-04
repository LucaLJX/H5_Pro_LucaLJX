<template>
  <div>
    <h2>this is test</h2>
    <!-- http://www.333ttt.com/up/yy94237.html -->
    <div class='audio-container'>
      <audio id='myAudio' autoplay :src='url'></audio>
    </div>
    <button @click='changeAudio'>切歌</button>
    <button @click='checkJay'>我喜欢</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'test',
      url: 'http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=94237&br=320kmp3&type=convert_url&response=res',
      jayList: ['94237', '94236', '94234', '94239', '94233', '94230'],
      currentNum: '94237',
    }
  },
  mounted() {
    console.log('this is test page')
    const audio = document.getElementById('myAudio')
    audio.loop = false
    audio.addEventListener('ended', () => {
      this.changeAudio()
    })
    audio.addEventListener('error', () => {
      this.changeAudio()
    })
    this.getMusicName()
  },
  methods: {
    getMusicName() {
      const url = `http://www.333ttt.com/up/yy${this.currentNum}.html`
      const ajax = new XMLHttpRequest()
      ajax.open('get', url)
      ajax.send()
      ajax.onreadystatechange = () => {
        if (ajax.readyState === 4 && ajax.status === 200) {
          console.log(ajax.responseText)
        }
      }
    },
    changeAudio() {
      const num = `${Math.floor(Math.random() * 50)}`
      const audioNum = `942${num}`
      this.currentNum = audioNum
      console.log(`当前播放： ${this.currentNum}`)
      this.url = `http://antiserver.kuwo.cn/anti.s?format=mp3|aac&rid=${audioNum}&br=320kmp3&type=convert_url&response=res`
    },
    checkJay() {
      console.log('我喜欢这首歌,加到歌单里')
      this.jayList.push(this.currentNum)
      console.log(this.jayList)
    },
  },
}
</script>

<style lang='css'>
  .audio-container {
    width: 100%;
    height: 200px;
    border: 1px solid red;
  }
</style>
