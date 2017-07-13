<style>
  .page > .subnavbar {
    top: 0px;
  }

  .list-block {
    margin: 120px 0;
  }

  .listItem:nth-child(1) {
    margin-top: 120px;
  }

  .firmActive {
    border-bottom: 2px solid #ffffff;
  }
</style>
<template>
  <f7-page class="Meeting ">
    <f7-navbar back-link="Back" title="约见" sliding></f7-navbar>
    <f7-subnavbar>
      <f7-buttons>

        <f7-button :class="{'firmActive':stayFlag}" @click="clickStay">待确认</f7-button>
        <f7-button :class="{'firmActive':sureFlag}" @click="clickSure">已确认</f7-button>
        <f7-button :class="{'firmActive':overFlag}" @click="clickOver">已结束</f7-button>
      </f7-buttons>
    </f7-subnavbar>
    <f7-tabs>

      <f7-page-content v-show="stayFlag" style="margin-top: 120px">
        <f7-block-title class="color-blue">
          <i class="fa fa-star"></i> 我感兴趣的
        </f7-block-title>
        <f7-list>
          <!--:key="info.id"-->
          <f7-list-item v-for="info in myInteresting" :key="info.id">
            <div class="info-content unit">
              <p class="info-title color-blue" style="margin-bottom: 10px">{{info.title}}</p>
              <p class="info-text" style="line-height: 20px">{{info.demandInfo}}</p>
              <p class="info-time" style="margin-top: 10px">{{info.createDate}}&ensp;&ensp;发送</p>
            </div>
            <div class="info-action flex-vertical flex-middle flex-center color-red">
              <div style="font-size: 12px;" stepMessage="系统正在安排约会，请耐心等待">系统正在安排约会，请耐心等待</div>
            </div>
          </f7-list-item>
        </f7-list>
        <f7-block-title class="color-blue">
          <i class="fa fa-heartbeat"></i> 对我感兴趣的
        </f7-block-title>
        <f7-list style="margin-bottom: 250px">
          <f7-list-item v-for="(info,index) in beInterested" :key="info.busCompany.id">
            <div class="info-content unit">
              <div class="flex-left">
                <!--:src="info.busCompany.headImg"-->
                <img class="info-midea" src="/static/imgs/img-professor.jpg" alt=""
                     style="width: 80px; height:50px; margin-right: 10px;">
                <div class="">
                  <p class="info-title">{{info.busCompany.name}}</p>
                  <p class="info-misc">{{info.busCompany.contactName}}<span
                    style="display:inline-block; margin-left: 10px; font-size: smaller">{{info.busCompany.position}}</span>
                  </p>
                </div>
              </div>
              <p class="info-text" style="margin-top: .5em;">
                留言： {{info.busCompany.message}}
              </p>
            </div>
            <div class="info-action flex-vertical flex-around color-red">
              <template v-if="info.isFlag">
                <f7-button color="red" fill round @click="refuse(index,info)">拒绝</f7-button>
                <!--accept(index)-->
                <f7-button color="blue" fill round @click="accept(index,info)">接受</f7-button>
              </template>
              <div v-if="!info.isFlag" style="font-size: 12px;">
                您已接受对方邀请，系统正在安排约会，请耐心等待
              </div>
            </div>
          </f7-list-item>
        </f7-list>
      </f7-page-content>

      <f7-page-content v-show="sureFlag">
        <f7-block-title class="color-blue" style="width:100%;margin-top: 100px;">今天</f7-block-title>
        <f7-list>
          <!--v-if="isToday(info.meetingDate)"-->
          <f7-list-item v-for="info in meetings" :key="info.busCompany.id">
            <div class="info-content" style="width: max-content; max-width: 120px;">
              <img class="info-midea" src="/static/imgs/img-professor.jpg" alt=""
                   style="width: 80px; height:50px; margin-right: 10px;">
              <p class="info-title">{{info.busCompany.name}}</p>
              <p class="info-misc">{{info.busCompany.contactName}}
                <small>{{info.busCompany.position}}</small>
              </p>
            </div>
            <div class="info-content unit">
              <p class="info-title color-blue">电话约见</p>
              <p class="info-misc has-icon-phone">{{info.busCompany.contactNumber}}</p>
              <p class="info-misc has-icon-time">{{info.busCompany.createDate}}
                <small style="margin-left: 10px;">{{info.busCompany.meetingDuration}}</small>
              </p>
              <p class="info-misc has-icon-address">{{info.address}}</p>
              <p class="info-misc has-icon-money">获取报酬 <span class="color-orange">{{info.estimateMoney}}</span> 元</p>
            </div>
          </f7-list-item>
        </f7-list>

        <f7-block-title class="color-blue">之后</f7-block-title>
        <f7-list>
          <f7-list-item v-for="info in later" :key="info.id">
            <div class="info-content" style="width: max-content; max-width: 120px;">
              <img class="info-midea" src="/static/imgs/img-professor.jpg"
                   style="width: 80px; height:50px; margin-right: 10px;">
              <p class="info-title">{{info.busCompany.name}}</p>
              <p class="info-misc">{{info.busCompany.contactName}}
                <small>{{info.busCompany.position}}</small>
              </p>
            </div>
            <div class="info-content unit">
              <p class="info-title color-blue">电话约见</p>
              <p class="info-misc has-icon-phone">{{info.busCompany.contactNumber}}</p>
              <p class="info-misc has-icon-time">{{info.busCompany.createDate}}
                <small style="margin-left: 10px;">{{info.busCompany.meetingDuration}}</small>
              </p>
              <p class="info-misc has-icon-address">{{info.address}}</p>
              <p class="info-misc has-icon-money">获取报酬 <span class="color-orange">{{info.estimateMoney}}</span> 元</p>
            </div>
          </f7-list-item>
        </f7-list>
      </f7-page-content>

      <f7-page-content v-show="overFlag">
        <f7-list>
          <!--v-if="isBeforeToday(info.meetingDate)"-->
          <f7-list-item v-for="(info,index) in finishedList" :key="info.busCompany.id" class="listItem">
            <div class="info-content" style="width: max-content; max-width: 120px;">
              <img class="info-midea" src="/static/imgs/img-professor.jpg"
                   style="width: 80px; height:50px; margin-right: 10px;">
              <p class="info-title">{{info.busCompany.name}}</p>
            </div>
            <div class="info-content unit">
              <p class="info-title">{{info.busCompany.contactName}}
                <small>{{info.busCompany.position}}</small>
              </p>
              <p class="info-misc has-icon-time">{{info.busCompany.createDate}}</p>
              <p class="info-misc has-icon-money">
                获取报酬 <span class="color-orange">{{info.estimateMoney}}</span> 元
                <span class="color-red">(未结算)</span>
              </p>
            </div>
            <div class="info-action" style="width: 80px;">
              <template v-if="info.judgementId !==null">
                <f7-button color="blue" fill round @click="ratings(info)">查看评价</f7-button>
              </template>
              <template  v-if="info.judgementId ==null">
                <f7-button color="blue" fill round @click="goRatings(info)">去评价</f7-button>
              </template>
            </div>
          </f7-list-item>
        </f7-list>
        <div style="width: 100%;text-align: center;font-size:12px;margin-bottom: 200px;margin-top: -80px">
          <p >提示: 报酬可<a href="/myaccount-user">我的账户进行</a>提现</p>
        </div>
      </f7-page-content>
    </f7-tabs>

    <f7-popup :opened="popupRating">
      <f7-navbar title="星级评分"> <span style="margin-left: 60%" @click="popupRating = false">关闭</span></f7-navbar>
      <div v-for="value in evaluation" :key="value.busCompany.id">
        <div class="flex-left flex-middle" style="margin: 5px;">
          <img class="info-midea" src="/static/imgs/img-professor.jpg"
               style="width: 80px; height:80px; margin-right: 10px;">
          <div class="info-content unit">
            <p class="info-title" style="margin-bottom: .2em;">{{value.busCompany.name}}</p>
            <p class="info-misc" style="margin-bottom: .2em;">{{value.busCompany.contactName}}
              <small>{{value.busCompany.position}}</small>
            </p>
            <p class="info-misc" style="margin-bottom: .2em;">报酬金额 <span
              class="color-orange">{{value.estimateMoney}}</span> 元</p>
          </div>
          <div class="info-content">
            <p class="info-misc">{{value.createDate}}</p>
          </div>
        </div>

        <f7-block>
          <div class="info-title">约见评价</div>
          <div class="flex-left flex-top" style="margin-top: 20px">
            <div class="color-gray unit-1-3">匹配准确：</div>
            <StarRating class="unit" v-model="rating.accuracy" :star-size="22" :increment="1" :padding="10"
                        :show-rating="false"></StarRating>
          </div>
          <div class="flex-left flex-top">
            <div class="color-gray unit-1-3">企业诚意：</div>
            <StarRating class="unit" v-model="rating.sincerity" :star-size="22" :increment="1" :padding="10"
                        :show-rating="false"></StarRating>
          </div>
          <div class="flex-left flex-top">
            <div class="color-gray unit-1-3">经纪人服务：</div>
            <StarRating class="unit" v-model="rating.service" :star-size="22" :increment="1" :padding="10"
                        :show-rating="false"></StarRating>
          </div>
        </f7-block>
        <f7-block>
          <f7-button round fill @click="submitNext(value) ">提交评价</f7-button>
        </f7-block>
      </div>
    </f7-popup>
    <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;height:60px;z-index: 100;display:flex">
      <f7-button style="height:60px;line-height: 40px;
        color:#000;flex: 1"
                 href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x color-blue"></i></p>
        <p style="margin-top: -30px" class="color-blue">会议约见</p>
      </f7-button>
      <f7-button style="height: 60px;color:#000;flex:1"
                 href="/recommend-user">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1"
                 href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1"
                 href="/myaccount-user">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x" style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        stayFlag: false,
        sureFlag: true,
        overFlag: false,
        popupRating: false,
        infos: [],
        myInteresting: [],
        beInterested: [],
        hasRating: false,
        rating: {
          accuracy: 0,      // 准确度
          sincerity: 0,     // 诚意
          service: 0,       // 服务
//          composite: 0     //综合评分
        },
        edit: false,
        meetings: [],
        later: [],
        finishedList: [],
        evaluation: [],
        isFlag: true,
      }
    },
    methods: {
//        待确认的模块
      clickStay(){
        this.stayFlag = true
        this.sureFlag = false
        this.overFlag = false
        this.getCorporation()
        this.getInterest()
      },
//      已确认的模块
      clickSure(){
        this.stayFlag = false
        this.sureFlag = true
        this.overFlag = false
      },
//      已结束的模块
      clickOver(){
        this.stayFlag = false
        this.sureFlag = false
        this.overFlag = true
        this.finished()
      },

//      点击接受发送模板消息
      accept(index, value){
        this.$http.get('/v1/appoint/status/?id=' + value.id, {
          params: {
            status: 3
          }
        }).then((res) => {
          if (res.data.success) {
            let touserId = this.$store.userId
            let meetime = this.$store.getNowFormatDate()
            this.$set(this.beInterested[index], 'isFlag', false)
            this.$http({
              method: 'post',
              url: '/v1/wechat/sendMsg',
              data: {
                touserId: touserId,
                type: 1,
                meetName: '电话约见',
                meetTime: meetime,
                place: this.beInterested.address,
                url: '/recommend-user'
              }
            })
          } else {
            this.$f7.alert('错误', res.data.message)
          }
        })
      },
//      点击拒绝
      refuse(index, info){
        this.$http.get('/v1/appoint/status/?id=' + info.id, {
          params: {
            status: 2
          }
        }).then((res) => {
          if (res.data.success) {
            this.beInterested.splice(index, 1)
          } else {
            this.$f7.alert('错误', res.data.message)
          }
        })
      },
      ratings(info) {
        this.popupRating = true;
        this.evaluation = []
        this.$http.get('/v1/appoint/judge/'+info.judgementId).then((res)=>{
              this.evaluation.push(res.data.appointrecord)
        })
      },
      goRatings(info){
        this.evaluation = []
        this.popupRating = true;
        this.evaluation.push(info)
      },
      submitNext(){
        this.$http({
          method:'post',
          url:'/v1/appoint/addJudge',
          data:{
            service:this.rating.service,//经纪人服务
            sincerity:this.rating.sincerity,//公司诚意
            precise:this.rating.accuracy,   //匹配准确
            appointrecordId:this.evaluation[0].id//约见订单id
          }
        }).then((res)=>{
          this.popupRating = false
          this.finishedList = []
          this.$http.get('/v1/appoint/list', {
            params: {
              'pageIndex': 1,
              'pageSize': 10,
              'orderType': 'desc',
              'type': 3,
              'appointStatus': 2,
            }
          }).then((res) => {
            res.data.data.data.forEach((value, index) => {
              this.finishedList.push(value)
            })
          })
        })
      },
//      在待确认列表中获取我感兴趣的数据
      getCorporation(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1, 'pageSize': 10,
            'orderType': 'desc'
          }
        }).then((res) => {
          this.myInteresting = []
          res.data.data.data.forEach((value, index) => {
            this.myInteresting.push(value.item)
          })
        })
      },
