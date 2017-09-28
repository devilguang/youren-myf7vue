<style>
  .firmActive {
    border-bottom: 2px solid #ffffff;
  }

  .page > .subnavbar {
    top: 55px;
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
    border: 0px;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 2px;
    resize: none;
    overflow-y: hidden;
  }

  .companyType {
    border: 0;
    width: 35%;
    font-size: 15px;
  }

  .companyNum {
    border: 0;
    margin-left: 10px;
    width: 35%;
    background: #ffffff;
    font-size: 15px;
  }

  .disabled, [disabled] {
    background: #ffffff;
    opacity: 0.8;
  }

  .industry {
    border: 0;
    width: 80%;
    font-size: 15px;
    resize: none;
    overflow-y: hidden;
  }

  .fieldsArr {
    border: 0;
    width: 80%;
    font-size: 15px;
    resize: none;
    overflow-y: hidden;
  }

  .companyAbout {
    width: 100%;
    min-height: 200px;
    text-indent: 2em;
    font-size: 15px;
    line-height: 24px;
    color: #333333;
    font-weight: 200;
    border: 0;
    letter-spacing: 1px;
    resize: none;
    overflow-y: hidden;
  }

  .changeActive {
    border: 1px solid #cccccc;
    resize: vertical;
    resize: none;
  }

