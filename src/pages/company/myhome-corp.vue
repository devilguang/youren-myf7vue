<style>
  .page>.subnavbar{
    top:0;
    margin-top: 55px;
  }
  .listItem:last-child{
    padding-bottom: 100px;
  }
  .card:nth-child(n+1){
    margin-top: 20px;
  }
  .Meeting .card{
    margin-bottom: 0;
  }
  .content-block{
    padding-bottom: 50px;
  }
</style>
<template>
  <f7-page with-subnavbar no-page-content class="Meeting ">
      <f7-navbar back-link="Back" title="主页" sliding></f7-navbar>
    <f7-subnavbar >
      <f7-buttons>
        <f7-button tab-link="#tab1">需求列表</f7-button>
        <f7-button tab-link="#tab2" active>企业主页</f7-button>
        <f7-button tab-link="#tab3">联系人</f7-button>
      </f7-buttons>
    </f7-subnavbar>


    <f7-tabs swipeable>
      <f7-page-content id="tab1" tab style="margin-top: 103px">
        <f7-block-title class="color-black"> 推广中</f7-block-title>
        <f7-list>
          <f7-list-item v-for="info in infoList.filter(info=>info.enable)" :key="info.id" >
            <div class="flex-left flex-top">
              <img :src="info.media" alt="" style="width: 80px; height:80px; margin-right: 10px;">
              <div class="unit">
                <div class="info-title">{{info.title}}</div>
                <p class="info-misc">{{info.desc}} </p>
                <div class="info-misc flex-right flex-middle" style="text-align: right;">
                  <f7-input name="switch" type="switch" @change="" v-model="info.enable"></f7-input>
                  <span style="white-space: nowrap; margin-left: 10px;">下架</span>
                </div>
              </div>
            </div>
          </f7-list-item>
        </f7-list>

        <f7-block-title class="color-black" > 已下架</f7-block-title>
        <f7-list>
          <f7-list-item  class="listItem"  v-for="info in infoList.filter(info => !info.enable)" :key="info.id">
            <div class="flex-left flex-top">
              <img :src="info.media" alt="" style="width: 80px; height:80px; margin-right: 10px;">
              <div class="unit">
                <div class="info-title">{{info.title}}</div>
                <p class="info-misc">{{info.desc}} </p>
                <div class="info-misc flex-right flex-middle" style="text-align: right;">
                  <f7-input name="switch" type="switch" @change="" v-model="info.enable"></f7-input>
                  <span style="white-space: nowrap; margin-left: 10px;">上架</span>
                </div>
              </div>
            </div>
          </f7-list-item>
        </f7-list>
      </f7-page-content>


      <!--企业的主页信息-->
      <f7-page-content id="tab2" tab active>
        <div class="card-wrapper" style="margin-top: 103px">
          <f7-card class="flex-left flex-middle">
            <img class="info-avatar" src="/static/img/avatar-unit1.png"
                 style="height: 100px; width: 100px; margin-right: 15px;"/>
            <div class="info-inner">
              <div class="info-title color-blue" style="font-size: 16px;">{{info.name}}</div>
              <div>
                <span style="margin-right: 10px;">{{info.companyType}}</span>|
                <span style="margin-left: 10px;">{{info.num}}</span>
              </div>
            </div>
          </f7-card>
        </div>

        <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 所属领域</f7-block-title>
        <div class="content-block">
          <div class="content-block-inner" style="text-indent: 2em;">
              <span v-for="value in fieldsArr" style="margin-left: 10px">{{value}}</span>
          </div>
        </div>

        <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 企业简介</f7-block-title>
        <div class="content-block">
          <div class="content-block-inner" style="text-indent: 2em;">
            {{info.companyAbout}}
          </div>
        </div>
      </f7-page-content>

      <f7-page-content id="tab3" tab style="margin-top: 103px">
        <f7-block-title>联系人</f7-block-title>

        <!--增加联系人-->
        <f7-card v-for="(item, index) in contactors" :key="item.id">
          <f7-card-content >
            <form class="list-block inputs-list">
              <div v-show="item.id != 0" class="fa fa-edit fa-lg"
                   style="position: absolute; top:0px; right: 0px; z-index:100" @click="recompose()"></div>
              <ul>
                <li>
                  <div class="item-content" style="position: relative;">
                    <div class="item-inner">
                      <div class="item-title label">姓名</div>
                      <div class="item-input item-input-field">
                        <input type="text" placeholder="" v-model="item.name" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                    <div class="item-inner">
                      <div class="item-title label">电话</div>
                      <div class="item-input item-input-field">
                        <input   type="tel" placeholder="" v-model="item.phone" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                    <div class="item-inner">
                      <div class="item-title label">邮箱</div>
                      <div class="item-input item-input-field">
                        <input type="text" placeholder="" v-model="item.email" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                    <div class="item-inner">
                      <div class="item-title label">职位</div>
                      <div class="item-input item-input-field">
                        <input type="text" placeholder="" v-model="item.title"/>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </f7-card-content>
        </f7-card>
        <f7-block>
          <f7-button style="margin-bottom: 50px" @click="addLinkman()">新增联系人</f7-button>
        </f7-block>
      </f7-page-content>

    </f7-tabs>
    <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;z-index:100;display: flex" >
      <f7-button  style="width:80px;height:60px;color:#000;flex:1"
                  href="/mymeeting-corp">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">会议约见</p>
      </f7-button>
      <f7-button  style="width:80px;height: 60px;color:#000;flex:1"
                  href="/recommend-corp">
        <p  style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p  style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button  style="width:80px;height:60px;color:#000;flex:1"
                  href="/myhome-corp">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x color-blue"></i></p>
        <p  style="margin-top: -25px;" class="color-blue">主页 </p>
      </f7-button>
      <f7-button  style="width:80px;height:60px;color:#000;flex:1"
                  href="/myaccount-corp">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x" style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>
