<style>
  .page > .subnavbar {
    top: 0;
  }

  .listItem:nth-child(1) {
    margin-top: 120px;
  }

  .list-block {
    margin-bottom: 60px;
  }

  .animated {
    transform: translate3d(-80px, 0px, 0px);
  }

  .list-block ul ul {
    padding-left: 0;
  }

  .firmActive {
    border-bottom: 2px solid #ffffff;
  }
</style>
<template>
  <f7-page class="Meeting" name="mymeeting-corp">
    <f7-navbar back-link="Back" title="约见" sliding></f7-navbar>
    <f7-subnavbar>
      <f7-button :class="{'firmActive':paymentFlag}" @click="payment()">待付款</f7-button>
      <span style="display: inline-block;margin-top: 5px;color:#ffffff">|</span>
      <f7-button :class="{'firmActive':confirmedFlag}" @click="notarize">已确认</f7-button>
      <span style="display: inline-block;margin-top: 5px;color:#ffffff">|</span>
      <f7-button :class="{'firmActive':hasEndedFlag}" @click="hasEnded">已结束</f7-button>
    </f7-subnavbar>

    <f7-tabs>
      <f7-page-content v-show="paymentFlag">
        <f7-block-title style="display: flex;margin-top: 100px">
          <span style="flex: 0 0 50%" class="color-blue">需求沟通</span>
          <span style="flex: 0 0 50%;margin-left: 40%" v-if="seleFlag" @click="deleteListAgain1()">完成</span>
          <span style="flex: 0 0 50%;margin-left: 40%" v-if="changeFlag" @click="deleteList1() ">编辑</span>
        </f7-block-title>
        <!--表单类型用 form 否则用 div -->
        <div class="list-block">
          <ul style="margin-bottom: 100px">
            <li class="swipeout transitioning" :class="{'swipeout-opened':seleFlag}"
                v-for="(info,index) in myInteresting" :key="info.item.id">
              <!--滑动包装-->
              <div class="swipeout-content" :class="{'animated':seleFlag}" style="">
                <!--checkbox包装-->
                <label class="item-content label-checkbox ">
                  <f7-list form>
                    <f7-list-item checkbox name="my-checkbox" :checked="info.check"
                                  @change.native="selectedProduct($event, info)" value="0"></f7-list-item>
                  </f7-list>
                  <div class="item-inner">
                    <div class="info-content unit">
                      <div class="info-title" style="font-size: 14px">
                        {{info.item.name}}  {{info.item.college}}  {{info.item.professionalTitle}}
                      </div>
                      <p class="info-misc">方向： {{info.item.keyWord}}</p>
                      <p class="info-misc">行业： {{info.item.fieldOb}}</p>
                      <p class="info-misc">接洽需求： {{}}</p>
                      <p class="color-red" style="text-align: right;">￥ {{info.estimateMoney}}</p>
                    </div>
                  </div>
                </label>
              </div>
              <f7-swipeout-actions :class="{'swipeout-actions-opened':seleFlag}">
                <f7-swipeout-button :class="{'animated':seleFlag}" style="background: red;
                border-bottom: 1px solid #ffffff" @click="removeList1(index,info)">删除
                </f7-swipeout-button>
              </f7-swipeout-actions>
            </li>
          </ul>

        </div>

        <f7-block-title style="display: flex">
          <span style="flex: 0 0 50%" class="color-blue">专家约见</span>
          <span style="flex: 0 0 50%;margin-left: 40%" v-if="flag" @click="deleteListAgain()">完成</span>
          <span style="flex: 0 0 50%;margin-left: 40%" v-if="dataflag" @click="deleteList() ">编辑</span>
        </f7-block-title>
        <!--表单类型用 form 否则用 div -->
        <div class="list-block">
          <ul style="margin-bottom: 100px">
            <li class="swipeout transitioning" :class="{'swipeout-opened':flag}"
                v-for="(info,$index) in demands" :key="info.item.id">
              <!--滑动包装-->
              <div class="swipeout-content" :class="{'animated':flag}">
                <!--checkbox包装-->
                <label class="item-content label-checkbox" style="padding-left: 0">
                  <f7-list form>
                    <f7-list-item checkbox name="my-checkbox" :checked="info.check"
                                  @change.native="selectedProduct($event, info)" value="0"></f7-list-item>
                  </f7-list>
                  <div class="item-inner">
                    <div class="info-content unit">
                      <div class="info-title" style="font-size: 14px">
                        {{info.item.name}}  {{info.item.college}}  {{info.item.professionalTitle}}
                      </div>
                      <p class="info-misc">方向： {{info.item.keyWord}}</p>
                      <p class="info-misc">行业： {{info.item.fieldOb}}</p>
                      <p class="color-red" style="text-align: right;">{{'￥' + info.estimateMoney}}</p>
                    </div>
                  </div>
                </label>
              </div>
              <f7-swipeout-actions :class="{'swipeout-actions-opened':flag}">
                <f7-swipeout-button :class="{'animated':flag}"
                                    style="background: red;border-bottom: 1px solid #ffffff"
                                    @click="removeList($index,info)">删除
                </f7-swipeout-button>
              </f7-swipeout-actions>
            </li>
          </ul>
          <ul
            style="display: flex;width: 100%;height: 60px;line-height: 60px;bottom:50px;background:#f3f3f4;position: relative">
            <li style="flex:1;text-align: center;margin-bottom: 200px">
              <label class="item-content label-checkbox " style="padding-left:0px;height: 60px;">
                <f7-list form style="margin-top: 70px">
                  <f7-list-item checkbox name="my-checkbox" :checked="isAllChecked"
                                @change.natvie="selectAll"></f7-list-item>
                </f7-list>
                <span style="position: absolute;left:50px">全&ensp;选</span>
              </label>
            </li>
            <li style="flex:1;text-align: center">合&ensp;计<span style="color:red">￥{{totalMoney}}</span></li>
            <li style="flex:1;text-align: center;color:#ffffff;background:#3399ff;" @click="paymentMoney">结&ensp;算 ( {{totalMoney}} )</li>
          </ul>
        </div>
      </f7-page-content>

      <!--已确认-->
      <f7-page-content v-show="confirmedFlag">
        <f7-block-title class="color-blue" style="margin-top: 120px">今天</f7-block-title>
        <f7-list>
          <!-- v-if="isToday(info.meetingDate)"-->
          <f7-list-item v-for="info in beInterested" :key="info.item.id">
            <div class="info-content" style="width: max-content; max-width: 120px; text-align: center;">
              <img class="info-midea" :src="info.item.headImg" alt="" style="width: 50px; height:50px;">
              <div class="info-title">{{info.item.name}}</div>
              <div class="info-misc">{{info.item.college}}</div>
            </div>
            <div class="info-content unit">
              <p class="info-title color-blue">电话会议</p>
              <p class="info-misc has-icon-phone">{{info.item.phoneNum}}</p>
              <p class="info-misc has-icon-time">{{info.item.createTime}}
                <small style="margin-left: 10px;"></small>
                //会议时间
              </p>
              <p class="info-misc has-icon-address"></p>
            </div>
          </f7-list-item>
        </f7-list>

        <f7-block-title class="color-blue">之后</f7-block-title>
        <f7-list>
          <!--v-if="isAfterToday(info.meetingDate)"-->
          <f7-list-item v-for="info in aftertodayList" :key="info.item.id">
            <div class="info-content" style="width: max-content; max-width: 120px; text-align: center;">
              <img class="info-midea" :src="info.item.headImg" alt="" style="width: 50px; height:50px;">
              <div class="info-title">{{info.item.name}}</div>
              <div class="info-misc">{{info.item.college}}</div>
            </div>
            <div class="info-content unit">
              <p class="info-title color-blue">电话会议</p>
              <p class="info-misc has-icon-phone">{{info.item.phoneNum}}</p>
              <p class="info-misc has-icon-time">{{info.item.createTime}}
                <small style="margin-left: 10px;"></small>
              </p>
              <p class="info-misc has-icon-address"></p>
            </div>
          </f7-list-item>
        </f7-list>
      </f7-page-content>

      <!--已结束的-->
      <f7-page-content v-show="hasEndedFlag">
        <f7-list>
          <f7-list-item class="listItem" v-for="(info,index) in meetings" :key="info.item.id">
            <div class="info-content" style="width: max-content; max-width: 120px; text-align: center;">
              <img class="info-midea" :src="info.item.headImg" alt=""
                   style="width: 50px; height:50px; margin-right: 10px; border-radius: 50%;">
              <p class="info-title">{{info.item.name}}</p>
            </div>
            <div class="info-content unit">
              <p class="info-title">{{info.item.college}}</p>
              <p class="info-misc has-icon-time">{{info.item.createTime}}</p>
              <p class="info-misc has-icon-money"><span class="color-orange">获取报酬{{info.estimateMoney}}</span> 元</p>
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
      </f7-page-content>
    </f7-tabs>

    <f7-popup :opened="popupRating">
      <f7-navbar title="星级评分"> <span style="margin-left: 60%" @click="popupRating = false">关闭</span></f7-navbar>
      <!--item.busCompany.id-->
      <div v-for="(value,index) in evaluation" :key="value.item.id">
        <div class="flex-left flex-middle" style="margin: 5px;">
          <img class="info-midea" :src="value.item.headImg" alt=""
               style="width: 80px; height:80px; margin-right: 10px;">
          <div class="info-content unit">
            <p class="info-title" style="margin-bottom: .2em;">{{value.item.college}}</p>
            <p class="info-misc" style="margin-bottom: .2em;">{{value.item.name}}
              <small>{{value.item.professionalTitle}}</small>
            </p>
            <p class="info-misc" style="margin-bottom: .2em;">报酬金额 <span
              class="color-orange">{{value.estimateMoney}}</span> 元</p>
          </div>
          <div class="info-content">
            <p class="info-misc">{{value.item.createTime}}</p>
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
            <div class="color-gray unit-1-4">专家态度：</div>
            <StarRating class="unit" v-model="rating.sincerity" :star-size="22" :increment="1" :padding="10"
                        :show-rating="false"></StarRating>
          </div>
          <div class="flex-left flex-top">
            <div class="color-gray unit-1-4">经纪人服务：</div>
            <StarRating class="unit" v-model="rating.service" :star-size="22" :increment="1" :padding="10"
                        :show-rating="false"></StarRating>
          </div>
        </f7-block>
        <f7-block>
          <f7-button round fill @click=" submitNext(value)">提交评价</f7-button>
        </f7-block>
      </div>
    </f7-popup>
    <div style="display: flex;position: fixed;bottom:0;background:#ffffff;width: 100%;height:60px;z-index:10000;">
      <f7-button style="flex:1;height:60px;color:#000;"
                 @click="$router.load({url:'/mymeeting-corp'})" data-ignore-cache="false">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x color-blue"></i></p>
        <p style="margin-top: -25px" class="color-blue">会议约见</p>
      </f7-button>
      <f7-button style="flex:1;height: 60px;color:#000;"
                 @click="$router.load({url:'/recommend-corp'})" data-ignore-cache="false">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>
      </f7-button>
      <f7-button style="flex:1;height:60px;color:#000;"
                 @click="$router.load({url:'/myhome-corp'})" data-ignore-cache="false">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button style="flex:1;height:60px;color:#000;"
                 @click="$router.load({url:'/myaccount-corp'})" data-ignore-cache="false">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x " style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>
