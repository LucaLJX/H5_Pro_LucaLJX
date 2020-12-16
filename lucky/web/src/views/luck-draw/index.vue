<template>
  <div>
    <!-- 新布局 -->
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
    <div id='newDraw'>
      <div class="content">
        <!-- 左边抽奖区域 -->
        <el-card shadow="always" class="left">
          <div class="items">
            <div
              v-for="(item, index) in totalList"
              :key="index"
              class="item"
            >
              <div
                class="item_content"
                :class="{
                  'item_active': item.phone === activeTel,
                  'item_disabled': telList.indexOf(item.phone) === -1
                }"
              >
                <p class="item_name">{{ item.code }}</p>
                <!-- <p class="item_tel">{{ item.name }}</p> -->
              </div>
            </div>
          </div>
        </el-card>
        <!-- 右边操作、展示区域 -->
        <el-card shadow="always" class="right">
          <el-divider>中奖名单</el-divider>
          <el-divider content-position="left">一等奖</el-divider>
          <span v-show="!firstList.length">未抽出</span>
          <div v-show="firstList.length">
            <el-tag
              v-for="(item, index) in firstList"
              :key="index"
              class="luckTag"
            >{{ item.code }}&nbsp;&nbsp;{{ item.name }}</el-tag>
          </div>
          <el-divider content-position="left">二等奖</el-divider>
          <span v-show="!secendList.length">未抽出</span>
          <div v-show="secendList.length">
            <el-tag
              v-for="(item, index) in secendList"
              :key="index"
              class="luckTag"
            >{{ item.code }}&nbsp;&nbsp;{{ item.name }}</el-tag>
          </div>
          <el-divider content-position="left">三等奖</el-divider>
          <span v-show="!thirdList.length">未抽出</span>
          <div v-show="thirdList.length">
            <el-tag
              v-for="(item, index) in thirdList"
              :key="index"
              class="luckTag"
            >{{ item.code }}&nbsp;&nbsp;{{ item.name }}</el-tag>
          </div>
          <el-divider>抽奖进度</el-divider>
          <!-- 进度条 -->
          <el-steps :space="200" :active="steps" finish-status="success" align-center>
            <el-step title="登记"></el-step>
            <el-step title="三等奖"></el-step>
            <el-step title="二等奖"></el-step>
            <el-step title="一等奖"></el-step>
          </el-steps>
          <el-divider>操作区</el-divider>
          <!-- 操作 -->
          <el-form label-width="80px" label-positio="right">
            <el-form-item v-show="steps === 0 && !finish" label="暂停登记" style="margin-top: 30px">
              <el-button
                size="small"
                type="danger"
                @click="stopGet()"
                :disabled="isStopClick">暂停</el-button>
            </el-form-item>
            <h3 v-show="steps !== 0 && !finish">当前抽取：{{ this.type }}</h3>
            <el-form-item label="" v-show="steps !== 0 && !finish">
              <el-button
                :loading="isStart"
                :disabled="isRandom"
                size="small"
                type="primary"
                @click="start()"
              >开始</el-button>
              <el-button
                :disabled="isRandom"
                size="small"
                type="default"
                @click="stop()">停</el-button>
            </el-form-item>
            <el-form-item label="" v-show="finish">
              <el-button
                size="small"
                type="primary"
                @click="showTotal()"
              >查看所有获奖名单</el-button>
            </el-form-item>
            <el-form-item label="" v-show="finish">
              <el-button
                size="small"
                type="primary"
                @click="clearLuck()"
              >清除抽奖结果</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <!-- 展示奖励弹窗 -->
    <el-dialog
      :title="luckDialog.title"
      :visible.sync="luckDialog.visible"
      width="500px">
      <span
        class="luckyText">
        恭喜以下宾客获得<span style="color: #F56C6C;">{{ luckDialog.luckContent }}</span>！
      </span>
      <div class="luckyContent">
        <div class="luckyItem" v-for="(luckyItem, index) in luckDialog.luckList" :key="index">
          <p class="luckyItemTitle">{{ luckyItem.code }}</p>
          <p class="luckyItemContent">{{ luckyItem.name }}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeLuckyDialog()">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 展示所有奖励弹窗 -->
    <el-dialog
      title="获奖名单"
      :visible.sync="totalDialog.visible"
      width="500px">
      <span
        class="luckyText">
        <span style="color: #F56C6C;">{{ LUCK_TYPE.FIRST }}:</span>
      </span>
      <div class="luckyContent">
        <div class="luckyItem" v-for="(luckyItem, index) in firstList" :key="index">
          <p class="luckyItemTitle">{{ luckyItem.code }}</p>
          <p class="luckyItemContent">{{ luckyItem.name }}</p>
        </div>
      </div>
       <span
        class="luckyText">
        <span style="color: #F56C6C;">{{ LUCK_TYPE.SECEND }}:</span>
      </span>
      <div class="luckyContent">
        <div class="luckyItem" v-for="(luckyItem, index) in secendList" :key="index">
          <p class="luckyItemTitle">{{ luckyItem.code }}</p>
          <p class="luckyItemContent">{{ luckyItem.name }}</p>
        </div>
      </div>
       <span
        class="luckyText">
        <span style="color: #F56C6C;">{{ LUCK_TYPE.THIRD }}:</span>
      </span>
      <div class="luckyContent">
        <div class="luckyItem" v-for="(luckyItem, index) in thirdList" :key="index">
          <p class="luckyItemTitle">{{ luckyItem.code }}</p>
          <p class="luckyItemContent">{{ luckyItem.name }}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeTotal()">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import '../../style/luckDraw.css'
