<template>
	<div id="question-wrapper">
		<!-- 背景 -->
    <img class="question-wrapper-bg" src="./../../assets/images/question/bg.png" alt="">
    <!-- title -->
    <img v-if="$store.state.starIndex === 1" class="question-content-title-img" src="./../../assets/images/question/title-1.png" alt="">
    <img v-if="$store.state.starIndex === 2" class="question-content-title-img" src="./../../assets/images/question/title-2.png" alt="">
    <img v-if="$store.state.starIndex === 3" class="question-content-title-img" src="./../../assets/images/question/title-3.png" alt="">
		<!-- 答题主体 -->
		<div class="question-content">
			<div class="question-content-wrapper">
				<!-- 背景图 -->
				<img class="question-content-bg" src="./../../assets/images/question/wrapper.png" alt="">
				<!-- 红绿黑三色球 -->
				<div class="question-content-ball-wrapper">
          <div v-for="(item, index) in answeredDetail" class="question-content-ball">
            <img v-if="answeredCount < (index + 1)" class="question-content-ball-img" src="./../../assets/images/question/ball-black.png" alt="">
            <img v-if="!answeredDetail[index].isRight && answeredCount >= (index + 1)" class="question-content-ball-img" src="./../../assets/images/question/ball-red.png" alt="">
            <img v-if="answeredDetail[index].isRight && answeredCount >= (index + 1)" class="question-content-ball-img" src="./../../assets/images/question/ball-green.png" alt="">
          </div>
				</div>
        <!-- 题目界面 -->
        <div class="question-content-detail-wrapper">
          <div class="question-content-detail">
            <!-- 题目 -->
            <p class="question-content-word">
              {{ questionMap[store.state.starIndex - 1].questions[questionIndex].question }}
            </p>
            <!-- 选项 -->
            <div class="question-content-option-wrapper">
              <div v-for="(item, index) in questionMap[store.state.starIndex - 1].questions[questionIndex].options" class="question-content-option" :class="[
                optionCheckDetail[index].isChecked ? 'question-content-checked' : 'question-content-unchecked'
              ]" @click="selectItem(index)">
                <p class="question-content-option-word" :class="[item.length <= 20 ? 'question-content-option-word-1' : 'question-content-option-word-2']">{{ item }}</p>
                <img v-if="promptOptionA === (index + 1) && capsuleAused === true" class="question-content-option-img" src="./../../assets/images/question/yes.png" alt="">
                <img v-if="promptOptionB === (index + 1) && capsuleBused === true" class="question-content-option-img" src="./../../assets/images/question/wrong.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <!-- 确定按钮 -->
        <div class="question-content-btn" @click="confirm()">
          <p class="question-content-btn-word">确定</p>
        </div>
			</div>
		</div>
		<!-- 尾部 -->
    <div class="question-bottom">
      <div class="question-bottom-wrapper">
        <img class="question-bottom-bg" src="./../../assets/images/question/bottom.png" alt="">
        <img v-if="capsuleTypeA" class="question-bottom-capsule-1" src="./../../assets/images/question/capsule-1.png" alt="" @click="showCapsule(1)">
        <img v-if="capsuleTypeB" class="question-bottom-capsule-2" src="./../../assets/images/question/capsule-2.png" alt="" @click="showCapsule(2)">
      </div>
    </div>
    <!-- 弹出框--提示使用胶囊 -->
    <div class="question-modal" v-if="capsuleModal">
      <div class="question-modal-container">
        <div class="question-modal-border">
          <div class="question-modal-wrapper">
            <div class="question-modal-content">
              <img v-if="isUseCapsuleType === 1" class="question-modal-content-img" src="./../../assets/images/question/capsule-1.png" alt="">
              <img v-if="isUseCapsuleType === 2" class="question-modal-content-img" src="./../../assets/images/question/capsule-2.png" alt="">
              <p class="question-modal-content-word">使用万能胶囊{{ isUseCapsuleType }}号，{{ isUseCapsuleType === 1 ? '释放一个正确答案' : '排除一个错误答案' }}。</p>
            </div>
            <div class="question-modal-bottom">
              <div class="question-modal-btn" @click="isUseCapsule(false)">
                <p class="question-modal-btn-word">不了</p>
              </div>
              <div class="question-modal-btn" @click="isUseCapsule(true)">
                <p class="question-modal-btn-word">是的，我要</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出框--报错--需要选择选项才可以下一题 -->
    <div class="question-modal" v-if="wrongModal">
      <div class="question-modal-container">
        <div class="question-modal-border">
          <div class="question-modal-wrapper">
            <div class="question-modal-content-2">
              <p class="question-modal-content-2-word">请先选择答案。</p>
            </div>
            <div class="question-modal-bottom">
              <div class="question-modal-btn-2" @click="closeWrongModal()">
                <p class="question-modal-btn-word">确定</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import $store from './../store/store.js';
