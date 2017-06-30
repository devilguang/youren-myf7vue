<style>
  .page>.subnavbar{
    top:0px;
    margin-top: 56px;
  }
  .list-block{
    margin: 120px 0;
  }
  .listItem:nth-child(1){
    margin-top: 120px;
  }
</style>
<template>
  <f7-page with-subnavbar no-page-content class="Meeting ">
      <f7-navbar back-link="Back" title="约见" sliding></f7-navbar>
      <f7-subnavbar sliding>
        <f7-buttons>
          <f7-button tab-link="#tab1" active>待确认</f7-button>
          <f7-button tab-link="#tab2" >已确认</f7-button>
          <f7-button tab-link="#tab3">已结束</f7-button>
        </f7-buttons>
      </f7-subnavbar>
    <f7-tabs swipeable sliding>

      <f7-page-content id="tab1" tab active style="margin-top: 120px">
        <f7-block-title class="color-blue">
          <i class="fa fa-star"></i> 我感兴趣的
        </f7-block-title>
        <f7-list>
          <f7-list-item v-for="info in myInteresting" :key="">
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
                <img class="info-midea" :src="info.busCompany.headImg" alt="" style="width: 80px; height:50px; margin-right: 10px;">
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
                <f7-button color="blue" fill round  @click="accept(index,info)">接受</f7-button>
              </template>
              <div  v-if="!info.isFlag" style="font-size: 12px;">
                您已接受对方邀请，系统正在安排约会，请耐心等待
              </div>
            </div>
          </f7-list-item>
        </f7-list>
      </f7-page-content>

      <f7-page-content id="tab2" tab>
        <f7-block-title class="color-blue" style="width:100%;margin-top: 100px;">今天</f7-block-title>
        <f7-list>
          <!--v-if="isToday(info.meetingDate)"-->
          <f7-list-item v-for="info in meetings"  :key="info.busCompany.id">
            <div class="info-content" style="width: max-content; max-width: 120px;">
              <img class="info-midea" :src="info.media" alt="" style="width: 80px; height:50px; margin-right: 10px;">
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
              <p class="info-misc has-icon-address">{{info.meetingAddress}}</p>
              <p class="info-misc has-icon-money">获取报酬 <span class="color-orange">{{info.estimateMoney}}</span> 元</p>
            </div>
          </f7-list-item>
        </f7-list>

        <f7-block-title class="color-blue" >之后</f7-block-title>
        <f7-list>
          <f7-list-item v-for="info in later"  :key="info.id">
            <div class="info-content" style="width: max-content; max-width: 120px;">
              <img class="info-midea" :src="info.media" alt="" style="width: 80px; height:50px; margin-right: 10px;">
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
              <p class="info-misc has-icon-address">{{info.meetingAddress}}</p>
              <p class="info-misc has-icon-money">获取报酬 <span class="color-orange">{{info.estimateMoney}}</span> 元</p>
            </div>
          </f7-list-item>
        </f7-list>
      </f7-page-content>

      <f7-page-content id="tab3" tab >
        <f7-list>
          <!--v-if="isBeforeToday(info.meetingDate)"-->
          <f7-list-item v-for="(info,index) in finishedList"  :key="info.busCompany.id" class="listItem">
            <div class="info-content" style="width: max-content; max-width: 120px;">
              <img class="info-midea" src="" alt="" style="width: 80px; height:50px; margin-right: 10px;">
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
              <template v-if="hasRating">
                综合评分
                <StarRating class="unit" v-model="rating.composite" :star-size="15" :increment="1" :padding="3"
                            :show-rating="false"></StarRating>
              </template>
              <template v-else>
                <f7-button color="blue" fill round @click="ratings(index)">去评价</f7-button>
              </template>
            </div>
          </f7-list-item>
        </f7-list>
      </f7-page-content>
    </f7-tabs>

    <f7-popup :opened="popupRating">
      <f7-navbar title="星级评分"></f7-navbar>
      <div  v-for="value in evaluation" :key="value.busCompany.id">
            <div class="flex-left flex-middle" style="margin: 5px;">
              <img class="info-midea" src="" alt="" style="width: 80px; height:80px; margin-right: 10px;">
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
              <div class="flex-left flex-top">
                <div class="color-gray unit-1-4">匹配准确：</div>
                <StarRating class="unit" v-model="rating.accuracy" :star-size="22" :increment="1" :padding="10"
                            :show-rating="false"></StarRating>
              </div>
              <div class="flex-left flex-top">
                <div class="color-gray unit-1-4">企业诚意：</div>
                <StarRating class="unit" v-model="rating.sincerity" :star-size="22" :increment="1" :padding="10"
                            :show-rating="false"></StarRating>
              </div>
              <div class="flex-left flex-top">
                <div class="color-gray unit-1-4">经纪人服务：</div>
                <StarRating class="unit" v-model="rating.service" :star-size="22" :increment="1" :padding="10"
                            :show-rating="false"></StarRating>
              </div>
              <div class="flex-left flex-top">
                <div class="color-gray unit-1-4">综合评分：</div>
                <StarRating class="unit" v-model="rating.composite" :star-size="22" :increment="1" :padding="10"
                            :show-rating="false"></StarRating>
              </div>
            </f7-block>
            <f7-block >
              <f7-button round fill @click="popupRating = false">提交评价</f7-button>
            </f7-block>
          </div>
    </f7-popup>
    <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;height:60px;z-index: 100;display:flex" >
      <f7-button  style="height:60px;line-height: 40px;
        color:#000;flex: 1"
                  href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x color-blue" ></i></p>
        <p style="margin-top: -30px" class="color-blue">会议约见</p>
      </f7-button>
      <f7-button  style="height: 60px;color:#000;flex:1"
                  href="/recommend-user">
        <p  style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p  style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button  style="height:60px;color:#000;flex:1"
                  href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x "style="color:#999;"></i></p>
        <p  style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button  style="height:60px;color:#000;flex:1"
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
        popupRating: false,
        infos: [],
        myInteresting: [],
        beInterested: [ ],
        hasRating: false,
        rating: {
              accuracy: 0, // 准确度
              sincerity: 0, // 诚意
              service: 0, // 服务
              composite: 0
            },
        edit: false,
        meetings: [
//          {
//            id: 1,
//            title: '微通道换热器应用于制冷系统（干式）',
//            number: 'N128745613',
//            step: '研发',
//            area: '北京',
//            money: '50万',
//            time: '2017年5月21日 17:30 发送',
//            keywords: ['机械', '涡轮', '建模'],
//            desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
//            corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
//            media: '/static/img/corp1.jpg',
//            stepCode: '待确认',
//            stepMessage: '您已接受对方邀请，系统正在安排约见，请耐心等待',
//
//            message: '对您的技术“可靠可坐的婴儿椅” 很感兴趣，希望跟您电话约谈。',
//            customerUnit: '武汉船舶研究院',
//            customerName: '张大大',
//            customerTitle: '部门负责人',
//            meetingDate: '2017-06-09 12:30:00',
//            meetingDuration: '会议30分钟',
//            meetingType: '电话会议',
//            meetingAddress: '',
//            customerPhone: '1357891254',
//            payment: 0,
//            edit: false,
//            hasRating: false,
//            rating: {
//              accuracy: 0, // 准确度
//              sincerity: 0, // 诚意
//              service: 0, // 服务
//              composite: 0
//            },
//          },
//
        ],
        later:[ ],
        finishedList:[ ],
        evaluation:[],
        isFlag:true,
      }
    },
    methods: {
      accept(index,value){
        this.$http.get('/v1/appoint/status/?id='+value.id,{params:{
          status:3
        }}).then((res)=>{
            if(res.data.success){
                this.$set(this.beInterested[index],'isFlag',false)

            }else{
                this.$f7.alert('错误',res.data.message)
            }
        })
      },
//      点击拒绝
      refuse(index,info){
        this.$http.get('/v1/appoint/status/?id='+info.id,{params:{
          status:2
        }}).then((res)=>{
          if(res.data.success){
            this.beInterested.splice(index,1)
          }else{
            this.$f7.alert('错误',res.data.message)
          }
        })
      },
      formateDate (date, fmt = "M月D日dddd H:mm"){
        return moment(date).format(fmt)
      },
      isToday(date){
        return moment(date).isSame(new Date(), 'day')
      },
      isAfterToday(date){
        return moment(date).isAfter(new Date(), 'day')
      },
      isBeforeToday(date){
        return moment(date).isBefore(new Date(), 'day')
      },
      ratings(index) {
        this.rating.accuracy = 0
        this.rating.sincerity = 0
        this.rating.service = 0
        this.rating.composite = 0
        this.evaluation =[]
        this.evaluation.push(this.finishedList[index])
        this.popupRating = true;
      },
//      在待确认列表中获取我感兴趣的数据
      getCorporation(){
            this.$http.get( '/v1/appoint/list',{ params:{'pageIndex':1,'pageSize':10,
             'orderType':'desc'}}).then((res)=>{
              this.myInteresting =[]
              res.data.data.data.forEach((value,index)=> {
                this.myInteresting.push(value.item)
              })
            })
      },
//       在待确认列表中获取对我感兴趣的数据
      getInterest(){
        this.$http.get( '/v1/appoint/list',{ params:{'pageIndex':1,'pageSize':10,
          'orderType':'desc','type':3}}).then((res)=>{
          this.beInterested =[]
          res.data.data.data.forEach((value,index)=> {
            if( typeof value.isFlag =='undefined'){
                if(value.appointStatus ==3){
                  this.$set(value,'isFlag',false)
                }else{
                  this.$set(value,'isFlag',true)
                }
            }
            this.beInterested.push(value)
          })
        })
      },
//      已确认  今天的
      getTody(){
        this.$http.get( '/v1/appoint/list',{ params:{
          'pageIndex':1,
          'pageSize':10,
          'orderType':'desc',
          'type':3,
          'appointStatus':1,
          'appointTime ':2
        }}).then((res)=>{
          this.meetings =[]
          res.data.data.data.forEach((value,index)=> {
            this.meetings.push(value)
          })
        })
      },
//      已确认  之后
      getAftertody(){
        this.$http.get( '/v1/appoint/list',{ params:{
          'pageIndex':1,
          'pageSize':10,
          'orderType':'desc',
          'type':3,
          'appointStatus':1,
          'appointTime ':3
        }}).then((res)=>{
          this.later = []
          res.data.data.data.forEach((value,index)=> {
            this.later.push(value)
          })
        })
      },
      //已经结束的
      finished(){
        this.$http.get( '/v1/appoint/list',{ params:{
          'pageIndex':1,
          'pageSize':10,
          'orderType':'desc',
          'type':3,
          'appointStatus':2,
        }}).then((res)=>{
            this.finishedList = []
            res.data.data.data.forEach((value,index)=> {
            this.finishedList.push(value)
          })
        })
      }
    },
    mounted(){
      this.getCorporation()
      this.getInterest()
      this.getTody()
      this.getAftertody()
      this.finished()
    },
  }
</script>
