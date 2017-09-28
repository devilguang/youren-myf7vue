<style lang="scss" scoped>
  .mediaImg {
    width: 80px;
  }

  .close {
    width: 15%;
    height: 56px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100000;
  }
  .cardBj{
    width:100%;
    height:180px;
    background:#3982e8;
    position: absolute;
  }
</style>
<template>
  <f7-page class="Recommend">
    <f7-navbar title="推荐需求" back-link="Back" sliding></f7-navbar>
    <div style="clear: both"></div>
    <div class="page-content infinite-scroll" style="height: 5.65rem;">
      <div class="card-wrapper" style="margin-top:56px;margin-bottom: 0.2rem">
        <f7-list media-list v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                 infinite-scroll-distance="10">
          <f7-list-item v-for="info in infoList" :key="info.id"
                        :title="info.title" :subtitle="'<br>'"
                        :text="info.demandInfo" ref="chemical" @click="nextStep(info.id)"
                        :media="'<img src='+info.pictureUrl+' '+ 'height='+80+' '+ 'width='+100+'/>'"
                        class="listItemDmain">
          </f7-list-item>
        </f7-list>
      </div>
    </div>
    <loading-bar v-if="loadingFlag"></loading-bar>
    <f7-popup :opened="boolean" style="background: #efeef4">
      <f7-navbar title="需求详情" back-link="Back" href="#" sliding></f7-navbar>
      <div class="close" @click="boolean = false"></div>
      <div class="cardBj"></div>
      <div class="card-wrapper">
        <f7-card class="flex-vertical" style="border-radius: 8px">
          <div class="info-title color-blue" style="font-size: 14px;margin-left: 30px;margin-top: 20px"><i class="fa fa-dot-circle-o fa-lg color-blue" style="margin-right: 10px"></i>{{info.title}}
          </div>
          <div class="flex-between flex-middle">
            <div class="info-content" style="margin-left: 30px;margin: 5px 14px">
              <p class="info-misc" style="margin: 5px 14px">编号: {{info.code}} </p>
              <p class="info-misc"  style="margin: 5px 14px">需求阶段: {{info.demandPhase}} </p>
              <p class="info-misc"  style="margin: 5px 14px">所在地: {{info.addr}} </p>
              <p class="info-misc"  style="margin: 5px 14px">金额: {{info.price}} </p>
              <p class="color-red" style="font-size: 12px;margin: 5px 14px">关键词:{{info.industry}} </p>
            </div>
            <img class="info-media" :src="info.pictureUrl" style="width: 130px; height: 80px;margin-right: 10px"/>
          </div>
        </f7-card>
      </div>
      <div style=" width:100%;background: #ffffff;padding: 10px 0;border-bottom: 1px solid #bfbfbf"><i
        class="fa fa-file-text fa-lg color-blue" style="margin-left: 10px;margin-right: 5px;"></i> 需求简介
      </div>
      <f7-block style="text-indent: 2em;background: #ffffff;margin: 0;padding-bottom: 30px;line-height: 28px;color: #666666;">{{info.demandInfo}}</f7-block>

      <div style=" width:100%;background: #ffffff;padding: 10px 0;border-bottom: 1px solid #bfbfbf;margin-top: 10px"><i
        class="fa fa-file-text fa-lg color-blue" style="margin-left: 10px;margin-right: 5px;"></i> 企业信息
      </div>

      <f7-block style="text-indent: 2em;padding-bottom: 30px;line-height: 25px;color: #666666;" v-if="companyAbout.length>0">{{companyAbout}}</f7-block>

      <div style="text-align: center;margin-bottom: 0.1rem;background: #ffffff;padding: 30px 0 30px 0 " v-else>暂无数据
      </div>
      <f7-block >
        <f7-button round :color="buttonText == '立即联系' ? 'blue' : 'orange'" fill :disabled="buttonText != '立即联系'"
                   @click="initiateContact(info,info.id)">{{buttonText}}
        </f7-button>
      </f7-block>
    </f7-popup>
    <div style="position: fixed;bottom:0;width: 100%;height:60px;z-index:100;display: flex">
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff"
                 href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -30px">会议约见</p>
      </f7-button>
      <f7-button style="height: 60px;color:#000;flex:1;background:#ffffff"
                 href="/recommend-user">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x color-blue"></i></p>
        <p style="margin-top: -25px" class="color-blue">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff"
                 href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x color-blue" style="color:#999;"></i></p>
        <p style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button style="height:60px;color:#000;flex: 1;background:#ffffff"
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
    components: {
      loadingBar
    },
    data() {
      return {
        buttonText: "立即联系" || " 约见安排中..." || "已安排约见" || "已完成",
        infoList: [],
        _expertId: '',
        demandId: '',
        busy: false,
        pageNum: 1,
        boolean: false,
        info: [],
        companyAbout: "", //企业信息,
        price: '',
        touserId: '',
        loadingFlag:false
      }
    },
    methods: {
      loadMore(){
        this.busy = true;
        this.$http({
          method: 'post',
          url: 'v1/expert/suggests',
          data: {
            "pageIndex": this.pageNum,
            "pageSize": "10",
            "orderProperty": "chatNum",
            "orderType": "asc",
            "expertId": this._expertId
          }
        }).then((res) => {
          this.loadingFlag = false;
          let collectItems = res.data.data.data;
          if (collectItems.length > 0) {
            collectItems.forEach((item) => {
              this.infoList.push(item)
            })
          } else {
            return
          }
          this.busy = false;
          this.pageNum++;
        })
      },
      nextStep(id){
        this.$store.lId = id;
        this.boolean = true;
        this.loadingFlag = true;
        this.demandAixos(id);
      },
      demandAixos(id){
        this.info= [];
        this.$http.get('/v1/phase/id/' + id).then((res) => {
          this.loadingFlag = false;
          this.info = res.data.data;
          this.price = res.data.data.price;
          if (this.info.busCompany == null) {
            this.companyAbout = ''
          } else {
            this.companyAbout = res.data.data.busCompany.companyAbout;
          }
        })
      },
      initiateContact(info, id){
        let meetime = this.$store.getNowFormatDate();
        const self = this;
        this.$f7.confirm('您是否对该需求感兴趣，确定后系统将发送您的基本信息给对方。', '立即联系', () => {
          this.$http({
            method: 'post',
            url: '/v1/appoint/appointadd',
            data: {
              'type': 3,
              'appointType': 2,
              'itemId': id,
              'message': '立即联系',
            }
          }).then((res) => {
            if (res.data.status == 1) {
              this.$f7.alert('认证失败', res.data.message);
              return;
            }
            if (res.data.errno == '1') {
              this.$f7.alert(res.data.message + "，请前往主页完善个人信息!", '提示')
              return
            }
            if (res.data.errno == 3) {
              this.$f7.confirm('您已预约此需求，您可以前往约见中查看进度！', '提示', () => {
                this.boolean = false;
                this.$router.load({url: '/mymeeting-user'});
              });
              return
            }
            this.$f7.confirm('系统正在为您安排约会，稍后会有技术经纪人与您联系，您可以在“约会”查看进度。', '约会安排中', () => {
              this.buttonText = "约见安排中";
              this.boolean = false;
              this.$router.load({url: '/mymeeting-user'});
              //专家点击立即联系发送模板消息
              this.$http({
                method: 'post',
                url: '/v1/wechat/sendMsg',
                data: {
                  touserId: this.touserId,
                  type: 1,
                  meetName: '电话约见',
                  meetTime: meetime,
                  place: " ",
                  url: 'http://m.youren.ai/#/recommend-user'
                }
              })
            })
          })
        })
      }
    },
    mounted(){
      this._expertId = this.$store.oId;
      this.touserId = this.$store.userId;
      this.loadingFlag = true
    }
  }
</script>
