</style>
<template>
  <f7-page class="Meeting  " name="myhome-corp">
    <f7-navbar back-link="Back" title="主页" sliding></f7-navbar>
    <loading-bar v-if="loadingFlag"></loading-bar>
    <f7-subnavbar>
      <f7-buttons>
        <f7-button :class="{'firmActive':demandFlag}" @click="clickDemand">需求列表</f7-button>
        <f7-button :class="{'firmActive':homeFlag}" @click="clickHome">企业主页</f7-button>
        <f7-button :class="{'firmActive':contactFlag}" @click="clickContacts">联系人</f7-button>
      </f7-buttons>
    </f7-subnavbar>
    <f7-tabs>
      <f7-page-content v-show="demandFlag" style="margin-top: 25px">
        <div v-if="generalize&&generalize1">
          <f7-block-title v-show="infoList.length>0" class="color-black"> 推广中</f7-block-title>
          <f7-list>
            <!-- @click="boolean = true"-->
            <f7-list-item v-for="info in infoList" :key="info.companyId">
              <div class="flex-left flex-top">
                <img :src="info.pictureUrl" style="width: 80px; height:80px; " @click="clickDemandList(info)">

                <div class="unit">
                  <div class="info-title">{{info.title}}</div>
                  <p class="info-misc" @click="clickDemandList(info)">{{info.demandInfo}} </p>
                  <div class="info-misc flex-right flex-middle" style="text-align: right;">
                    <f7-input name="switch" type="switch"
                              @click="carriage(info,0)" :checked="true"></f7-input>
                    <span style="white-space: nowrap; margin-left: 10px;">下架</span>
                  </div>
                </div>
              </div>
            </f7-list-item>
          </f7-list>
          <f7-block-title class="color-black" v-show="infoLists.length>0">已下架</f7-block-title>
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
        </div>
        <div v-else style="text-align: center;margin-top:100px;">暂无数据，请登录 <a
          href="javascript:void(0);">www.youren.ai</a>发布需求
        </div>
      </f7-page-content>
      <!--企业的主页信息-->
      <f7-page-content v-show="homeFlag" active>
        <div class="card-wrapper" style="margin-top: 54px;">
          <f7-card class="flex-left flex-middle" style="display: flex;padding: 30px">
            <span
              style="position: absolute;bottom: -5px;font-size:1.1em;color:#2196f3;border-radius: 5px;height: 30px;left:52px;font-weight: bold;"
              v-if="!changeFlag" @click="chooseImage">更改头像</span>
            <img class="info-avatar" v-if="info.companyLogo" :src="info.companyLogo"
                 style="height: 100px; width: 100px;flex:0 0 100px; margin-right: 15px;border-radius: 50%"/>
            <img class="info-avatar" v-else :src="baseImg"
                 style="height: 100px; width: 100px;flex:0 0 100px; margin-right: 15px;border-radius: 50%"/>
            <div class="info-inner" style="flex:1">
              <!--<p v-if="!companyFlag" class="conpanlyName">{{info.name}}</p>-->
              <textarea  class="conpanlyName" :disabled="changeFlag"
                        :class="{'changeActive':!changeFlag}" v-model="info.name" @blur="loose"
                        @focus="getpoint"></textarea>
              <div style="margin-top: 10px">
                <input type="text" class="companyType" v-model="info.companyType"
                       :class="{'changeActive':!changeFlag}"
                       :disabled="changeFlag" @blur="loose" @focus="getpoint" placeholder="企业类型" v-if="companyFlag">
                <span v-if="!companyFlag">{{info.companyType?info.companyType:''}}</span>
                <span style="margin-right: 10px;"></span>
                <input type="text" class="companyNum"  v-model="info.num"
                       :class="{'changeActive':!changeFlag}"
                       :disabled="changeFlag" @blur="loose" @focus="getpoint" placeholder="企业人数" v-if="companyFlag">
                <span v-if="!companyFlag">{{info.num?info.num:''}}</span>
              </div>
            </div>
          </f7-card>
        </div>
        <f7-block-title><i class="fa fa-dot-circle-o fa-lg color-blue"></i> 所属领域</f7-block-title>
        <div class="content-block">
          <div class="content-block-inner" style="text-indent: 2em;">
            <p><input class="industry" type="text" :disabled="changeFlag"
                                              :class="{'changeActive':!changeFlag}" v-model="info.industry"
                                              @blur="loose" @focus="getpoint"
                                              style="resize:none" placeholder="">
            </p>
            <!--<p>-->
             <!--{{info.ext2}}房地产-->
            <!--</p>-->
            <!--<textarea type="text" class="fieldsArr" v-model="info.ext2" :disabled="changeFlag"-->
                      <!--:class="{'changeActive':!changeFlag}" @blur="loose" @focus="getpoint"></textarea>-->
          </div>
        </div>
        <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 企业简介</f7-block-title>
        <div class="content-block">
          <textarea v-if="companyAboutFlag" class="companyAbout" :disabled="changeFlag"
                    :class="{'changeActive':!changeFlag}" v-model="info.companyAbout"
                    @blur="loose" @focus="getpoint" style="text-indent: 0.2rem">{{info.companyAbout}}</textarea>
          <div v-else>
            <div v-if="companyAbout1.length>200">{{companyAbout1.substring(0, showNum)}}</div>
            <div v-else style=" text-indent: 2em;">{{companyAbout1}}</div>
          </div>
          <div v-if="textFlag">
            <div class="color-blue" style="text-align: center" v-if="showFlag" @click="loadedMore ">查看更多<i
              class="fa fa-angle-double-down fa-1x" style="margin-left: 5px"></i></div>
            <div class="color-blue" style="text-align: center" v-else @click="packup">收起<i
              class="fa fa-angle-double-up fa-1x" style="margin-left: 5px"></i></div>
          </div>
        </div>
        <f7-block class="afterLine" style="margin-top:0;margin-left:25%;margin-bottom:80px;width: 50%;"
                  v-if="changeFlag">
          <f7-button round fill style="border-radius: 5px" @click="changeHome">编辑主页</f7-button>
        </f7-block>
        <f7-block class="afterLine" style="margin-top:-20px;margin-left:25%;margin-bottom:100px;width: 50%;"
                  v-if="!changeFlag">
          <f7-button round fill style="border-radius: 5px" @click="vim">完成编辑</f7-button>
        </f7-block>
      </f7-page-content>
      <f7-page-content v-show="contactFlag">
        <f7-block-title style="margin-top: 0.7rem">联系人</f7-block-title>
        <!--增加联系人-->
        <div v-if="contactors.length != 0&&karoakeFlag" class="fa fa-edit  fa-2x"
             style="position: absolute; top:30px; right: 10px; z-index:100;color:#2196f3"
             @click="karoakeFlag = false"></div>
        <div v-if="contactors.length != 0&&!karoakeFlag"
             style="position: absolute; top:30px; right: 10px; z-index:100;color:#2196f3" @click="recompose">完成
        </div>
        <f7-card v-for="(item, index) in contactors" :key="item.id" style="margin-bottom: 10px">
          <f7-card-content>
            <form class="list-block inputs-list">
              <ul>
                <li>
                  <div class="item-content" style="position: relative;">
                    <div class="item-inner">
                      <div class="item-title label">姓名</div>
                      <div class="item-input item-input-field">
                        <input type="text" v-model="item.name" :disabled="karoakeFlag" style="" @blur="loose"
                               @focus="getpoint"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content ">
                    <div class="item-inner">
                      <div class="item-title label ">电话</div>
                      <div class="item-input item-input-field">
                        <input type="tel" placeholder="" v-model="item.telephone" :disabled="karoakeFlag" @blur="loose"
                               @focus="getpoint"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content ">
                    <div class="item-inner">
                      <div class="item-title label">邮箱</div>
                      <div class="item-input item-input-field">
                        <input type="text" placeholder="" v-model="item.email" :disabled="karoakeFlag" @blur="loose"
                               @focus="getpoint"/>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title label">职位</div>
                      <div class="item-input item-input-field">
                        <input type="text" placeholder="" v-model="item.position" :disabled="karoakeFlag" @blur="loose"
                               @focus="getpoint"/>
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
      <!--<div @click="boolean = false">-->
      <f7-navbar title="我的需求" style="font-size: 0.8em"></f7-navbar>
      <!--</div>-->
      <!--<f7-navbar title="我的需求" style="font-size: 0.8em;text-overflow: clip"><span-->
      <!--style="margin-left: 58%;font-size: 0.8em;" @click="boolean = false">关闭</span></f7-navbar>-->
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
                <div class="item-input">
                  <input type="email" placeholder="" v-model="companyList.addr">
                </div>
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
                  <textarea style="height: 150px;" v-model="companyList.demandInfo"></textarea>
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
    <div style="position: fixed;bottom:0;width: 100%;height:60px;z-index:10000;display: flex" v-show="footerFlag">
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/mymeeting-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px">会议约见</p>
      </f7-button>

      <f7-button style="height: 60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/recommend-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/myhome-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x color-blue"></i></p>
        <p style="margin-top: -25px;" class="color-blue">主页 </p>
      </f7-button>

      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/myaccount-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x " style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>

    <!--领域选择页面-->
    <!--<f7-popup :opened="areaBoolean">-->
      <!--<f7-block style=" text-align:center">-->
        <!--您主要关注的产业领域（可多选）-->
      <!--</f7-block>-->
      <!--<f7-block class="areas">-->
        <!--<div class="flex-between flex-wrap ">-->
          <!--<label class="areaItem" v-for="(area, i) in areaMap" :key="area.id" :class="{checked: area.checked}">-->
            <!--<input type="checkbox" @change="onChange($event, area, i)">{{area.name}}-->
            <!--<span v-if="area.checked" class="badge">-->
            <!--<i class="fa fa-check-circle fa-lg color-blue"></i>-->
          <!--</span>-->
          <!--</label>-->
        <!--</div>-->
      <!--</f7-block>-->
      <!--<f7-button round fill style="border-radius: 5px;margin-top: 30px" @click="selectAreas()">确定</f7-button>-->
    <!--</f7-popup>-->

  </f7-page>
