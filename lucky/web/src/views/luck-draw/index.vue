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
              <el-button size="small" type="danger" @click="onSubmit">暂停</el-button>
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

const LUCK_TYPE = {
  FIRST: 'FIRST', // 一等奖
  Secend: 'Secend', // 二等奖
}

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
]

export default {
  data() {
    return {
      LUCK_TYPE,
      DEFAULT_FIRENDS,
      title: 'ceshi',
      totalList: [], // 所有的参赛选手数据
      activeTel: 'id_22',
      checkedList: [], // 当前选中的
      selectedList: [], // 已经选过的
      telList: [], // 当前剩下的id
      // 内定的朋友
      defaultList: [],
      // 是否开始了
      isStart: false,
      // 是否停了
      isStop: true,
      // 抽奖类型
      type: null,
      // 抽奖循环
      timer: null,
      // 抽奖个数
      secendCount: 0,
      // 抽二等奖的操作
      luckSecendTimer: null,
    }
  },
  async mounted() {
    console.log('mounted')
    const list = []
    const telList = []
    for (let i = 0; i < 100; i += 1) {
      list.push({
        name: `item_${i + 1}`,
        id: `id_${i + 1}`,
        telephone: `tel_${i + 1}`,
      })
      telList.push(`tel_${i + 1}`)
    }
    // 赋值朋友
    this.defaultList = DEFAULT_FIRENDS
    this.defaultList.map((item) => {
      telList.push(item.telephone)
      return null
    })
    this.totalList = [...list, ...DEFAULT_FIRENDS]
    this.telList = telList
  },
  methods: {
    // 开始抽奖
    start(type) {
      this.type = type
      this.timer = setInterval(() => {
        const randomId = this.randomId()
        console.log(randomId)
        this.activeTel = randomId
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
    randomId() {
      const num = Math.floor(Math.random() * this.telList.length)
      console.log(num)
      const randomId = this.telList[num]

      return randomId
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
