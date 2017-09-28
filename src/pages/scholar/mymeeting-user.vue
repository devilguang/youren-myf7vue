<style>
  .page > .subnavbar {
    top: 55px;
  }

  .list-block {
    margin: 0;
  }

  .listItemChild:last-child {
  }

  .firmActive {
    border-bottom: 2px solid #ffffff;
  }
</style>
<template>
  <f7-page class="Meeting ">
    <f7-navbar back-link="Back" title="约见" sliding></f7-navbar>
    <loading-bar v-if="loadingFlag"></loading-bar>
    <f7-subnavbar>
      <f7-buttons>
        <f7-button :class="{'firmActive':stayFlag}" @click="clickStay">待确认</f7-button>
        <f7-button :class="{'firmActive':sureFlag}" @click="clickSure">已确认</f7-button>
        <f7-button :class="{'firmActive':overFlag}" @click="clickOver">已结束</f7-button>
      </f7-buttons>
    </f7-subnavbar>
    <f7-tabs>
      <div class="page-content infinite-scroll" style="height:5.5rem;" v-show="stayFlag">


        <!--<f7-page-content >-->
        <f7-block-title class="color-blue" style="margin-top: 60px" v-show="myInteresting.length>0">
          <i class="fa fa-star"></i> 我感兴趣的
        </f7-block-title>
        <div v-if="noNumber&&noNumberOne" style="width: 100%;text-align: center;margin-top: 100px">暂无数据</div>
        <f7-list>
          <!--concatArr.length<=0-->
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
        <f7-block-title class="color-blue" style="padding-top: 0;margin-top: 0.6rem" v-show="beInterested.length>0">
          <i class="fa fa-heartbeat"></i> 对我感兴趣的
        </f7-block-title>
        <f7-list style="margin-bottom: 0.5rem" v-if="beInterested.length>0">
          <f7-list-item v-for="(info,index) in beInterested" :key="info.id" class="listItemChild"
                        v-if="beInterested.busCompany">
            <div class="info-content unit">
              <div class="flex-left" >
                <img class="info-midea" v-if="info.busCompany.companyLogo" :src="info.busCompany.companyLogo" alt=""
                     style="width: 80px; height:50px; margin-right: 10px;">
                <img class="info-midea" v-else :src="baseImg"
                     style="width: 80px; height:50px; margin-right: 10px;">
                <div class="">
                  <p class="info-title">{{info.busCompany.name}}</p>
                  <p class="info-misc">{{info.busCompany.contactName}}<span
                    style="display:inline-block; margin-left: 10px; font-size: smaller">{{info.busCompany.position}}</span>
                  </p>
                </div>
              </div>
              <p class="info-text" style="margin-top: .5em;">
                 {{'留言：'+info.message}}
              </p>
            </div>
            <div class="info-action flex-vertical flex-around color-red">
              <template v-if="info.isFlag">
                <f7-button color="red" fill round @click="refuse(index,info)">拒绝</f7-button>
                <f7-button color="blue" fill round @click="accept(index,info)">接受</f7-button>
              </template>
              <div v-if="!info.isFlag" style="font-size: 12px;">
                您已接受对方邀请，系统正在安排约会，请耐心等待
              </div>
            </div>
          </f7-list-item>
        </f7-list>

        <!--</f7-page-content>-->
      </div>
      <div class="page-content infinite-scroll" style="height: 5.5rem;overflow-y: hidden;" v-show="sureFlag">
        <f7-block-title class="color-blue" style="width:300px;margin: 0.7rem 0 0px 10px;padding: 0"
                        v-show="meetings.length>0">今天
        </f7-block-title>
        <div v-show="noNumber1" style="width: 100%;text-align: center;margin-top: 100px">暂无数据</div>
        <ul style="list-style: none;padding: 0;margin: 0">
          <li v-for="info in meetings" :key="info.busCompany.id"
              style="display: flex;border-bottom: 1px solid gainsboro;flex:1;margin:10px 0 0 20px;padding: 0;">
            <div>
              <img class="info-midea" src="/static/imgs/img-professor.jpg" alt=""
                   style="width: 80px; height:50px; margin-right: 10px;">
              <div class="info-title" style="width:120px">{{info.busCompany.name}}</div>
              <p class="info-misc" style="margin-top: 0px">{{info.busCompany.contactName}}
                <small>{{info.busCompany.position}}</small>
              </p>
            </div>
            <div class="info-content unit" style="margin-left: 30px">
              <p class="info-title color-blue">{{severType}}</p>
              <p class="info-misc has-icon-phone">{{info.busCompany.contactNumber}}</p>
              <p class="info-misc has-icon-time">{{info.busCompany.createDate}}
                <small style="margin-left: 10px;">{{info.busCompany.meetingDuration}}</small>
              </p>
              <p class="info-misc has-icon-address">{{info.address}}</p>
              <p class="info-misc has-icon-money">获取报酬 <span class="color-orange">{{info.estimateMoney}}</span> 元</p>
            </div>
          </li>
        </ul>
        <f7-block-title class="color-blue" v-show="later.length>0" style="margin: 0.3rem 0 0px 10px;padding: 0">之后
        </f7-block-title>
        <ul style="list-style: none;padding: 0;margin: 0">
          <li v-for="info in later" :key="info.id"
              style="display: flex;border-bottom: 1px solid gainsboro;margin-top: 10px;flex:1;margin:10px 0 0 20px;padding: 0">
            <div>
              <img class="info-midea" src="/static/imgs/img-professor.jpg"
                   style="width: 80px; height:50px; margin-right: 10px;">
              <div class="info-title" style="width: 120px;">{{info.busCompany.name}}</div>
              <p class="info-misc" style="margin-top: 0px">{{info.busCompany.contactName}}
                <small>{{info.busCompany.position}}</small>
              </p>
            </div>
            <div class="info-content unit" style="margin-left: 30px">
              <p class="info-title color-blue">{{severType1}}</p>
              <p class="info-misc has-icon-phone">{{info.busCompany.contactNumber}}</p>
              <p class="info-misc has-icon-time">{{info.busCompany.createDate}}
                <small style="margin-left: 10px;">{{info.busCompany.meetingDuration}}</small>
              </p>
              <p class="info-misc has-icon-address">{{info.address}}</p>
              <p class="info-misc has-icon-money">获取报酬 <span class="color-orange">{{info.estimateMoney}}</span> 元</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="page-content infinite-scroll" style="height: 5.5rem;" v-show="overFlag">
        <!--noNumber2-->
        <div v-if="finishedList.length<=0" style="width: 100%;text-align: center;margin-top: 100px">暂无数据</div>
        <f7-list v-if="finishedList.length>0" style="margin-top: 56px">
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
              <template v-if="info.judgementId ==null">
                <f7-button color="blue" fill round @click="goRatings(info)">去评价</f7-button>
              </template>
            </div>
          </f7-list-item>
          <div style="width: 100%;text-align: center;font-size:12px;">
            <p>提示: 报酬可<a href="/myaccount-user">我的账户进行</a>提现</p>
          </div>
        </f7-list>
      </div>
    </f7-tabs>

    <f7-popup :opened="popupRating">
      <f7-navbar title="星级评分" style="font-size: 0.8em;text-overflow: clip"><span
        style="margin-left: 58%;font-size: 0.8em;" @click="popupRating = false">关闭</span></f7-navbar>
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
    <div style="position: fixed;bottom:0;width: 100%;height:60px;z-index: 100;display:flex">
      <f7-button style="height:60px;line-height: 40px;
        color:#000;flex: 1;background:#ffffff"
                 href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x color-blue"></i></p>
        <p style="margin-top: -30px" class="color-blue">会议约见</p>
      </f7-button>
      <f7-button style="height: 60px;color:#000;flex:1;background:#ffffff"
                 href="/recommend-user">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff"
                 href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff"
                 href="/myaccount-user">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x" style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>