</template>
<script>
  let autoID = 0;
  import loadingBar from '../../components/loadingBar.vue'
  export default {
    name: 'myhome-corp',
    components: {
      loadingBar
    },
    directives: {},
    data() {
      return {
        baseImg: '../../../static/imgs/img-professor.jpg',
        province: 0,
        city: 0,
        karoakeFlag: true,
        companyFlag:false,
        changeFlag: true,
        disabledInput: true,
        demandFlag: false,
        generalize: true,
        homeFlag: true,
        contactFlag: false,
        footerFlag: true,
        loadingFlag:true,
        info: {
          id: '',
          name: '',
          industry: '',
          num: '',
          ext2: '',
          companyAbout: '',
          companyType: '',
          companyLogo: ''
        },
        areaMap: [
          {"name": "房地产", "id": "12"},
          {"name": "采矿 ", "id": "02"},
          {"name": "制造", "id": "03"},
          {"name": "建筑", "id": "06"},
          {"name": "信息传输、软件和信息技术服务", "id": "10"},
          {"name": "教育 ", "id": "17"},
          {"name": "农林牧渔 ", "id": "01"},
          {"name": "电力、热力、燃气及水生产供应 ", "id": "04"},
          {"name": "科学研究、技术服务", "id": "14"},
          {"name": "交通运输、仓储和邮政", "id": "08"},
          {"name": "水利、环境和公共设施管理", "id": "15"},
          {"name": "租赁和商务服务", "id": "13"},
          {"name": "卫生和社会文化、体育和娱乐", "id": "05"},
          {"name": "批发和零售", "id": "07"},
          {"name": "国际组织", "id": "20"},
          {"name": "住宿和餐饮", "id": "09"},
          {"name": "电子信息 ", "id": "18"},
          {"name": "居民服务、修理和其他服务", "id": "16"},
          {"name": "金融", "id": "11"},
          {"name": "公共管理和社会组织", "id": "19"},
        ],
        companyAbout1: '',
        showNum: 200,
        textFlag: false,
        companyAboutFlag: false,
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
          demandInfo: '说明需求条件',  //需求简介
        },
        contactors: '',  //联系人信息
        oldId: '',
        userId: '',
        boolean: false,
        areaBoolen:false,
        showFlag: true,
        generalize1:true,
        selection:[]
      }
    },
    methods: {
      formateDate (date, fmt = "M月D日dddd H:mm"){
        return moment(date).format(fmt)
      },
      isToday(date){
        return moment(date).isSame(new Date(), 'day')
      },
      recompose(){
        this.karoakeFlag = true;
        this.$http({
          method: 'post',
          url: '/v1/user/contacts/edit',
          data: this.contactors
        })
      },
      isAfterToday(date){
        return moment(date).isAfter(new Date(), 'day')
      },
      getFields(){
        this.$http({
          method: 'get',
          url: 'v1/company/' + this.oldId,
          data: {}
        }).then((res) => {
          this.loadingFlag = false;
          this.info.id = res.data.id?res.data.id:'';
          this.info.name = res.data.name?res.data.name:'企业名称';
          this.info.industry = res.data.industry?res.data.industry:'';
          this.info.companyAbout = res.data.companyAbout?res.data.companyAbout:'';
          this.info.companyType = res.data.companyType?res.data.companyType:'';
          this.info.num = res.data.num?res.data.num:'';
          this.info.ext2 = res.data.ext2?res.data.ext2:'';
          this.info.companyLogo = res.data.companyLogo?res.data.companyLogo:'';
          this.keyWords = res.data.fields?res.data.fields.split(";"):'';
          this.companyAbout1 = res.data.companyAbout?res.data.companyAbout:'';
          if (res.data.companyAbout&&res.data.companyAbout.length > 200) {
            this.textFlag = true
          } else {
            this.textFlag = false
          }
          this.$http({
            method: 'get',
            url: '/v1/admin/fields',
            data: {}
          }).then((res) => {
            this.fieldsArr = [];
            let keyWords = this.keyWords;
            res.data.forEach((item) => {
              keyWords.forEach((value) => {
                if (value === item.id) {
                  this.fieldsArr.push(item.name)
                }
              })
            })
          })
        })
      },
      onChange($event, area, i) {
        this.$set(area, 'checked', $event.target.checked);
      },
//      selectAreas(){
//        let selectField = this.areaMap.filter(area => area.checked).map(area => area.id);
//        this.selection = selectField;
//        if (selectField.length == 0){
//          this.$f7.alert("请至少选择一个关注领域", "认证失败");
//          return false
//        } else {
//          this.$http.get('v1/admin/fields', {params: {selectField}}).then((res) => {
//            res.data.forEach((value, index) => {
//              this.selection.forEach((item, index) => {
//                if (item == value.id) {
//                  if (this.type == '1') {
//                    this.selectionCh.push(value.name)
//                  } else {
//                    this.selectionCh1.push(value.name)
//                  }
//                }
//              })
//            })
//          });
//          this.areaBoolean = false
//        }
//      },

//      点击完成编辑
      vim(){
        this.changeFlag = true;
        this.companyAboutFlag = false;
        this.companyFlag = false;
        if (this.companyAbout1.length > 200) {
          this.textFlag = true;
        }
        this.$http({
          method: 'post',
          url: '/v1/company/update',
          data: {
            id: this.info.id,
            name: this.info.name,
            industry: this.info.industry,
            companyAbout: this.info.companyAbout,
            companyType: this.info.companyType,
            num: this.info.num,
            ext2: this.info.ext2,
            companyLogo: this.info.companyLogo
          }
        }).then((res)=>{
          this.getFields();
        })
      },
//     点击编辑主页
      changeHome(){
        this.companyAboutFlag = true;
        this.changeFlag = false;
        this.textFlag = false;
        this.companyFlag = true;
      },
      loose(){
        this.footerFlag = true
      },
      getpoint(){
        this.footerFlag = false
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
      addLinkman() {
        this.karoakeFlag = false;
        this.contactors.push({
          name: '',
          telephone: '',
          email: '',
          postion: '',
          domain: '',
          addr: ''
        })
      },


//      点击每个需求查看详情
      clickDemandList(info){
        this.boolean = true;
        this.companyList.id = info.id;
        this.companyList.addr = info.addr ;  //所在地
        this.companyList.title = info.title;  //名称
        this.companyList.demandPhase = info.demandPhase;   //需求阶段code
        this.companyList.price = info.price;//金额
        this.companyList.ext2 = info.ext2;
        this.companyList.demandInfo = info.demandInfo;//需求简介
        this.companyList.addr = info.addr
      },
//      提交需求
      thinkTank(){
        this.$http({
          method: 'post',
          url: '/v1/phase/update',
          data: {
            'id': this.companyList.id,     //ID
            'addr': this.companyList.addr,   //所在地
            'title': this.companyList.title,   //名称
            'demandPhase': this.companyList.demandPhase,   //需求阶段code
            'price': this.companyList.price,  //金额
            'ext2': this.companyList.ext2,
            'demandInfo': this.companyList.demandInfo,  //需求简介
          }
        }).then((res) => {
          this.boolean = false;
          this.infoList = [];
          this.infoLists = [];
          this.requirements()

        })
      },
      popularize(id){
        this.boolean = true
      },
//      需求
      clickDemand(){
        this.demandFlag = true;
        this.homeFlag = false;
        this.contactFlag = false;
        this.requirements()
      },
//      主页
      clickHome(){
        this.demandFlag = false;
        this.homeFlag = true;
        this.contactFlag = false;
      },
//      联系人
      clickContacts(){
        this.demandFlag = false;
        this.homeFlag = false;
        this.contactFlag = true;
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
          this.infoList = res.data.data;
          if( this.infoList<=0){
            this.generalize = false
          }else{
            this.generalize = true
          }
        });
        this.$http({
          method: 'post',
          url: '/v1/phase/list',
          data: {
            'companyId': this.oldId,
            'ban': 0
          }
        }).then((res) => {
          this.infoLists = res.data.data;
          if(this.infoLists.length <= 0){
            this.generalize1 = false
          }else{
            this.generalize1 = true
          }
        });
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
            this.infoList = [];
            this.requirements();
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
            this.infoList = [];
            this.requirements();
          })
        }
      },