<script>

  export default {
    name: 'mymeeting-corp',
    components: {},
    data() {
      return {
        paymentFlag: false,
        confirmedFlag: true,
        hasEndedFlag: false,
        totalMoney: 0,
        popupRating: false,
        selection: [],
        infos: [],
        myInteresting: [],
        beInterested: [],
        bus: {},
        chackAllFlag: false,
        demands: [],
        aftertodayList: [],
        meetings: [],
        flag: false,
        hasRating: false,
        dataflag: true,
        changeFlag: true,
        seleFlag: false,
        rating: {
          accuracy: 0, // 准确度
          sincerity: 0, // 诚意
          service: 0, // 服务
        },
        evaluation: [],
        isAllChecked: false,
        concatArr:[],
        showpay:false
      }
    },

    methods: {
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
      ratings(info) {   //查看评价
        this.popupRating = true;
        this.evaluation = []
        this.$http.get('/v1/appoint/judge/'+info.judgementId).then((res)=>{
          this.evaluation.push(res.data.appointrecord)
        })
      },
      goRatings(info){   //去评价
        this.evaluation = []
        this.popupRating = true;
        this.evaluation.push(info)
      },
//      提交评价
      submitNext(){
        this.popupRating = false
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
          console.log(res,2)
          this.popupRating = false
          this.meetings= []
          this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'appointStatus': 2,
          }
        }).then((res) => {
          this.meetings = res.data.data.data
        })
        })
      },