<script>
  let autoID = 0;
  export default {
    data() {
      return {
        info: {},
        fieldsArr:[],   //所属领域
        keyWords:[],
        infoList: [
          {
            id: 1,
            title: '微通道换热器应用于制冷系统（干式）',
            number: 'N128745613',
            step: '研发',
            area: '北京',
            money: '50万',
            keywords: ['机械', '涡轮', '建模'],
            desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
            corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
            media: '/static/img/corp1.jpg',
            enable: true,
          },
          {
            id: 2,
            title: '微通道换热器应用于制冷系统（干式）',
            number: 'N128745613',
            step: '研发',
            area: '北京',
            money: '50万',
            keywords: ['机械', '涡轮', '建模'],
            desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
            corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
            media: '/static/img/corp2.jpg',
            enable: false,
          },
          {
            id: 3,
            title: '微通道换热器应用于制冷系统（干式）',
            number: 'N128745613',
            step: '研发',
            area: '北京',
            money: '50万',
            keywords: ['机械', '涡轮', '建模'],
            desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
            corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
            media: '/static/img/corp1.jpg',
            enable: true,
          },
          {
            id: 4,
            title: '微通道换热器应用于制冷系统（干式）',
            number: 'N128745613',
            step: '研发',
            area: '北京',
            money: '50万',
            keywords: ['机械', '涡轮', '建模'],
            desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
            corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
            media: '/static/img/corp2.jpg',
            enable: false,
          },
        ],
        contactors: [],  //联系人信息
        oldId:'',
        userId:''
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
      getFields(){
          this.$http({
            method:'get',
            url:'v1/company/'+this.oldId,
            data:{}
          }).then((res)=>{
            this.info = res.data
            this.keyWords = res.data.fields.split(';')
            this.$http({
              method:'get',
              url:'/v1/admin/fields',
              data:{}
            }).then((res)=>{
              res.data.forEach((item,index)=> {
                this.keyWords.forEach((value,$index)=> {
                  if(value === item.id){
                    this.fieldsArr.push(item.name)
                  }
                })
              })
            })
        })
      },
      getContact(){
        console.log("我进这个了吗")
        console.log(this.userId+"我是用户的ID")
        this.$http({
          method:'get',
          url:'/v1/user/contacts/'+this.userId,
          data:{}
        }).then((res)=>{
            console.log(res.data)
//          this.linkmans = res.data
        })
      },
      recompose() {
          this.disabledInput = true
      },
      addLinkman() {
        this.contactors.push({
          name: '',
          telephone: '',
          email: '',
          postion: '',
          domain:''
        })
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