//      更改头像
      chooseImage(){
        let urlIp = encodeURIComponent(window.location.href.split('#')[0]);
        this.$http.get('/v1/wechat/jsSignature?url=' + urlIp).then((res) => {
          let resData = res.data.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: resData.appId,
            timestamp: resData.timestamp,
            nonceStr: resData.noncestr,
            signature: resData.sign,
            jsApiList: ['chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(() => {
            let images = {
              localId: '',
              serverId: '',
            };
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
              success: (res) => {
                images.localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                this.info.companyLogo = res.localIds[0];
                wx.uploadImage({
                  localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: (res) => {
                    images.serverId = res.serverId; // 返回图片的服务器端ID
                    this.$http({
                      method: 'post',
                      url: '/v1/wechat/headImg',
                      data: {
                        'itemId': this.oldId,
                        'type': 2,
                        'mediaId': res.serverId
                      }
                    }).then((res) => {
                      let pathImg = res.data.data;
                      this.info.companyLogo = 'http://120.55.191.189:9002/v1/expert/getimage?path=' + pathImg
                    })
                  }
                })
              }
            })
          })
        })
      },
      loadedMore(){
        this.showNum = 1000000*1000000;
        this.showFlag = false
      },
      packup(){
        this.showNum = 200;
        this.showFlag = true
      },

    },
    mounted(){
      this.oldId = this.$store.oId;
      this.userId = this.$store.userId;
      this.getFields();
      this.getContact()
    }
  }
</script>
