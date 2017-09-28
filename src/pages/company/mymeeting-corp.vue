<style>
  .page > .subnavbar {
    top: 40px;
  }

  /*.listItem:nth-child(1) {*/
  /*margin-top: 120px;*/
  /*}*/

  .list-block {
    /*margin-bottom: 60px;*/
  }

  .animated {
    transform: translate3d(-80px, 0px, 0px);
  }

  .list-block ul:before {
    height: 0;
  }

  .list-block ul:after {
    height: 0;
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
      <loading-bar v-if="loadingFlag"></loading-bar>

      <f7-page-content v-show="paymentFlag" style="height: 100%;margin-bottom: 60px">
        <div class="page-content infinite-scroll" style="height: 5.2rem;margin-bottom: 0px">
          <f7-block-title style="display: flex;margin-top: 65px" v-if="myInteresting.length>0">
            <span style="flex: 0 0 50%" class="color-blue">需求沟通</span>
            <span style="flex: 0 0 50%;margin-left: 40%" v-if="seleFlag" @click="deleteListAgain1()">完成</span>
            <span style="flex: 0 0 50%;margin-left: 40%" v-if="changeFlag" @click="deleteList1() ">编辑</span>
          </f7-block-title>
          <!--表单类型用 form 否则用 div -->
          <div class="list-block">
            <ul>
              <li class="swipeout transitioning" :class="{'swipeout-opened':seleFlag}"
                  v-for="(info,index) in myInteresting" :key="info.item.id">
                <!--滑动包装-->
                <div class="swipeout-content" :class="{'animated':seleFlag}" style="">
                  <!--checkbox包装-->
                  <label class="item-content label-checkbox " style="padding-left: 0">
                    <f7-list form style="margin: 0px;">
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
                        <p class="info-misc">接洽需求：</p>
                        <p v-if="info.estimateMoney==null? false:true" class="color-red"
                           style="text-align: right;font-size: 20px;vertical-align: middle">
                          <span
                            style="color:red;display: inline-block;padding: 2px;background: #f4f4f4;font-size: 10px;vertical-align: middle;margin-left: 10px">活动优惠</span>￥{{info.estimateMoney}}
                        </p>
                        <p v-if="info.estimateMoney==null? false:true" style="text-align: right;font-size: 10px">
                          原价<span style="text-decoration: line-through;font-size: 10px">￥500</span></p>
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
          <!--</div>-->
          <f7-block-title style="display: flex;margin-top: 0.6rem" v-if="demands.length>0">
            <span style="flex: 0 0 50%" class="color-blue">专家约见</span>
            <span style="flex: 0 0 50%;margin-left: 40%" v-if="flag" @click="deleteListAgain()">完成</span>
            <span style="flex: 0 0 50%;margin-left: 40%" v-if="dataflag" @click="deleteList() ">编辑</span>
          </f7-block-title>

          <!--表单类型用 form 否则用 div -->
          <!--<div class="page-content infinite-scroll" style="height: 23rem;">-->
          <div class="list-block" style="margin: 0px">
            <ul style="margin: 0px;margin-bottom: 50px;">
              <li class="swipeout transitioning" :class="{'swipeout-opened':flag}"
                  v-for="(info,$index) in demands" :key="info.item.id">
                <!--滑动包装-->
                <div class="swipeout-content" :class="{'animated':flag}">
                  <!--checkbox包装-->
                  <label class="item-content label-checkbox" style="padding-left: 0;">
                    <f7-list form style="margin: 0px">
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
                        <!--<p v-if="info.estimateMoney==null? false:true" class="color-red" style="text-align: right;">-->
                        <!--{{'￥' + info.estimateMoney}}</p>-->
                        <p v-if="info.estimateMoney==null? false:true" class="color-red"
                           style="text-align: right;font-size: 20px;vertical-align: middle">
                          <span
                            style="color:red;display: inline-block;padding: 2px;background: #f4f4f4;font-size: 10px;vertical-align: middle;margin-left: 10px">活动优惠</span>￥{{info.estimateMoney}}
                        </p>
                        <p v-if="info.estimateMoney==null? false:true" style="text-align: right;font-size: 10px">
                          原价<span style="text-decoration: line-through;font-size: 10px">￥500</span></p>
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
          </div>
        </div>
        <div v-show="concatArr.length<=0" style="width: 100%;text-align:center;position: absolute;top: 100px;">暂无数据
        </div>
      </f7-page-content>
      <div v-if="showpay">
        <div v-if="concatArr.length>0"
             style="display: flex;width: 100%;position:fixed;bottom:60px;height:50px;line-height:50px;background: rgb(243, 243, 244);z-index:100">
          <div style="flex: 1;padding-left: 16px;background: rgb(243, 243, 244)">
            <input type="checkbox" name="my-checkbox" @change.natvie="selectAll" :checked="isAllChecked"
                   style="width: 18px;height: 18px;vertical-align: middle">
            <span style="display: inline-block;vertical-align: middle">全&ensp;选</span>
          </div>
          <div style="flex: 1;background: rgb(243, 243, 244)">合&ensp;计<span style="color:red">￥{{totalMoney}}</span>
          </div>
          <div style="flex: 1;color:#ffffff;background:#3399ff;text-indent: 10px;" @click="paymentMoney">
            结&ensp;算 {{totalMoney + ' 元'}}
          </div>
        </div>
      </div>
      <!--已确认-->
      <div class="page-content infinite-scroll" v-show="confirmedFlag" style="height:5.2rem;margin: 0px">
        <f7-block-title class="color-blue" style="margin-top: 65px" v-show="beInterested.length>0">今天</f7-block-title>
        <f7-list>
          <f7-list-item v-for="info in beInterested" :key="info.item.id">
            <div class="info-content"
                 style="width: max-content; max-width: 120px; text-align: center;margin-left:30px ">
              <img class="info-midea" :src="info.item.headImg" alt=""
                   style="width: 60px; height:60px;border-radius: 50%">
              <div class="info-title">{{info.item.name}}</div>
              <div class="info-misc">{{info.item.college}}</div>
            </div>
            <div class="info-content unit" style="margin-left: 30px">
              <p class="info-title color-blue" style="margin-top: 10px">电话会议</p>
              <p class="info-misc has-icon-phone" style="margin-top: 10px">{{info.item.phoneNum}}</p>
              <p class="info-misc has-icon-time" style="margin-top: 10px">{{info.item.createTime}}
                <small>(约谈30分钟)</small>
              </p>
              <p class="info-misc has-icon-address"></p>
            </div>
          </f7-list-item>
        </f7-list>
        <f7-block-title class="color-blue">之后</f7-block-title>
        <f7-list v-if="aftertodayList.length>0" style="margin-bottom: 0.7rem">
          <f7-list-item v-for="info in aftertodayList" :key="info.item.id">
            <div class="info-content" style="width: max-content; max-width: 120px; text-align: center;margin-left:30px">
              <img class="info-midea" :src="info.item.headImg" alt=""
                   style="width: 60px; height:60px;border-radius: 50%;">
              <div class="info-title">{{info.item.name}}</div>
              <div class="info-misc">{{info.item.college}}</div>
            </div>
            <div class="info-content unit" style="margin-left: 30px">
              <p class="info-title color-blue" style="margin-top: 10px">电话会议</p>
              <p class="info-misc has-icon-phone" style="margin-top: 10px">{{info.item.phoneNum}}</p>
              <p class="info-misc has-icon-time" style="margin-top: 10px">{{info.item.createTime}}
                <small>(约谈30分钟)</small>
              </p>
              <p class="info-misc has-icon-address"></p>
            </div>
          </f7-list-item>
        </f7-list>
        <div v-else style="width: 100%;text-align:center;margin-bottom: 0.1rem">暂无数据</div>
        <div v-if="noNumber&&afterFlag" style="width: 100%;text-align:center;margin-top: 100px">暂无数据</div>
      </div>

      <!--已结束的-->
      <div class="page-content infinite-scroll" v-show="hasEndedFlag">
        <f7-list style="margin-top: 56px">
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
              <template v-if="info.judgementId ==null">
                <f7-button color="blue" fill round @click="goRatings(info)">去评价</f7-button>
              </template>
            </div>
          </f7-list-item>
        </f7-list>
        <div v-show="meetings.length<=0" style="width: 100%;text-align:center;margin-top: 100px">暂无数据</div>
      </div>

    </f7-tabs>

    <f7-popup :opened="popupRating">
      <f7-navbar title="星级评分" style="font-size: 0.8em;text-overflow: clip"><span
        style="margin-left: 58%;font-size: 0.8em;" @click="popupRating = false">关闭</span></f7-navbar>
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


    <div style="display: flex;position: fixed;bottom:0;width: 100%;height:60px;z-index:10000;">
      <f7-button style="flex:1;height:60px;color:#000;background:#ffffff;"
                 @click="$router.load({url:'/mymeeting-corp'})" data-ignore-cache="false">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x color-blue"></i></p>
        <p style="margin-top: -25px" class="color-blue">会议约见</p>
      </f7-button>
      <f7-button style="flex:1;height: 60px;color:#000;background:#ffffff;"
                 @click="$router.load({url:'/recommend-corp'})" data-ignore-cache="false">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>
      </f7-button>
      <f7-button style="flex:1;height:60px;color:#000;background:#ffffff;"
                 @click="$router.load({url:'/myhome-corp'})" data-ignore-cache="false">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button style="flex:1;height:60px;color:#000;background:#ffffff;"
                 @click="$router.load({url:'/myaccount-corp'})" data-ignore-cache="false">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x " style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>

</template>
<script>
  import loadingBar from '../../components/loadingBar.vue';
  export default {
    name: 'mymeeting-corp',
    components: {loadingBar},

    data() {
      return {
        loadingFlag: true,
        noNumber: false,
        paymentFlag: true,
        confirmedFlag: false,
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
        titleFlag: false,
        afterFlag: false,
        rating: {
          accuracy: 0, // 准确度
          sincerity: 0, // 诚意
          service: 0, // 服务
        },
        evaluation: [],
        isAllChecked: false,
        concatArr: [],
        showpay: true
      }
    },
    watch: {
      concatArr(curVal, oldVal){
//        if (curVal.length == 0) {
//          this.showpay = false
//        } else {
//          this.showpay = true
//        }
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
        this.evaluation = [];
        this.$http.get('/v1/appoint/judge/' + info.judgementId).then((res) => {
          this.evaluation.push(res.data.appointrecord)
        })
      },
      goRatings(info){   //去评价
        this.evaluation = [];
        this.popupRating = true;
        this.evaluation.push(info)
      },
//      提交评价
      submitNext(){
        this.popupRating = false;
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
          this.meetings = [];
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
          this.loadingFlag = false;
          this.demands = res.data.data.data;
          this.loadingFlag = false
          res.data.data.data.forEach((value, index) => {
            this.concatArr.push(value);
            if (value.item.field) {
              this.$set(value.item, 'fieldOb', value.item.field.split(';').map(item => this.bus[item]).join(";"))
            }
          })
          if (this.demands.length == 0) {
            this.flag = false;
            this.dataflag = false
          } else {
            this.flag = false;
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
            'type': '3'
          }
        }).then((req) => {
          if (req) {
            this.myInteresting = req.data.data.data;
            req.data.data.data.forEach((value) => {
              this.concatArr.push(value);
              if (value.item.field) {
                this.$set(value.item, 'fieldOb', value.item.field.split(';').map(item => this.bus[item]).join(";"))
              }
            });
            if (this.myInteresting.length == 0) {
              this.seleFlag = false;
              this.changeFlag = false
            } else {
              this.changeFlag = true;
              this.seleFlag = false
            }
          }
        })
      },
//      已确认 今天 和 明天
      confirmed(){
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'appointTime': 1,
            'appointStatus': 1,
            'type': '2'
          }
        }).then((res) => {
          this.beInterested = res.data.data.data;
          if (this.beInterested <= 0) {
            this.noNumber = true
          } else {
            this.noNumber = false
          }
        });
        this.$http.get('/v1/appoint/list', {
          params: {
            'pageIndex': 1,
            'pageSize': 10,
            'appointTime': 3,
            'appointStatus': 1,
            'type': 2
          }
        }).then((res) => {
          this.aftertodayList = res.data.data.data;
          if (this.aftertodayList.length <= 0) {
            this.afterFlag = true;
          } else {
            this.afterFlag = false;
          }

        });
      },
