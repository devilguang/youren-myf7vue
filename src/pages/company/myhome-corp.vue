<style>
  .firmActive {
    border-bottom: 2px solid #ffffff;
  }

  .Meeting .card {
    margin-bottom: 20px;
    height:160px;
  }

  .page > .subnavbar {
    /*top: 56px;*/
  }

  .listItem:last-child {
    margin-bottom: 100px;
  }

  .list-block ul ul {
    padding-left: 0;
  }

  .floating-label, .list-block .label {
    width: 24%;
  }

  .conpanlyName {
    width: 100%;
    color: #2196f3;
    height: 30px;
    border: 0px;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 2px;
    resize: none;
  }

  .companyType {
    border: 0;
    width: 30%;
    height: 30px;
    font-size: 15px;
  }
  .companyNum {
    border: 0;
    margin-left: 10px;
    width: 30%;
    background: #ffffff;
    height: 30px;
    font-size: 15px;
  }
  .disabled, [disabled] {
    background: #ffffff;
    opacity: 1;
  }
  .industry {
    border: 0;
    width: 80%;
    height: 30px;
    font-size: 15px;
  }
  .fieldsArr {
    border: 0;
    width: 80%;
    height: 30px;
    font-size: 15px;
  }
  .companyAbout {
    width: 100%;
    height: 200px;
    text-indent: 2em;
    font-size: 15px;
    line-height: 24px;
    color: #333333;
    font-weight: 200;
    border: 0;
    letter-spacing: 1px;
    resize: none;
  }
  .changeActive {
    border: 1px solid #cccccc;
    resize: vertical;
    resize: none;
  }
