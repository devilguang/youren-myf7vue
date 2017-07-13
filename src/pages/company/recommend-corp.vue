<style>
  .layOutExperts {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .close {
    width: 100%;
    height: 56px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100000;
  }

  .head {
    text-align: center;
    height: 200px;
    position: relative;
    background: rgba(0, 0, 0, .3);
  }

  .headBj {
    width: 100%;
    height: 200px;
    position: absolute;
    background-image: url("../../assets/img/avatar-dog.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: -1000;
    top: 0;
    left: 0;
    filter: blur(10px)

  }

  .head img {
    width: 104px;
    height: 103px;
    margin-top: 15px;
    background-size: 104px 103px;
    background-repeat: no-repeat;
  }

  .head .avatarName {
    margin-top: 0;
    color: #3982e8;
  }

  .avataDegree {
    margin-top: -10px;
  }

  .avataDegree span {
    margin-left: 10px;
  }

  .content-block {
    padding-bottom: 20px;
  }

  .listItem:nth-child(1) {
    margin-top: 60px;
  }
</style>

<template>
  <f7-page class="Meeting" name="recommend-corp">
    <f7-navbar title="推荐专家" back-link="Back" sliding></f7-navbar>
    <f7-list>
      <f7-list-item v-for="(info,$index) in infoList" :key="info.id" class="listItem">
        <div class="info-content flex-vertical flex-center flex-middle"
             style="width: 100px; max-width: 120px; text-align: center; background: #ecf3fe;">
          <img class="info-midea" alt="" :src="info.headImg" style="width: 60px; height:60px;">
          <div class="info-title">{{info.name}}</div>
        </div>
        <div class="info-content unit">
          <p class="info-title color-blue">{{info.college}} {{info.subunit}} {{info.professionalTitle}}</p>
          <p class="info-text">方向： {{info.researchDirect}}</p>
          <p class="info-text">行业： {{info.field}}</p>
          <p class="flex-around" style="margin-top: .5em;">
            <f7-button color="blue" class="mini-button" fill round @click="viewDetails($index)">查看详情</f7-button>
            <f7-button color="orange" class="mini-button" fill round @click="nextStep(info,$index)">立即联系
            </f7-button>
          </p>
        </div>
      </f7-list-item>
      <div style="margin-bottom: 100px"></div>
    </f7-list>

    <!--点击查看详情弹出专家的详细列表-->
    <f7-popup :opened="boolean">
      <!-- Popup content goes here -->
      <!--back-link="Back"-->
      <f7-navbar title="专家详情" back-link="Back" href="#" sliding></f7-navbar>
      <div class="close" @click="boolean = false"></div>
      <div class="card-wrapper" style="height: 220px;">
        <f7-card style="height: 220px;text-align: center">
          <img class="info-avatar" :src="person.headImg"
               style="height: 100px; width: 100px;border-radius: 50%;margin-top: 10px"/>

          <div class="info-inner">
            <div class="info-title color-blue" style="font-size: 16px;"></div>
            <div>
            </div>
          </div>
          <p style="">{{person.name}}</p>
          <p><span>{{person.college}}</span><span style="margin-left: 10px">{{person.department}}</span><span
            style="margin-left: 10px">{{person.professionalTitle}}</span></p>
        </f7-card>
      </div>
      <f7-block-title><i class="fa fa-dot-circle-o fa-lg color-blue"></i>所在领域</f7-block-title>
      <f7-block inner style="text-indent: 2em;">
        <p>{{person.researchDirect}}</p>
        <p style="margin-top: 10px"><span v-for="value in array">{{value }}</span></p>
      </f7-block>
      <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i>个人信息</f7-block-title>
      <f7-block inner style="text-indent: 2em;">
        {{person.intro}}
      </f7-block>
      <f7-block>
        <f7-button round :color="buttonText == '立即联系' ? 'blue' : 'orange'" fill :disabled="buttonText != '立即联系'"
                   @click="immediately(person,person.id)">{{buttonText}}
        </f7-button>
      </f7-block>
    </f7-popup>
    <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;height:60px;z-index:100;display: flex">
      <f7-button style="height:60px;color:#000;flex:1"
                 @click="$router.load({url:'/mymeeting-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">会议约见</p>
      </f7-button>
      <f7-button style="height: 60px;color:#000;flex:1"
                 @click="$router.load({url:'/recommend-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x color-blue"></i></p>
        <p style="margin-top: -25px" class="color-blue">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1"
                 @click="$router.load({url:'/myhome-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px;">主页 </p>
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
  export default {
    data() {
      return {
        infoList: [],
        boolean: false,
        buttonText: "立即联系" || " 约见安排中..." || "已安排约见" || "已完成",
        clickIndex: '',
        person: [],
        oId: '',
        keyWord: [],
        array: [],
        demains: [],
        bus: [],
        userId: ''
      }
    },
    methods: {
      cropGetAixos(){
        this.$http({
          method: 'get',
          url: 'v1/recommend/list?companyId=' + this.oId,
          data: {}
        }).then((res) => {
          this.infoList = res.data.data
          console.log(this.infoList)
          this.infoList.forEach((value, index) => {
            if (value.field) {
              this.$set(value, 'field', value.field.split(";").map(item => this.bus[item]).join(","))
            }
          })

        })
      },
//    点击立即联系的时候
      nextStep(info,index){
        let address = info.address
        this.$store.firmInfo.push(this.infoList[index].id)
        this.$http({
          method: 'post',
          url: '/v1/appoint/appointadd',
          data: {
            "type": 2,
            "itemId": this.infoList[index].id,
            "message": "专家约见！",
            "appointType": 2
          }
        }).then((res) => {
          if (res.data.status !== 0) {
            this.$f7.alert('认证失败', res.data.message)
          } else {
            const self = this;
            this.$f7.confirm('您是否对该专家感兴趣，确定后系统将发送您的基本信息给对方。', '立即联系', () => {
              this.$f7.alert('系统正在为您安排约会，稍后会有技术经纪人与您联系，您可以在“约会”查看进度。', '约会安排中', () => {
              })
            })
//            this.sendNews(address)
          }
        })

      },
      immediately(person,id){
        let address = person.address
        let oid = id
        this.$http({
          method: 'post',
          url: '/v1/appoint/appointadd',
          data: {
            "type": 2,
            "itemId": oid,
            "message": "专家约见！",
            "appointType": 2
          }
        }).then((res) => {
          if (res.data.status !== 0) {
            this.$f7.alert('认证失败', res.data.message)
          } else {
            const self = this;
            this.$f7.confirm('您是否对该专家感兴趣，确定后系统将发送您的基本信息给对方。', '立即联系', () => {
              this.$f7.alert('系统正在为您安排约会，稍后会有技术经纪人与您联系，您可以在“约会”查看进度。', '约会安排中', () => {
                this.buttonText = "约见安排中"
              })
            })
            this.sendNews(address)
          }
        })

      },
//    点击查看详情
      viewDetails(index){
        this.boolean = true
        this.buttonText = "立即联系"
        this.person = this.infoList[index]
        if (this.infoList[index].field) {
          this.keyWord = this.infoList[index].field.split(';')
        } else {
          this.keyWord = ''
        }
        this.$http({
          method: 'get',
          url: '/v1/admin/fields',
          data: {}
        }).then((req) => {
          this.array.splice(0, this.array.length)
          req.data.forEach((item, index) => {
            this.keyWord.forEach((value, index) => {
              if (value === item.id) {
                this.array.push(item.name)
              }
            })
          })
        })
      },
      getBus(){
        this.$http.get('/v1/dict/type/bus').then((res1) => {
          this.bus = res1.data

        })
      },
//      点击立即联系的时候发送模板消息
      sendNews(address){
        let meetTime = this.$store.getNowFormatDate()
        this.$http({
          method: 'post',
          url: '/v1/wechat/sendMsg',
          data: {
            touserId: this.userId, //消息接收人id（必须）
            type: 1,
            meetName: '电话约谈',
            meetTime: meetTime,
            place: address+'电话',
            url: '/recommend-user'
          }
        })
      }
    },
    mounted() {
      this.oId = this.$store.oId
      this.userId = this.$store.userId
      this.cropGetAixos()
      this.getBus()
    }
  }
</script>
