<script>
  import loadingBar from '../../components/loadingBar.vue';
  export default {
    name: 'mymeetingUser',
    components: {
      loadingBar
    },
    data() {
      return {
        stayFlag: true,
        sureFlag: false,
        overFlag: false,
        popupRating: false,
        loadingFlag: true,
        noNumberOne: false,
        baseImg: '../../../static/imgs/img-professor.jpg',
        infos: [],
        concatArr: [],
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
        noNumber: '',
        noNumber1: '',
        noNumber2: '',
        severType:'电话约谈',
        severType1:'电话约谈'

      }
    },
    methods: {
//        待确认的模块
      clickStay(){
        this.stayFlag = true;
        this.sureFlag = false;
        this.overFlag = false;
      },
//      已确认的模块
      clickSure(){
        this.stayFlag = false;
        this.sureFlag = true;
        this.overFlag = false;
        this.getTody();
        this.getAftertody()
      },
//      已结束的模块
      clickOver(){
        this.stayFlag = false;
        this.sureFlag = false;
        this.overFlag = true;
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
            let touserId = this.$store.userId;
            let meetime = this.$store.getNowFormatDate();
            this.$set(this.beInterested[index], 'isFlag', false);
            this.$http({
              method: 'post',
              url: '/v1/wechat/sendMsg',
              data: {
                touserId: touserId,
                type: 1,
                meetName: '电话约见',
                meetTime: meetime,
                place: value.address ? value.address : ' ',
                url: 'http://m.youren.ai/#/recommend-user'
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
        this.evaluation = [];
        this.$http.get('/v1/appoint/judge/' + info.judgementId).then((res) => {
          this.evaluation.push(res.data.appointrecord)
        })
      },
      goRatings(info){
        this.evaluation = [];
        this.popupRating = true;
        this.evaluation.push(info)
      },
      submitNext(){
        this.$http({
          method: 'post',
          url: '/v1/appoint/addJudge',
          data: {
            service: this.rating.service,//经纪人服务
            sincerity: this.rating.sincerity,//公司诚意
            precise: this.rating.accuracy,   //匹配准确
            appointrecordId: this.evaluation[0].id//约见订单id
          }
        }).then((res) => {
          this.popupRating = false;
          this.finishedList = [];
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
            });
            if (this.finishedList.length <= 0) {
              this.noNumber2 = true
            } else {
              this.noNumber2 = false
            }
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
          this.loadingFlag = false;
          this.myInteresting = [];
          res.data.data.data.forEach((value, index) => {
            this.myInteresting.push(value.item);
          });
          if (this.myInteresting.length <= 0) {
            this.noNumber = true
          } else {
            this.noNumber = false
          }
        });
//         在待确认列表中获取对我感兴趣的数据
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1, 'pageSize': 10,
            'orderType': 'desc', 'type': 3
          }
        }).then((res) => {
          this.loadingFlag = false;
          this.beInterested = [];
          res.data.data.data.forEach((value, index) => {
            if (typeof value.isFlag == 'undefined') {
              if (value.appointStatus == 3) {
                this.$set(value, 'isFlag', false)
              } else {
                this.$set(value, 'isFlag', true)
              }
            }
            this.beInterested.push(value);
          });
          if (this.beInterested.length <= 0) {
            this.noNumberOne = true
          } else {
            this.noNumberOne = false
          }
        });
      },
      // 已确认  今天的
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
          this.meetings = [];
          res.data.data.data.forEach((value, index) => {
            this.meetings.push(value)
          });
          if(this.meetings.service){
            if(this.meetings.service=='1'){
              this.severType = '电话约谈'
            }else if(this.meetings.service=='2'){
              this.severType = '线下约见'
            }
          }else{
            this.severType = '电话约谈'
          }
          if (this.meetings.length <= 0) {
            this.noNumber1 = true
          } else {
            this.noNumber1 = false
          }
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
          this.later = [];
          res.data.data.data.forEach((value, index) => {
            this.later.push(value)
          });
          if(this.later.service){
            if(this.later.service=='1'){
              this.severType1 = '电话约谈'
            }else if(this.later.service=='2'){
              this.severType1 = '线下约见'
            }
          }else{
            this.severType1 = '电话约谈'
          }
          if (this.later.length <= 0) {
            this.noNumber1 = true
          } else {
            this.noNumber1 = false
          }
        })
      },
      //已经结束的
      finished(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'orderType': 'desc',
//            'type': 3,
            'appointStatus': 2,
          }
        }).then((res) => {
          this.finishedList = [];
          res.data.data.data.forEach((value, index) => {
            this.finishedList.push(value)
          })
        })
      },
    },
    mounted(){
      this.getCorporation()
    },
  }
</script>