import $axios from 'axios';
export default {
  data () {
    return {
      store: $store,
      questionMap: [
        // 一星题
        {
          title: 'star-1',
          questions: [
            {
              questionNo: 1,
              question: '云计算三层架构是指：（多选）',
              options: [
                'A、IAAS',
                'B、DAAS',
                'C、SAAS',
                'D、PAAS'
              ],
              answer: 134
            },
            {
              questionNo: 2,
              question: '在云计算中IAAS层指的是：',
              options: [
                'A、平台即服务',
                'B、软件即服务',
                'C、基础设施即服务',
                'D、数据即服务'
              ],
              answer: 3
            },
            {
              questionNo: 3,
              question: '云计算体系架构中的安全管理包括：（多选）',
              options: [
                'A、身份认证',
                'B、安全审计',
                'C、数据库审计',
                'D、访问授权'
              ],
              answer: 124
            },
            {
              questionNo: 4,
              question: '云计算技术优势主要体现在哪些方面：（多选）',
              options: [
                'A、设备数量',
                'B、管理成本',
                'C、运维成本',
                'D、技术复杂度'
              ],
              answer: 123
            },
            {
              questionNo: 5,
              question: '分布式存储的特性包括：（多选）',
              options: [
                'A、横向扩展性强',
                'B、规模越大、性能越好',
                'C、支持文件、对象和块存储',
                'D、双活容灾的复杂度'
              ],
              answer: 123
            }
          ]
        },
        // 二星题
        {
          title: 'star-2',
          questions: [
            {
              questionNo: 1,
              question: '业内定义云管理平台的英文缩写是：',
              options: [
                'A、MPM',
                'B、CMP',
                'C、MCP',
                'D、MPC'
              ],
              answer: 2
            },
            {
              questionNo: 2,
              question: '云管平台可以实现多种异构虚拟化和云平台资源环境的一体化管理和运维，以下哪项不被云管实现纳管？',
              options: [
                'A、物理机资源池',
                'B、KVM和VMware虚拟化',
                'C、OpenStack',
                'D、行业业务系统'
              ],
              answer: 4
            },
            {
              questionNo: 3,
              question: '云管理平台的设计目标是：（多选）',
              options: [
                'A、资源一体化监管',
                'B、多维可视化监控',
                'C、智能自动化运维',
                'D、多云统一管理'
              ],
              answer: 1234
            },
            {
              questionNo: 4,
              question: '云管平台概念的误区是？',
              options: [
                'A、云管平台负责对云平台进行管理',
                'B、OpenStack就是云管平台',
                'C、云管平台可以管理传统架构资源',
                'D、云管平台市场需求处于高速增长期'
              ],
              answer: 2
            },
            {
              questionNo: 5,
              question: '云管平台需要实现的基本关键功能包括有：（多选）',
              options: [
                'A、快捷部署',
                'B、统一管理',
                'C、资源弹性伸缩',
                'D、按需供应'
              ],
              answer: 1234
            }
          ]
        },
        // 三星题
        {
          title: 'star-3',
          questions: [
            {
              questionNo: 1,
              question: '那一项不是服务器虚拟化技术或者产品：',
              options: [
                'A、KVM',
                'B、Xen',
                'C、VMware vSphere',
                'D、Docker'
              ],
              answer: 4
            },
            {
              questionNo: 2,
              question: '采用国产虚拟化技术方案的驱动力有：（多选）',
              options: [
                'A、降低采购和运维成本',
                'B、提高基础设施利用率',
                'C、安全自主可控',
                'D、提高易用性和灵活性'
              ],
              answer: 1234
            },
            {
              questionNo: 3,
              question: '哪项不是虚拟化主要功能点：',
              options: [
                'A、集群高可用（HA）',
                'B、虚拟机热迁移',
                'C、vCPU和内存动态调整',
                'D、物理机聚合'
              ],
              answer: 4
            },
            {
              questionNo: 4,
              question: '对虚拟机的最佳描述是：',
              options: [
                'A、执行软件测试程序的物理机',
                'B、通过虚拟机软件可以像物理机一样执行程序',
                'C、提供故障恢复功能的计算机工具',
                'D、封装了硬件的软件计算机'
              ],
              answer: 2
            },
            {
              questionNo: 5,
              question: '虚拟化的Hypervisor分为那两种架构：（多选）',
              options: [
                'A、裸金属架构',
                'B、SOA架构',
                'C、NUMA架构',
                'D、寄居架构'
              ],
              answer: 14
            }
          ]
        }
      ],
      // 答题当前序号
      questionIndex: 0,
      // 已答题的数目
      answeredCount: 0,
      // 在作答的选项情况
      optionCheckDetail: [
        {
          isChecked: false
        },
        {
          isChecked: false
        },
        {
          isChecked: false
        },
        {
          isChecked: false
        }
      ],
      // 当前答题的选择情况
      answerChecked: [],
      // 当前答题的答案
      answer: null,
      // 答题详情
      answeredDetail: [
        {
          answer: null,
          isRight: false
        },
        {
          answer: null,
          isRight: false
        },
        {
          answer: null,
          isRight: false
        },
        {
          answer: null,
          isRight: false
        },
        {
          answer: null,
          isRight: false
        }
      ],
      // 正确的个数
      rightTime: 0,
      // 提示
      capsuleModal: false,
      // 初始化有两个胶囊
      capsuleTypeA: true,
      capsuleTypeB: true,
      // 使用的胶囊
      capsuleAused: false,
      capsuleBused: false,
      capsuleUsed: null,
      // 提示的选项
      promptOptionA: null,
      promptOptionB: null,
      // 提示是否使用胶囊编号
      isUseCapsuleType: null,
      // 报错
      wrongModal: false
    };
  },
  created: function () {
    $store.state.isLoading = false;
  },
  methods: {
    // 清空选项状态
    clearOptionState () {
      let _this = this;
      for (let i = 0; i < _this.optionCheckDetail.length; i++) {
        const node = _this.optionCheckDetail[i];
        node.isChecked = false;
      }
    },
    // 点击勾选选项
    selectItem (index) {
      let _this = this;
      let _index = index;
      // 对选中状态进行处理
      if (_this.optionCheckDetail[_index].isChecked) {
        _this.optionCheckDetail[_index].isChecked = false;
      } else {
        _this.optionCheckDetail[_index].isChecked = true;
      }
      // 构建选中的答案数组合集
      let checkedItem = _index + 1;
      if (_this.answerChecked.indexOf(checkedItem) === -1) {
        _this.answerChecked.push(checkedItem);
      } else {
        _this.answerChecked.splice(this.answerChecked.indexOf(checkedItem), 1);
      }
      // 对当前答案进行排序处理
      _this.answerChecked.sort();
      _this.answer = parseInt(_this.answerChecked.join(''));
      console.log(_this.answerChecked);
    },
    // 点击确认按钮
    confirm () {
      let _this = this;
      if (_this.answerChecked.length === 0) {
        _this.wrongModal = true;
        return false;
      }
      // 操作球
      _this.answeredCount ++;
      // 当前回答的题目的正确答案
      let rightAnswer = _this.questionMap[_this.store.state.starIndex - 1].questions[_this.questionIndex].answer;
      // 给答题详情赋值
      _this.answeredDetail[_this.questionIndex].answer = _this.answer;
      if (_this.answer === rightAnswer) {
        _this.answeredDetail[_this.questionIndex].isRight = true;
        _this.rightTime++;
        console.log('对的');
        console.log(_this.rightTime);
      } else {
        _this.answeredDetail[_this.questionIndex].isRight = false;
      }
      // 提交答案
      let paperId = _this.$store.state.starIndex;
      let questionId = _this.questionIndex;
      let splitKey = _this.$store.state.splitKey;
      let answerStatus = _this.answer === rightAnswer ? '1' : '0';
      let optionId = _this.answer;
      let recordUser = _this.$store.state.openid;
      $axios.post(_this.$store.state.host + 'answerRecord/', [{
        paperId: paperId,
        questionId: questionId,
        splitKey: splitKey,
        answerStatus: answerStatus,
        optionId: optionId,
        recordUser: recordUser
      }])
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // 换下一题
      // 清空提示
      _this.capsuleAused = false;
      _this.capsuleBused = false;
      _this.promptOptionA = null;
      _this.promptOptionB = null;
      if (_this.questionIndex === 4) {
        // 这里该跳转了
        console.log(_this.answeredDetail);
        _this.$store.state.thisRightTime = _this.rightTime;
        // _this.$store.state.totalTime = _this.$store.state.totalTime + 5;
        _this.$router.push('share');
        return false;
      } else {
        _this.questionIndex ++;
      }
      // 清空当前选项
      _this.answer = null;
      _this.answerChecked.splice(0, _this.answerChecked.length);
      _this.clearOptionState();
    },
    // 点击胶囊，是否使用
    showCapsule (index) {
      let _this = this;
      let _index = index;
      _this.capsuleModal = true;
      _this.isUseCapsuleType = _index;
    },
    // 点击确认是否使用胶囊
    isUseCapsule (value) {
      let _this = this;
      let isUse = value;
      if (!isUse) {
        // 不使用
        _this.capsuleModal = false;
      } else {
        _this.capsuleModal = false
        console.log(_this.isUseCapsuleType);
        // 使用
        if (_this.isUseCapsuleType === 1) {
          // 使用1号胶囊
          _this.showRight();
        } else if (_this.isUseCapsuleType === 2) {
          // 使用2号胶囊
          _this.showWrong();
        }
      }
    },
    // 提示一个正确答案
    showRight () {
      let _this = this;
      let rightAnswer = _this.questionMap[_this.store.state.starIndex - 1].questions[_this.questionIndex].answer;
      rightAnswer = rightAnswer.toString();
      let rightAnswerArr = rightAnswer.split('');
      let arrLength = rightAnswerArr.length;
      let showIndex = Math.floor(Math.random() * arrLength);
      _this.promptOptionA = parseInt(rightAnswerArr[showIndex]);
      _this.capsuleAused = true
      _this.capsuleTypeA = false;
    },
    // 提示一个错误答案
    showWrong () {
      let _this = this;
      let allArr = ['1', '2', '3', '4'];
      let rightAnswer = _this.questionMap[_this.store.state.starIndex - 1].questions[_this.questionIndex].answer;
      let rightAnswerArr = rightAnswer.toString().split('');
      for (let i = 0; i < rightAnswerArr.length; i++) {
        const node = rightAnswerArr[i];
        if (allArr.indexOf(node)) {
          allArr.splice(allArr.indexOf(node), 1)
        }
      }
      let showIndex = Math.floor(Math.random() * allArr.length);
      _this.promptOptionB = parseInt(allArr[showIndex]);
      _this.capsuleBused = true;
      _this.capsuleTypeB = false;
    },
    // 关闭提示
    closeWrongModal () {
      let _this = this;
      _this.wrongModal = false;
    }
  }
};
</script>