//      已确认  之后的
      confirmedAfter(){

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
        })
      },
//      点击编辑按钮
      deleteList(){
        this.dataflag = false;
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
        });
        this.calcTotalprice()
      },
      //需求沟通 编辑按钮
      deleteList1(){
        this.changeFlag = false;
        this.seleFlag = true
      },
      // 点击删除需求沟通数据按钮
      removeList1(index, info){
        this.calcTotalprice();
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
        this.dataflag = true;
        this.flag = false
      },
      deleteListAgain1(){
        this.changeFlag = true;
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
        this.$set(info, 'check', checked);
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
        });
        this.myInteresting.forEach((value) => {
          this.$set(value, "check", checked)
        });
        this.calcTotalprice();
      },
//      计算总金额
      calcTotalprice(){
        this.totalMoney = 0;
        this.demands.forEach((value) => {
          if (value.check == true) {
            this.totalMoney += value.estimateMoney
          }
        });
        this.myInteresting.forEach((value) => {
          if (value.check == true) {
            this.totalMoney += value.estimateMoney
          }
        })
      },
//点击待约见
      payment(){
        this.paymentFlag = true;
        this.confirmedFlag = false;
        this.hasEndedFlag = false;
        this.showpay = true;
        this.totalMoney = 0;
        this.getList();
        this.getLists();
      },
      //点击已确认
      notarize(){
        this.paymentFlag = false;
        this.confirmedFlag = true;
        this.hasEndedFlag = false;
        this.showpay = false;
        this.confirmed();
        this.confirmedAfter();
      },
      //已结束
      hasEnded(){
        this.showpay = false;
        this.paymentFlag = false;
        this.confirmedFlag = false;
        this.hasEndedFlag = true;
        this.accomplish();
      },
