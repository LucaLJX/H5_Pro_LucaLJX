<template>
	<div id="question-wrapper">
		<!-- 背景 -->
    <img class="question-wrapper-bg" src="./../../assets/images/question/bg.png" alt="">
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
	</div>
</template>

<script>
import $store from './../store/store.js';
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
              questionNo: '1-1',
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
              questionNo: '1-2',
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
              questionNo: '1-3',
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
              questionNo: '1-4',
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
              questionNo: '1-5',
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
              questionNo: '2-1',
              question: '云管理平台是一种管理各种云环境的整合性方案产品，其最小的功能范围应该包括自服务界面、创建系统镜像、监控和账单，以及基于策略的一定程度的负载优化等功能。业界云管平台英文缩写应该是哪一个？',
              options: [
                'A、MPM',
                'B、CMP',
                'C、MCP',
                'D、MPC'
              ],
              answer: 2
            },
            {
              questionNo: '2-2',
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
              questionNo: '2-3',
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
              questionNo: '2-4',
              question: '云管平台概念的误区是？',
              options: [
                'A、云管平台负责对云平台的管理职责',
                'B、OpenStack就是云管平台',
                'C、云管平台既可以管理云架构资源，也可以管理传统架构资源',
                'D、云管平台与云平台一样，市场都处于高速增长期'
              ],
              answer: 2
            },
            {
              questionNo: '2-5',
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
              questionNo: '3-1',
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
              questionNo: '3-2',
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
              questionNo: '3-3',
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
              questionNo: '3-4',
              question: '以下哪项是对虚拟机的最佳描述：',
              options: [
                'A、执行虚拟化软件测试程序的物理机',
                'B、通过软件实施的计算机，可以像物理机一样执行程序',
                'C、一种旨在提供网络故障切换和故障恢复功能的计算机工具',
                'D、一种软件计算机，其中封装了物理硬件'
              ],
              answer: 2
            },
            {
              questionNo: '3-5',
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
      ]
    };
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
      // 操作球
      _this.answeredCount ++;
      // 当前回答的题目的正确答案
      let rightAnswer = _this.questionMap[this.store.state.starIndex - 1].questions[_this.questionIndex].answer;
      // 给答题详情赋值
      _this.answeredDetail[_this.questionIndex].answer = _this.answer;
      if (_this.answer === rightAnswer) {
        _this.answeredDetail[_this.questionIndex].isRight = true;
      } else {
        _this.answeredDetail[_this.questionIndex].isRight = false;
      }
      // 换下一题
      if (_this.questionIndex === 4) {
        // 这里该跳转了
        console.log(_this.answeredDetail);
        return false;
      } else {
        _this.questionIndex ++;
      }
      // 清空当前选项
      _this.answer = null;
      _this.answerChecked.splice(0, _this.answerChecked.length);
      _this.clearOptionState();
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
  font-size: .2rem;
  font-weight: bold;
  line-height: .28rem;
}
.question-content-option-wrapper {
  width: 100%;
  height: 2rem;
}
.question-content-option {
  width: 4.2rem;
  min-height: .35rem;
  margin-left: .1rem;
  margin-bottom: .1rem;
  border-radius: .175rem;
  color: #fff;
  padding-left: .15rem;
  position: relative;
}
.question-content-option-word-1 {
  font-size: .12rem;
  line-height: .35rem;
  display: block;
  width: 3.8rem;
}
.question-content-option-word-2 {
  font-size: .12rem;
  line-height: .24rem;
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
</style>