import './index.less'
import { mockList } from './mock'
import { getHost } from '../../utils'

const LUCK_TYPE = {
  FIRST: '一等奖', // 一等奖
  SECEND: '二等奖', // 二等奖
  THIRD: '三等奖', // 三等奖
}

// 数量
const FIRST_COUNT = 1
const SECEND_COUNT = 5
const THIRD_COUNT = 10

/**
 * 以手机号（phone 字段）为唯一判定值
 * 1、增接口，手机号、姓名去重，若手机号已存在，则提示（是否修改名称）
 * 2、删接口手动调用
 * 3、查询按时间顺序一次性展示全量（时间倒序：修改时间最早在最前）
 */

const DEFAULT_FIRENDS = [
  {
    phone: '15151548735',
    name: '陈康琰',
  },
  {
    phone: '15151548725',
    name: '张建',
  },
  {
    phone: '18221246182',
    name: '杨军义',
  },
  {
    phone: '18221246059',
    name: '顾於梅',
  },
  {
    phone: '13427521270',
    name: '黄琪评',
  },
  {
    phone: '15351916299',
    name: '陶心媛',
  },
  {
    phone: '13921032145',
    name: '史恋',
  },
  {
    phone: '15152975326',
    name: '贾亚芬',
  },
  {
    phone: '15951333865',
    name: '顾琪琦',
  },
  {
    phone: '18612176068',
    name: '闫冉',
  },
]