<style lang="less" scoped>
#question-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: hidden;
}
.question-wrapper-bg {
  width: 100%;
}
.question-content-title-img {
  width: 6.4rem;
  height: .83rem;
  position: absolute;
  top: 1rem;
}
/**
答题主体
*/
.question-content {
  width: 6.4rem;
  height: 6.2rem;
  position: absolute;
  top: 2rem;
}
.question-content-wrapper {
  width: 100%;
  height: 100%;
}
.question-content-bg {
  width: 100%;
  height: 100%;
}
/**
答题主体--球球
*/
.question-content-ball-wrapper {
  width: 1.7rem;
  height: 0.3rem;
  position: absolute;
  top: 0.9rem;
  left: 2.3rem;
}
.question-content-ball {
  width: 0.25rem;
  height: 0.25rem;
  float: left;
  margin-right: 0.09rem;
}
.question-content-ball-img {
  width: 100%;
  height: 100%;
}
// 问题详情
.question-content-detail-wrapper {
  width: 4.5rem;
  height: 3.2rem;
  position: absolute;
  top: 1.4rem;
  left: .9rem;
}
.question-content-detail {
  width: 100%;
  height: 100%;
  position: relative;
}
.question-content-word {
  color: #fff;
  padding-left: .2rem;
  padding-right: .2rem;
  font-size: .28rem;
  font-weight: bold;
  line-height: .32rem;
}
.question-content-option-wrapper {
  width: 100%;
  height: 2.2rem;
}
.question-content-option {
  width: 4.2rem;
  min-height: .34rem;
  margin-left: .1rem;
  margin-bottom: .1rem;
  border-radius: .175rem;
  color: #fff;
  padding-left: .15rem;
  position: relative;
}
.question-content-option-img {
  position: absolute;
  width: .32rem;
  height: .32rem;
  right: .1rem;
  top: 0;
}
.question-content-option-word-1 {
  font-size: .28rem;
  line-height: .34rem;
  display: block;
  width: 3.8rem;
}
.question-content-option-word-2 {
  // font-size: .16rem;
  line-height: .34rem;
  display: block;
  width: 3.8rem;
}
.question-content-checked {
  border: .01rem solid #30d6ff;
}
.question-content-unchecked {
  border: .01rem solid #fff;
}
// 按钮s
.question-content-btn {
  width: 2.6rem;
  height: .56rem;
  border: .02rem solid red;
  position: absolute;
  top: 4.94rem;
  left: 1.88rem;
  border-radius: .28rem;
}
.question-content-btn-word {
  line-height: .56rem;
  height: .56rem;
  color: #fff;
  font-weight: bold;
  font-size: .4rem;
  letter-spacing: .2rem;
  padding-left: .8rem;
}
/**
bottom
*/
.question-bottom {
  width: 6.4rem;
  height: 1.69rem;
  position: absolute;
  bottom: 0;
}
.question-bottom-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.question-bottom-bg {
  width: 100%;
  height: 100%;
}
.question-bottom-capsule-1 {
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: .4rem;
  left: 2.3rem;
}
.question-bottom-capsule-2 {
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: .4rem;
  left: 4rem;
}
/**
Modal样式
*/
.question-modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0rem;
  z-index: 8888;
}
.question-modal-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.question-modal-border {
  width: 5.6rem;
  min-height: 2.5rem;
  border: .02rem solid #fff;
  position: absolute;
  left: 50%;
  margin-left: -2.8rem;
  top: 3rem;
  background-color: rgba(0, 0, 0, .9);
  border-radius: .2rem;
}
.question-modal-wrapper {
  width: 100%;
  min-height: 2.5rem;
  position: relative;
}
.question-modal-content {
  padding-bottom: .65rem;
}
.question-modal-content-img {
  width: .8rem;
  height: .8rem;
  margin-left: 2.4rem;
  margin-top: .3rem;
  margin-bottom: .2rem;
}
.question-modal-content-word {
  text-align: center;
  color: #fff;
  font-size: .26rem;
}
.question-modal-bottom {
  z-index: 9999;
  height: .65rem;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.question-modal-btn {
  width: 1.7rem;
  height: .48rem;
  border: .02rem solid #ff9348;
  border-radius: .24rem;
  float: left;
  margin-left: .68rem;
  
}
.question-modal-btn-word {
  text-align: center;
  line-height: .48rem;
  height: .48rem;
  color: #fff;
  font-size: .26rem;
}
.question-modal-content-2 {
  width: 100%;
  position: absolute;
  top: .6rem;
  text-align: center;
  color: #fff;
  font-size: .26rem;
}
.question-modal-btn-2 {
  width: 1.7rem;
  height: .48rem;
  border: .02rem solid #ff9348;
  border-radius: .24rem;
  float: left;
  margin-left: 1.8rem;
}
</style>
