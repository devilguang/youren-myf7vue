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
            <p class="color-red" style="font-size: 12px;">关键词:{{info.ext2}} </p>
          </div>
          <img class="info-media" src="/static/img/corp1.jpg" style="width: 130px; height: 80px;"/>
        </div>
      </f7-card>
    </div>
    <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 需求简介</f7-block-title>
    <f7-block inner style="text-indent: 2em;">
      {{info.demandInfo}}
    </f7-block>

    <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 企业信息</f7-block-title>
    <f7-block inner style="text-indent: 2em;" v-text="">
    </f7-block>

    <f7-block style="margin-bottom: 200px">
      <f7-button round :color="buttonText == '立即联系' ? 'blue' : 'orange'" fill :disabled="buttonText != '立即联系'"
                 @click="nextStep">{{buttonText}}
      </f7-button>
    </f7-block>

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
        companyAbout: "",  //企业信息
        firmId:'',
        userId:''
      }
    },

    methods: {
      nextStep(){
        const self = this;
        this.$f7.confirm('您是否对该需求感兴趣，确定后系统将发送您的基本信息给对方。', '立即联系', () => {
          this.$f7.alert('系统正在为您安排约会，稍后会有技术经纪人与您联系，您可以在“约会”查看进度。', '约会安排中', () => {
            this.buttonText = "约见安排中"
            this.$router.load({url: "/mymeeting-user/"+this.userId})
          })
        })
      },
      demandAixos(){
        this.$http.get('/v1/phase/id/'+this.userId).then((res) => {
          this.info = res.data.data
        })
      }
    },
    mounted(){
      this.userId = this.$route.params.id
      this.demandAixos()
    }
  }
</script>