//      代付款 专家约见
      getList(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'appointStatus': 0,
          }
        }).then((res) => {
          this.demands = res.data.data.data
          res.data.data.data.forEach((value, index) => {
            this.concatArr.push(value)
            if (value.item.field) {
              this.$set(value.item, 'fieldOb', value.item.field.split(';').map(item => this.bus[item]).join(";"))
            }
          })
          if(this.demands.length==0){
            this.flag = false
            this.dataflag = false
          }else{
            this.flag = false
            this.dataflag = true
          }
        })
      },
//      代付款   沟通约见
      getLists(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'appointStatus': 0,
            'type': '2'
          }
        }).then((req) => {
          if (req) {
            this.myInteresting = req.data.data.data
            req.data.data.data.forEach((value) => {
              this.concatArr.push(value)
              if (value.item.field) {
                this.$set(value.item, 'fieldOb', value.item.field.split(';').map(item => this.bus[item]).join(";"))
              }

            })
            if(this.myInteresting.length==0){
              this.seleFlag = false
              this.changeFlag = false
            }else{
              this.changeFlag = true
              this.seleFlag = false
            }
          }
        })
      },
//      已确认 今天的
      confirmed(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'appointTime': 2,
            'appointStatus': 1,
            'type': '2'
          }
        }).then((res) => {
          this.beInterested = res.data.data.data
        })
      },