export default {
  data() {
    return {
      // 奖励弹窗--------------
      luckDialog: {
        visible: false,
        title: '',
        luckContent: '',
        luckList: [],
      },
      // 所有获奖名单弹窗
      totalDialog: {
        visible: false,
      },
      mockList,
      LUCK_TYPE,
      DEFAULT_FIRENDS,
      // -----------系统变量
      firstCount: FIRST_COUNT,
      secendCount: SECEND_COUNT,
      thirdCount: THIRD_COUNT,
      luckyCount: 0,
      steps: 0, // 抽奖进度
      // ----------登记阶段用到的变量
      totalList: [], // 所有的参赛选手数据
      activeTel: 'id_22',
      telList: [], // 当前剩下的tel
      randomList: [], // 用于抽奖的list，一等奖提前剔除
      // 抽奖轮询
      getTimer: null,
      // 是否点击过停止
      isStopClick: false,
      // -------------------内定及一等奖数据
      // 内定的朋友
      firendList: [],
      // 暂存一等奖
      cahceFirst: null,
      // 一等奖
      firstList: [],
      // -------------------二等奖
      secendList: [],
      // -------------------三等奖
      thirdList: [],
      // ------------------- todo: 这里需要配置按钮的操作变量 分开，还是按照抽奖个数动态处理
      // 是否开始抽奖 true -- 开始抽奖 false -- 停止抽奖
      isStart: false,
      isRandom: false,
      finish: false,
      // 抽奖类型
      type: LUCK_TYPE.THIRD,
      // 抽奖循环
      timer: null,
      // 抽二等奖的操作
      luckSecendTimer: null,
    }
  },
  async mounted() {
    const luckStorage = window.localStorage.getItem('luckStorage')
    if (luckStorage) {
      this.formatStorage(luckStorage)
      this.steps = 5
      this.finish = true
    } else {
      this.getTimer = setInterval(() => {
        this.getList()
      }, 2000)
    }
  },
  methods: {
    // 清除抽奖结果
    clearLuck() {
      window.localStorage.removeItem('luckStorage')
      window.location.reload()
    },
    // 初始化已抽奖列表
    formatStorage(luckStorage) {
      try {
        const obj = JSON.parse(luckStorage)
        const { firstList, secendList, thirdList } = obj
        this.firstList = firstList
        this.secendList = secendList
        this.thirdList = thirdList
        this.showTotal()
      } catch (e) {
        window.localStorage.removeItem('luckStorage')
        this.getTimer = setInterval(async () => {
          this.getList()
        }, 2000)
      }
    },
    // 获取登记列表
    getTotalList() {
      return new Promise((resolve, reject) => {
        this.axios.post(`${getHost()}/lottery/user/list`).then(response => {
          resolve(response.data)
        }).catch(e => {
          reject(e)
        })
      })
    },
    // 获取所有人的信息
    mockApi() {
      return new Promise(resolve => {
        const list = this.mockList
        const newList = list.map((item, index) => ({
          ...item,
          code: `A0${index}`,
        }))
        setTimeout(() => {
          resolve(newList)
        }, 500)
      })
    },
    // 获取数据并赋值
    async getList() {
      // console.log('开始获取数据')
      const res = await this.mockApi()
      const result = [...res, ...this.DEFAULT_FIRENDS]
      // const result = (await this.getTotalList()).data

      const friends = []
      const phoneList = []
      result.map(item => {
        const friendItem = DEFAULT_FIRENDS.find(friend => friend.phone === item.phone)
        if (friendItem) {
          friends.push(item)
        }
        phoneList.push(item.phone)
        return null
      })
      console.log(result)
      this.firendList = friends
      this.telList = phoneList
      this.totalList = result
    },
    /**
     * 停止登记
     * 1、直接生成一等奖
     */
    stopGet() {
      clearInterval(this.getTimer)
      this.isStopClick = true
      // 停止获取数据的时候，直接内定一等奖
      const friendsLength = this.firendList.length
      const randomNum = Math.floor(Math.random() * friendsLength)
      const firstLuckyMan = this.firendList[randomNum]
      console.log(this.firendList)
      console.log(firstLuckyMan)
      console.log(randomNum)
      const randomList = this.telList.filter(item => item !== firstLuckyMan.phone)
      this.randomList = randomList
      this.cahceFirst = firstLuckyMan
      this.steps += 1
    },
    // 开始抽奖
    start() {
      this.isStart = true
      this.timer = setInterval(() => {
        const randomTel = this.getRandomTel()
        this.activeTel = randomTel
      }, 200)
    },
    stop() {
      this.isStart = false
      this.isRandom = true
      clearInterval(this.timer)
      if (this.type === LUCK_TYPE.THIRD) {
        this.luckThirdDraw()
      }
      if (this.type === LUCK_TYPE.SECEND) {
        this.luckSecendDraw()
      }
      if (this.type === LUCK_TYPE.FIRST) {
        this.luckFirstDraw()
      }
    },
    // 抽三等奖
    luckThirdDraw() {
      let count = 0
      let mathCount = 0
      this.timer = setInterval(() => {
        const randomTel = this.getRandomTel()
        this.activeTel = randomTel
        mathCount += 1
        if (mathCount % 5 === 0) {
          const luckItem = this.totalList.find(item => item.phone === randomTel)
          this.thirdList.push(luckItem)
          count += 1
          this.removeLuckyMan(randomTel)
          if (count === this.thirdCount) {
            clearInterval(this.timer)
            // 展示三等奖
            this.showLuckDialog(LUCK_TYPE.THIRD)
            this.isRandom = false
          }
        }
      }, 500)
    },
    // 抽二等奖
    luckSecendDraw() {
      let count = 0
      let mathCount = 0
      this.timer = setInterval(() => {
        const randomTel = this.getRandomTel()
        this.activeTel = randomTel
        mathCount += 1
        if (mathCount % 5 === 0) {
          const luckItem = this.totalList.find(item => item.phone === randomTel)
          this.secendList.push(luckItem)
          count += 1
          this.removeLuckyMan(randomTel)
          if (count === this.secendCount) {
            clearInterval(this.timer)
            // 展示二等奖
            this.showLuckDialog(LUCK_TYPE.SECEND)
            this.isRandom = false
          }
        }
      }, 500)
    },
    // 抽一等奖
    luckFirstDraw() {
      let mathCount = 0
      this.timer = setInterval(() => {
        const randomTel = this.getRandomTel()
        this.activeTel = randomTel
        mathCount += 1
        if (mathCount === 5) {
          clearInterval(this.timer)
          setTimeout(() => {
            this.activeTel = this.cahceFirst.phone
            const luckItem = this.totalList.find(item => item.phone === this.cahceFirst.phone)
            this.firstList.push(luckItem)
            this.removeLuckyMan(this.cahceFirst.phone)
            this.showLuckDialog(this.LUCK_TYPE.FIRST)
            this.isRandom = false
            this.finish = true
            const luckStorage = {
              firstList: this.firstList,
              secendList: this.secendList,
              thirdList: this.thirdList,
            }
            window.localStorage.setItem('luckStorage', JSON.stringify(luckStorage))
          }, 500)
        }
      }, 500)
    },
    // 展示某一奖项的获奖弹窗
    showLuckDialog(type) {
      switch (type) {
        case this.LUCK_TYPE.THIRD:
          // 展示三等奖
          this.luckDialog = {
            visible: true,
            title: '三等奖获奖名单',
            luckContent: this.LUCK_TYPE.THIRD,
            luckList: [...this.thirdList],
          }
          break
        case this.LUCK_TYPE.SECEND:
          // 展示二等奖
          this.luckDialog = {
            visible: true,
            title: '二等奖获奖名单',
            luckContent: this.LUCK_TYPE.SECEND,
            luckList: [...this.secendList],
          }
          break
        case this.LUCK_TYPE.FIRST:
          // 展示三等奖
          this.luckDialog = {
            visible: true,
            title: '一等奖获奖名单',
            luckContent: this.LUCK_TYPE.FIRST,
            luckList: [...this.firstList],
          }
          break
        default:
      }
    },
    // 关闭弹窗
    closeLuckyDialog() {
      this.luckDialog = {
        visible: false,
        title: '',
        luckContent: '',
        luckList: [],
      }
      if (this.type === this.LUCK_TYPE.THIRD) {
        this.type = this.LUCK_TYPE.SECEND
      } else if (this.type === this.LUCK_TYPE.SECEND) {
        this.type = this.LUCK_TYPE.FIRST
      }
      this.steps += 1
    },
    // 将获奖人员置为灰色
    removeLuckyMan(tel) {
      const newTelList = this.telList.filter(item => item !== tel)
      const newRandomList = this.randomList.filter(item => item !== tel)
      this.telList = newTelList
      this.randomList = newRandomList
    },
    // 以当前的telList，随机生成一个id
    getRandomTel() {
      const num = Math.floor(Math.random() * this.randomList.length)
      const randomTel = this.randomList[num]

      return randomTel
    },
    closeTotal() {
      this.totalDialog.visible = false
    },
    showTotal() {
      this.totalDialog.visible = true
    },
  },
}
</script>

<style lang="css">
a,
div.menu,
div.items,
div.ss {
  color: #333;
}
/* div.item {
  background: rgba(0, 170, 210, 0.8);
  border: solid 1px rgba(0, 170, 210, 0.1);
  color: #fff;
} */
div.active {
  background: rgb(135, 255, 126);
  opacity: 1;
  filter: alpha(opacity=100);
  color: #000;
}
div.ignore {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #666;
}
div.active.ignore {
  border: 1px solid #fff;
  background: rgb(135, 255, 126);
  opacity: 1;
  filter: alpha(opacity=100);
  color: #000;
}
div.top {
  color: rgb(0, 170, 210);
}
.ss h2 {
  color: #333;
}
div.menu {
  color: #333;
}
/* 本页面自定义样式 */
/* .itemName {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
.itemTel {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
} */
</style>