//      微信支付
      paymentMoney(){
        this.$f7.alert('有人智库对专家信息的真实有效性负责，若付款成功后无法联系专家，系统将全额退款给用户', '有人智库', () => {
          let demandsId = [];       //专家的收款id
          let InterestingId = [];    //专家的收款id
          let orderId = [];       //专家约见的预约id
          let appointment = [];   //沟通约见的预约id
          let fromUser = '';
          let company = '';
          this.demands.forEach((value) => {
            if (typeof value.check !== 'undefined' && value.check == true) {
              demandsId.push(value.itemId);
              appointment.push(value.id);
              fromUser = value.companyId;
              company = value.busCompany.name
            }
          });

          this.myInteresting.forEach((value) => {
            if (typeof value.check !== 'undefined' && value.check == true) {
              InterestingId.push(value.itemId);
              orderId.push(value.id);
              company = value.busCompany.name
            }
          });

          let concatId = demandsId.concat(InterestingId).join(",");
          let appointId = appointment.concat(orderId).join(",");
          let openId = localStorage.getItem('openId');
          this.$http({
            method: 'post',
            url: '/v1/wechat/preOrder',
            data: {
              wechatId: openId,               //付款人的openId
              appointId: appointId,           //预约ID
              fromUser: fromUser,            //付款人id
              toUser: concatId,              //收款人ID
              payMoney: this.totalMoney * 100,//付款金额,单位为分
              productDesc: company,                       //订单描述
              productDetail: company + '为您提供服务',     //订单详细
              domainIp: '192.168.16.10',          //用户ip
            }
          }).then((res) => {
            if (res.data.errno == 0) { //表示请求成功
              let rspData = res.data.data;
              let data = {
                timeStamp: rspData.timeStamp,      //时间戳
                nonceStr: rspData.nonceStr,        //随机字符串
                paySign: rspData.sign,              //签名
                appId: rspData.appId,              //appid
                package: rspData.package,
                signType: rspData.signType
              };
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data, appointId), false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data, appointId));
                  document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(data, appointId));
                }
              } else {
                this.onBridgeReady(data, appointId);
              }
            }
          })
        })
      },
      onBridgeReady(data, appointId){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', data,
          (res) => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              this.$f7.alert('恭喜您，付款成功！系统会为您立即联系专家并约定时间，约会成功后会电话和微信通知您，请您注意接收！', '有人智库', () => {
                this.$http.get('/v1/appoint/status/?', {params: {'id': appointId, 'status': 1}}).then((res) => {
                  this.totalMoney = 0;
                  this.demands = [];          //专家约见的数据
                  this.myInteresting = []; //沟通约见的数据
                  this.getList();
                  this.getLists()
                })
              })
            }
          }
        );
      }
    },
    mounted(){
      this.getBus();
      this.getList();
      this.getLists();
    }
  }
</script>