//      已确认  之后的
      confirmedAfter(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'appointTime': 3,
            'appointStatus': 1,
            'type': 2
          }
        }).then((res) => {

          this.aftertodayList = res.data.data.data
        })
      },
//      已经完成的
      accomplish(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'appointStatus': 2,
          }
        }).then((res) => {
          this.meetings = res.data.data.data
          console.log(this.meetings)
        })
      },
//      点击编辑按钮
      deleteList(){
        this.dataflag = false
        this.flag = true
      },
      // 点击删除专家数据按钮
      removeList(index, info){
        this.$http.get('/v1/appoint/del/' + info.id, {
          params: {}
        }).then((res) => {
          if (res.data.success) {
            this.demands.splice(index, 1)
          } else {
            this.$f7.alert('错误', res.data.message)
          }
        })
        this.calcTotalprice()
      },
      //需求沟通 编辑按钮
      deleteList1(){
        this.changeFlag = false
        this.seleFlag = true
      },
      // 点击删除需求沟通数据按钮
      removeList1(index, info){
        this.calcTotalprice()
        this.$http.get('/v1/appoint/del/' + info.id, {
          params: {}
        }).then((res) => {
          if (res.data.success) {
            this.myInteresting.splice(index, 1)
          } else {
            this.$f7.alert('错误', res.data.message)
          }
        })
      },
      deleteListAgain(){
        this.dataflag = true
        this.flag = false
      },
      deleteListAgain1(){
        this.changeFlag = true
        this.seleFlag = false
      },
      getBus(){
        this.$http.get('/v1/dict/type/bus').then((res1) => {
          this.bus = res1.data
        })
      },
