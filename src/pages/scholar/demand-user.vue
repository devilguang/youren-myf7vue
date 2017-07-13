<template>
  <f7-page class="Meeting">
    <div v-cloak="true">
      <f7-navbar title="推荐需求" back-link="Back" sliding></f7-navbar>
    </div>
    <div class="card-wrapper">
      <f7-card class="flex-vertical">
        <div class="info-title color-blue" style="font-size: 14px;">{{info.title}}</div>
        <div class="flex-between flex-middle">
          <div class="info-content">
            <p class="info-misc">编号: {{info.code}} </p>
            <p class="info-misc">需求阶段: {{info.demandPhase}} </p>
            <p class="info-misc">所在地: {{info.addr}} </p>
            <p class="info-misc">金额: {{info.price}} </p>
            <p class="color-red" style="font-size: 12px;">关键词:{{info.industry}} </p>
          </div>
          <img class="info-media" :src="info.pictureUrl" style="width: 130px; height: 80px;"/>
        </div>
      </f7-card>
    </div>
    <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 需求简介</f7-block-title>
    <f7-block inner style="text-indent: 2em;">
      {{info.demandInfo}}
    </f7-block>

    <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 企业信息</f7-block-title>
    <f7-block inner style="text-indent: 2em;" v-text="companyAbout">
    </f7-block>

    <f7-block style="margin-bottom: 200px">
      <f7-button round :color="buttonText == '立即联系' ? 'blue' : 'orange'" fill :disabled="buttonText != '立即联系'"
                 @click="nextStep(info)">{{buttonText}}
      </f7-button>
    </f7-block>
    <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;height:60px;z-index:100;display: flex" >
      <f7-button  style="height:60px;color:#000;flex:1"
                  href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -30px">会议约见</p>
      </f7-button>
      <f7-button  style="height: 60px;color:#000;flex:1"
                  href="/recommend-user">
        <p  style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p  style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button  style="height:60px;color:#000;flex:1"
                  href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x"style="color:#999;"></i></p>
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
    components: {},
    data() {
      return {
        info: [ ],
        firmList: [],
        buttonText: "立即联系" || " 约见安排中..." || "已安排约见" || "已完成",
        //放入企业的ID
        companyAbout: "", //企业信息
        firmId:'',
        userId:'',
        price:'',
        touserId:''
      }
    },
    methods: {
      nextStep(info){
          console.log(info)
            this.$http({
              method:'post',
              url:'/v1/appoint/appointadd',
              data:{
                'type':3,
                'appointType':2,
                'itemId':this.userId,
                'message':'立即联系',
              }
            }).then((res)=>{
              if(res.data.status==1){
                this.$f7.alert('认证失败',res.data.message)
              }else{
                let meetime = this.$store.getNowFormatDate()
                const self = this;
                this.$f7.confirm('您是否对该需求感兴趣，确定后系统将发送您的基本信息给对方。', '立即联系', () => {
                  this.$f7.alert('系统正在为您安排约会，稍后会有技术经纪人与您联系，您可以在“约会”查看进度。', '约会安排中', () => {
                    this.buttonText = "约见安排中"
                     //专家点击立即联系发送模板消息
                    this.$http({
                      method: 'post',
                      url: '/v1/wechat/sendMsg',
                      data: {
                        touserId: this.touserId,
                        type: 1,
                        meetName: '电话约见',
                        meetTime: meetime,
                        place: "电话",
                        url: '/recommend-user'
                      }
                    })
                  })
                })
              }
            })
      },
      demandAixos(){
        this.$http.get('/v1/phase/id/'+this.userId).then((res) => {
          this.info = res.data.data
          this.price = res.data.data.price
          if(this.info.busCompany == null){
            this.companyAbout = ''
          }else{
            this.companyAbout = res.data.data.busCompany.companyAbout
          }
        })
      },
    },
    mounted(){
      this.userId = this.$store.lId        //需求id
      this.touserId =this.$store.userId   //用户的id
      this.demandAixos()
    }
  }
</script>