</style>
<template>
  <f7-page class="Meeting " name="myhome-corp">
    <f7-navbar back-link="Back" title="主页" sliding></f7-navbar>
    <f7-subnavbar>
      <f7-buttons>
        <f7-button :class="{'firmActive':demandFlag}" @click="clickDemand">需求列表</f7-button>
        <f7-button :class="{'firmActive':homeFlag}" @click="clickHome">企业主页</f7-button>
        <f7-button :class="{'firmActive':contactFlag}" @click="clickContacts">联系人</f7-button>
      </f7-buttons>
    </f7-subnavbar>
    <f7-tabs>
      <f7-page-content v-show="demandFlag" style="margin-top: 103px">
        <f7-block-title class="color-black"> 推广中</f7-block-title>
        <f7-list>
          <!-- @click="boolean = true"-->
          <f7-list-item v-for="info in infoList" :key="info.companyId">
            <div class="flex-left flex-top">
              <img :src="info.pictureUrl" style="width: 80px; height:80px; " @click="clickDemandList(info)">
              <div class="unit">
                <div class="info-title">{{info.title}}</div>
                <p class="info-misc" @click="clickDemandList(info)">{{info.demandInfo}} </p>
                <div class="info-misc flex-right flex-middle" style="text-align: right;">
                  <f7-input name="switch" type="switch" @change.natvie="checkBox()"
                            @click="carriage(info,0)"></f7-input>
                  <span style="white-space: nowrap; margin-left: 10px;">下架</span>
                </div>
              </div>
            </div>
          </f7-list-item>
        </f7-list>

        <f7-block-title class="color-black"> 已下架</f7-block-title>
        <f7-list>
          <f7-list-item class="listItem" v-for="info in infoLists" :key="info.companyId">
            <div class="flex-left flex-top">
              <img :src="info.pictureUrl" alt="" style="width: 80px; height:80px; margin-right: 10px;"
                   @click="clickDemandList(info)">
              <div class="unit">
                <div class="info-title">{{info.title}}</div>
                <p class="info-misc" @click="clickDemandList(info)">{{info.demandInfo}} </p>
                <div class="info-misc flex-right flex-middle" style="text-align: right;">
                  <f7-input name="switch" type="switch" @change.native="" @click="carriage(info,1)"></f7-input>
                  <span style="white-space: nowrap; margin-left: 10px;">上架</span>
                </div>
              </div>
            </div>
          </f7-list-item>
        </f7-list>
      </f7-page-content>
      <!--企业的主页信息-->
      <f7-page-content v-show="homeFlag" active>
        <div class="card-wrapper" style="margin-top: 54px;">
          <f7-card class="flex-left flex-middle" style="display: flex">
            <span
              style="position: absolute;bottom: 0px;color:#2196f3;border-radius: 5px;height: 30px;left:40px;font-weight: bold;"
              v-if="!changeFlag">更改头像</span>
            <img class="info-avatar" src="/static/img/avatar-unit1.png"
                 style="height: 100px; width: 100px;flex:0 0 100px; margin-right: 15px;"/>
            <div class="info-inner" style="flex:1">
              <textarea class="conpanlyName" :disabled="changeFlag"
                        :class="{'changeActive':!changeFlag}">{{info.name}}</textarea>
              <!--<input type="text" class="conpanlyName" v-model="info.name" :class="{'changeActive':!changeFlag}"-->
                     <!--:disabled="changeFlag">-->
              <div style="margin-top: 10px">
                <input type="text" class="companyType" v-model="info.companyType" :class="{'changeActive':!changeFlag}"
                       :disabled="changeFlag">
                <span style="margin-right: 10px;"></span><span>|</span>
                <input type="text" class="companyNum" v-model="info.num" :class="{'changeActive':!changeFlag}"
                       :disabled="changeFlag">
              </div>
            </div>
          </f7-card>
        </div>
        <f7-block-title><i class="fa fa-dot-circle-o fa-lg color-blue"></i> 所属领域</f7-block-title>
        <div class="content-block">
          <div class="content-block-inner" style="text-indent: 2em;">
            <p><input class="industry" type="text" v-model="info.industry" :disabled="changeFlag"
                      :class="{'changeActive':!changeFlag}"></p>
            <p>
              <input type="text" class="fieldsArr" v-model="info.ext2" :disabled="changeFlag"
                     :class="{'changeActive':!changeFlag}">
            </p>
          </div>
        </div>
        <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 企业简介</f7-block-title>
        <div class="content-block" style="margin-bottom: 20px">
          <textarea class="companyAbout" :disabled="changeFlag"
                    :class="{'changeActive':!changeFlag}">{{info.companyAbout}}</textarea>
        </div>
        <f7-block class="afterLine" style="margin-top:0;margin-left:25%;margin-bottom:100px;width: 50%;"
                  v-if="changeFlag">
          <f7-button round fill style="border-radius: 5px" @click="changeFlag = false">编辑主页</f7-button>
        </f7-block>
        <f7-block class="afterLine" style="margin-top:0;margin-left:25%;margin-bottom:100px;width: 50%;"
                  v-if="!changeFlag">
          <f7-button round fill style="border-radius: 5px" @click="changeFlag = true">完成编辑</f7-button>
        </f7-block>
      </f7-page-content>
      <f7-page-content v-show="contactFlag" style="margin-top: 103px">
        <f7-block-title>联系人</f7-block-title>
        <!--增加联系人-->

        <f7-card v-for="(item, index) in contactors" :key="item.id">
          <div v-show="item.id != 0" class="fa fa-edit  fa-2x"
               style="position: absolute; top:10px; right: 10px; z-index:100;" @click="recompose(item)"></div>
          <f7-card-content>
            <form class="list-block inputs-list">
              <ul>
                <li>
                  <div class="item-content" style="position: relative;">
                    <div class="item-inner">
                      <div class="item-title label">姓名</div>
                      <div class="item-input item-input-field">
                        <input type="text" placeholder="" v-model="item.name"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title label">电话</div>
                      <div class="item-input item-input-field">
                        <input type="tel" placeholder="" v-model="item.telephone"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title label">邮箱</div>
                      <div class="item-input item-input-field">
                        <input type="text" placeholder="" v-model="item.email"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title label">职位</div>
                      <div class="item-input item-input-field">
                        <input type="text" placeholder="" v-model="item.position"/>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </f7-card-content>
        </f7-card>
        <f7-block>
          <f7-button style="margin-bottom: 100px" @click="addLinkman()">新增联系人</f7-button>
        </f7-block>
      </f7-page-content>
    </f7-tabs>
    <!--增加弹窗的需求页面-->
    <f7-popup :opened="boolean" style="background:rgb(240,239,245)">
      <div @click="boolean = false">
        <f7-navbar title="我的需求"></f7-navbar>
      </div>
      <div class="list-block" style="margin-top: 0">
        <ul>
          <li style="background: #ffffff">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">需求名：</div>
                <div class="item-input">
                  <input type="text" placeholder="简洁明了概括" v-model="companyList.title">
                </div>
              </div>
            </div>
          </li>
          <!-- Select -->
          <li style="background: #ffffff">
            <div class="item-content">
              <div class="item-inner" style="margin-left: 0">
                <div class="item-title label">需求阶段</div>
                <div class="item-input">
                  <select value="">
                    <option value="0">请选择</option>
                    <option value="1">设计</option>
                    <option value="2">研发</option>
                    <option value="3">制造</option>
                    <option value="4">营销</option>
                  </select>
                </div>
              </div>
            </div>
          </li>

          <li style="background: #ffffff">
            <div class="item-content">
              <div class="item-inner" style="margin-left: 0">
                <div class="item-title label">所在地：</div>
                <select-adress :initprovselectedvalue="0"
                               :initcityselectedvalue="100">
                </select-adress>
              </div>
            </div>
          </li>

          <li style="background: #ffffff">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">金额：</div>
                <div class="item-input">
                  <input type="email" placeholder="25万" v-model="companyList.price">
                </div>
              </div>
            </div>
          </li>

          <li style="background: #ffffff">
            <div class="item-content" style="height: 100%;">
              <div class="item-inner" style="height: 100%;">
                <div class="item-title label" style="height: 100%;">关键词：</div>
                <div class="item-input" style="height: 100%;">
                  <input type="email" placeholder="换热器、制冷、微通道" v-model="companyList.ext2">
                </div>
              </div>
            </div>
          </li>
          <!-- Textarea -->
          <li class="align-top" style="background: #ffffff;margin-top: 10px;height: 200px;">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title label">简介：</div>
                <div class="item-input" style="background:rgb(240,239,245);height: 150px;">
                  <textarea style="height: 150px;">{{companyList.demandInfo}}</textarea>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <f7-block style="margin-top: 100px">
        <f7-button round fill @click="thinkTank()">提交需求</f7-button>
      </f7-block>
    </f7-popup>
    <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;height:60px;z-index:10000;display: flex">
      <f7-button style="height:60px;color:#000;flex:1"
                 @click="$router.load({url:'/mymeeting-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px">会议约见</p>
      </f7-button>

      <f7-button style="height: 60px;color:#000;flex:1"
                 @click="$router.load({url:'/recommend-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1"
                 @click="$router.load({url:'/myhome-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x color-blue"></i></p>
        <p style="margin-top: -25px;" class="color-blue">主页 </p>
      </f7-button>

      <f7-button style="height:60px;color:#000;flex:1"
                 @click="$router.load({url:'/myaccount-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x " style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>