//      选中商品
      selectedProduct(e, info){
        let checked = e.target.checked;
        this.$set(info, 'check', checked)
        if (!checked) this.isAllChecked = false;
        if (this.demands.every(value => value.check)) {
          this.isAllChecked = true
        }
        this.calcTotalprice()
      },
//      全选产品
      selectAll(e){
        let checked = e.target.checked;
        this.isAllChecked = checked;
        this.demands.forEach((value) => {
          this.$set(value, "check", checked)
        })
        this.myInteresting.forEach((value) => {
          this.$set(value, "check", checked)
        })
        this.calcTotalprice()
      },
//      计算总金额
      calcTotalprice(){
        this.totalMoney = 0;
        this.demands.forEach((value) => {
          if (value.check == true) {
            this.totalMoney += value.estimateMoney
          }
        })
        this.myInteresting.forEach((value) => {
          if (value.check == true) {
            this.totalMoney += value.estimateMoney
          }
        })
      },
//点击待约见
      payment(){
        this.paymentFlag = true
        this.confirmedFlag = false
        this.hasEndedFlag = false
        this.getList()
        this.getLists()
//        if(this.concatArr.length ==0){
//          this.showpay = false
//        }else{
//          this.showpay = true
//        }
      },
      notarize(){
        this.paymentFlag = false
        this.confirmedFlag = true
        this.hasEndedFlag = false
        this.confirmed()
        this.confirmedAfter()
      },
      hasEnded(){
        this.paymentFlag = false
        this.confirmedFlag = false
        this.hasEndedFlag = true
        this.accomplish()
      },
//      微信支付
      paymentMoney(){
        let demandsId = []        //专家的收款id
        let InterestingId = []    //专家的收款id
        let orderId = []        //专家约见的预约id
        let appointment = []    //沟通约见的预约id
        let fromUser = ''
        let company = ''
        this.demands.forEach((value) => {
          if (typeof value.check !== 'undefined' && value.check == true) {
            demandsId.push(value.itemId)
            appointment.push(value.id)
            fromUser = value.companyId
            company = value.busCompany.name
          }
        })
        this.myInteresting.forEach((value) => {
          if (typeof value.check !== 'undefined' && value.check == true) {
            InterestingId.push(value.itemId)
            orderId.push(value.id)
            company = value.busCompany.name
          }
        })
        let concatId = demandsId.concat(InterestingId).join(",")
        let appointId = appointment.concat(orderId).join(",")
        let openId = localStorage.getItem('openId')
        this.$http({
          method: 'post',
          url: '/v1/wechat/preOrder',
          data: {
            wechatId: openId,               //付款人的openId
            appointId: appointId,           //预约ID
            fromUser: fromUser,            //付款人id
            toUser: concatId,              //收款人ID
            payMoney: this.totalMoney,//付款金额 ，单位为分
            productDesc: company,        //订单描述
            productDetail: company+'为您提供服务',     //订单详细
            domainIp: '192.168.16.10',          //用户ip
          }
        }).then((res) => {
          if (res.data.errno == 0) { //表示请求成功
           function onBridgeReady() {
              let rspData = res.data.data;
              let data = {
                timeStamp: rspData.timeStamp ,      //时间戳
                nonceStr: rspData.nonceStr,        //随机字符串
                paySign: rspData.sign,              //签名
                appId : rspData.appId,              //appid
                package: rspData.package,
                signType:rspData.signType
              }
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest', data,
                function (res) {
                    console.log(res)
                  if (res.err_msg == "get_brand_wcpay_request:ok"){
                    this.$http.get('/v1/appoint/status/?',{
                      params: {
                        'id':appointId,
                        'status':1
                      }
                    })
                  }else{
                      alert("支付失败")
                  }
                }
              )
            }
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            } else {
              onBridgeReady();
            }
          }
        })
      },
    },
    mounted(){
      this.getBus()
      this.confirmed()
      this.confirmedAfter()
      this.accomplish()
    }
  }
</script>