//       在待确认列表中获取对我感兴趣的数据
      getInterest(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1, 'pageSize': 10,
            'orderType': 'desc', 'type': 3
          }
        }).then((res) => {
          this.beInterested = []
          res.data.data.data.forEach((value, index) => {
            if (typeof value.isFlag == 'undefined') {
              if (value.appointStatus == 3) {
                this.$set(value, 'isFlag', false)
              } else {
                this.$set(value, 'isFlag', true)
              }
            }
            this.beInterested.push(value)

          })

        })
      },
//      已确认  今天的
      getTody(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'orderType': 'desc',
            'type': 3,
            'appointStatus': 1,
            'appointTime ': 2
          }
        }).then((res) => {
          this.meetings = []
          res.data.data.data.forEach((value, index) => {
            this.meetings.push(value)
          })
        })
      },
//      已确认  之后
      getAftertody(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'orderType': 'desc',
            'type': 3,
            'appointStatus': 1,
            'appointTime ': 3
          }
        }).then((res) => {
          this.later = []
          res.data.data.data.forEach((value, index) => {
            this.later.push(value)
          })
        })
      },
      //已经结束的
      finished(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'orderType': 'desc',
            'type': 3,
            'appointStatus': 2,
          }
        }).then((res) => {
          this.finishedList = []
          res.data.data.data.forEach((value, index) => {
            this.finishedList.push(value)

          })
        })
      },
    },
    mounted(){
      this.getTody()
      this.getAftertody()
    },
  }
</script>