<script>
  import selectAdress from '../../components/Address.vue'
  let autoID = 0;
  export default {
    name: 'myhome-corp',
    components: {
      selectAdress,
    },
    watch: {
      //检测编辑主页
      info: {
        handler(curVal, oldVal){
          this.$http({
            method: 'post',
            url: '/v1/company/update',
            data: {
              id: curVal.id,
              name: curVal.name,
              industry: curVal.industry,
              companyAbout: curVal.companyAbout,
              companyType: curVal.companyType,
              num: curVal,
              ext2: curVal.ext2
            }
          })
        },
        deep: true
      }
    },
    data() {
      return {
        changeFlag: true,
        disabledInput: true,
        demandFlag: false,
        homeFlag: true,
        contactFlag: false,
        info: {
          id: '',
          name: '',
          industry: '',
          num: '',
          ext2: '',
          companyAbout: '',
          companyType: ''
        },
        fieldsArr: [],   //所属领域
        keyWords: [],
        infoList: [],
        infoLists: [],
        companyList: {
          id: '',     //ID
          addr: '',   //所在地
          title: '',   //名称
          demandPhase: '',   //需求阶段code
          price: '',  //金额
          ext2: '',
          demandInfo: '',  //需求简介
        },
        contactors: {
//          name:'',
//          telephone:'',
//          email:'',
//          position:''
        },  //联系人信息
        oldId: '',
        userId: '',
        boolean: false
      }
    },
    methods: {
      formateDate (date, fmt = "M月D日dddd H:mm"){
        return moment(date).format(fmt)
      },
      isToday(date){
        return moment(date).isSame(new Date(), 'day')
      },
//      checkBox(e){
//          console.log(e)
//      },

      isAfterToday(date){
        return moment(date).isAfter(new Date(), 'day')
      },
      getFields(){
        this.$http({
          method: 'get',
          url: 'v1/company/' + this.oldId,
          data: {}
        }).then((res) => {
          this.info.id = res.data.id
          this.info.name = res.data.name
          this.info.industry = res.data.industry
          this.info.companyAbout = res.data.companyAbout
          this.info.companyType = res.data.companyType
          this.info.num = res.data.num
          this.info.ext2 = res.data.ext2
          this.keyWords = res.data.fields.split(';')
          this.$http({
            method: 'get',
            url: '/v1/admin/fields',
            data: {}
          }).then((res) => {
            this.fieldsArr = []
            res.data.forEach((item, index) => {
              this.keyWords.forEach((value, $index) => {
                if (value === item.id) {
                  this.fieldsArr.push(item.name)
                }
              })
            })
          })
        })
      },
      getContact(){
        this.$http({
          method: 'get',
          url: '/v1/user/contacts/' + this.userId,
          data: {}
        }).then((res) => {
          this.contactors = res.data
        })
      },
      recompose(item) {
//          点击编辑
      },
      addLinkman() {
        this.contactors.push({
          name: '',
          telephone: '',
          email: '',
          postion: '',
          domain: ''
        })
      },
//      点击每个需求查看详情
      clickDemandList(info){
        this.boolean = true
        this.companyList.id = info.id
        this.companyList.addr = info.addr   //所在地
        this.companyList.title = info.title   //名称
        this.companyList.demandPhase = info.demandPhase   //需求阶段code
        this.companyList.price = info.price//金额
        this.companyList.ext2 = info.ext2
        this.companyList.demandInfo = info.demandInfo//需求简介
      },
//      提交需求
      thinkTank(){
        this.$http({
          method: 'post',
          url: '/v1/phase/update',
          data: {
            'id': this.companyList.id,     //ID
            'addr': this.companyList.id,   //所在地
            'title': this.companyList.title,   //名称
            'demandPhase': this.companyList.demandPhase,   //需求阶段code
            'price': this.companyList.price,  //金额
            'ext2': this.companyList.ext2,
            'demandInfo': this.companyList.demandInfo,  //需求简介
          }
        }).then((res) => {
          this.boolean = false
        })
      },
      popularize(id){
        this.boolean = true
      },
//      需求
      clickDemand(){
        this.demandFlag = true
        this.homeFlag = false
        this.contactFlag = false
        this.requirements()
      },
//      主页
      clickHome(){
        this.demandFlag = false
        this.homeFlag = true
        this.contactFlag = false
      },
//      联系人
      clickContacts(){
        this.demandFlag = false
        this.homeFlag = false
        this.contactFlag = true
      },
//      需求列表
      requirements(){

        this.$http({
          method: 'post',
          url: '/v1/phase/list',
          data: {
            'companyId': this.oldId,
            'ban': 1
          }
        }).then((res) => {
          this.infoList = res.data.data
        })
        this.$http({
          method: 'post',
          url: '/v1/phase/list',
          data: {
            'companyId': this.oldId,
            'ban': 0
          }
        }).then((res) => {
          this.infoLists = res.data.data
        })
      },
//点击上下架
      carriage(info, type){
        if (type == 0) {
          this.$http({
            method: 'post',
            url: '/v1/phase/update',
            data: {
              id: info.id,
              ban: 0
            }
          }).then((res) => {
            this.infoLists = [];
            this.infoList = []
            this.requirements()
          })
        } else {
          this.$http({
            method: 'post',
            url: '/v1/phase/update',
            data: {
              id: info.id,
              ban: 1
            }
          }).then((res) => {
            this.infoLists = [];
            this.infoList = []
            this.requirements()
          })
        }
      }
    },
    mounted(){
      this.oldId = this.$store.oId
      this.userId = this.$store.userId
      this.getFields()
      this.getContact()
    }
  }
</script>
