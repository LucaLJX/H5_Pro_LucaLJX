<template>
  <div>
    <!-- 新布局 -->
    <div id='newDraw'>
      <div class="header">
        抽奖
      </div>
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
                  'item_active': item.telephone === activeTel,
                  'item_disabled': telList.indexOf(item.telephone) === -1
                }"
              >
                <p class="item_name">{{ item.name }}</p>
                <p class="item_tel">{{ item.telephone }}</p>
              </div>
            </div>
          </div>
        </el-card>
        <!-- 右边操作、展示区域 -->
        <el-card shadow="always" class="right">
          <el-divider>中奖名单</el-divider>
          <el-divider content-position="left">一等奖</el-divider>
          <el-divider content-position="left">二等奖</el-divider>
          <el-divider>操作区</el-divider>
          <!-- 进度条 -->
          <el-steps :space="200" :active="0" finish-status="success" align-center>
            <el-step title="抽奖登记"></el-step>
            <el-step title="二等奖"></el-step>
            <el-step title="一等奖"></el-step>
            <el-step title="抽奖完成"></el-step>
          </el-steps>
          <!-- 操作 -->
          <el-form label-width="80px" label-positio="right">
            <el-form-item label="暂停登记" style="margin-top: 30px">
              <el-button size="small" type="danger" @click="stopGet()" :disabled="isStopClick">暂停</el-button>
            </el-form-item>
            <el-form-item label="二等奖">
              <el-button
                :loading="isStart"
                size="small"
                type="primary"
                @click="start(LUCK_TYPE.Secend)"
              >开始</el-button>
              <el-button
                size="small"
                type="default"
                @click="stop(LUCK_TYPE.Secend)"
              >停</el-button>
            </el-form-item>
            <el-form-item label="一等奖">
              <el-button
                :loading="isStart"
                size="small"
                type="primary"
                @click="start(LUCK_TYPE.FIRST)"
              >开始</el-button>
              <el-button size="small" type="default" @click="stop(LUCK_TYPE.FIRST)">停</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
// import '../../style/luckDraw.css'
import './index.less'
import { mockList } from './mock'

const LUCK_TYPE = {
  FIRST: 'FIRST', // 一等奖
  Secend: 'Secend', // 二等奖
}

// 数量
const FIRST_COUNT = 1
const SECEND_COUNT = 5
const THIRD_COUNT = 10

/**
 * 以手机号（telephone 字段）为唯一判定值
 * 1、增接口，手机号、姓名去重，若手机号已存在，则提示（是否修改名称）
 * 2、删接口手动调用
 * 3、查询按时间顺序一次性展示全量（时间倒序：修改时间最早在最前）
 */

const DEFAULT_FIRENDS = [
  {
    telephone: '13921071265',
    name: '陈冰燕',
  },
  {
    telephone: '17710785354',
    name: '刘晶鑫',
  },
  {
    telephone: '15151548735',
    name: '陈康琰',
  },
  {
    telephone: '15151548725',
    name: '张建',
  },
  {
    telephone: '18221246182',
    name: '杨军义',
  },
  {
    telephone: '18221246059',
    name: '顾於梅',
  },
]

export default {
  data() {
    return {
      mockList,
      LUCK_TYPE,
      DEFAULT_FIRENDS,
      // -----------系统变量
      firstCount: FIRST_COUNT,
      secendCount: SECEND_COUNT,
      thirdCount: THIRD_COUNT,
      luckyCount: 0,
      // ----------登记阶段用到的变量
      totalList: [], // 所有的参赛选手数据
      activeTel: 'id_22',
      telList: [], // 当前剩下的tel
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
      // ------------------- todo: 这里需要配置按钮的操作变量 分开，还是按照抽奖个数动态处理
      // 是否开始抽奖 true -- 开始抽奖 false -- 停止抽奖
      isStart: false,
      // 抽奖类型
      type: null,
      // 抽奖循环
      timer: null,
      // 抽奖个数
      secendCount: 0,
      // 抽二等奖的操作
      luckSecendTimer: null,
      // 三等奖获奖数
      thirdList: [],
      // 二等奖获奖数
      secendList: [],
      
    }
  },
  async mounted() {
    this.getTimer = setInterval(() => {
      this.getList()
    }, 2000)
  },
  methods: {
    // 获取所有人的信息
    mockApi() {
      return new Promise((resolve, reject) => {
        const list = this.mockList
        setTimeout(() => {
          resolve(list)
        }, 500)
      })
    },
    // 获取数据并赋值
    async getList() {
      console.log('开始获取数据')
      const result = await this.mockApi()
      const friends = []
      const telephones = []
      result.map(item => {
        const friendItem = DEFAULT_FIRENDS.find(friend => friend.telephone === item.telephone)
        if (friendItem) {
          friends.push(item)
        }
        telephones.push(item.telephone)
      })
      console.log(result)
      this.firendList = friends
      this.telList = telephones
      this.totalList = result
    },
    /**
     * 停止登记
     * 1、直接生成一等奖
     */
    stopGet () {
      clearInterval(this.getTimer)
      this.isStopClick = true
      // 停止获取数据的时候，直接内定一等奖
      const friendsLength = this.firendList.length
      const randomNum = Math.floor(Math.random() * friendsLength)
      console.log(randomNum)
      const firstLuckyMan = this.firendList[randomNum]
      console.log('幸运儿是')
      console.log(firstLuckyMan.name)
      this.cahceFirst = firstLuckyMan
    },
    // 开始抽奖
    start(type) {
      this.type = type
      this.timer = setInterval(() => {
        const randomTel = this.randomTel()
        console.log(randomTel)
        this.activeTel = randomTel
      }, 200)
    },
    stop(type) {
      // 如果是停抽二等奖
      if (type === LUCK_TYPE.Secend) {
        this.luckSecendTimer = setInterval(() => {
          this.luckSecend()
        }, 2000)
      }
      if (type === LUCK_TYPE.FIRST) {
        this.luckFirst()
      }
    },
    // 将获奖人员置为灰色
    removeLuckyMan(tel) {
      const newTelList = this.telList.filter(item => item !== tel)
      this.telList = newTelList
      console.log(this.telList)
    },
    // 抽奖
    getLuckItem() {
      const luckTel = this.getRandomTel()
      console.log(luckTel)
    },
    // 抽二等奖了
    luckSecend() {
      // const currentId = this.activeTel
      // const count = this.secendCount
    },
    // 抽一等奖了
    luckFirst() {
      console.log('抽一等奖')
    },
    // 以当前的telList，随机生成一个id
    getRandomTel() {
      let num = Math.floor(Math.random() * this.telList.length)
      let randomTel = this.telList[num]
      // 多试几次
      if (randomTel === cahceFirst.telephone) {
        num = Math.floor(Math.random() * this.telList.length)
        randomTel = this.telList[num]
      }
      if (randomTel === cahceFirst.telephone) {
        num = Math.floor(Math.random() * this.telList.length)
        randomTel = this.telList[num]
      }
      if (randomTel === cahceFirst.telephone) {
        num = Math.floor(Math.random() * this.telList.length)
        randomTel = this.telList[num]
      }

      return randomTel
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
