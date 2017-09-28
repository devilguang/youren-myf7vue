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
    background-image: url("../../assets/img/123.png");
    background-size: 100% 190px;
    background-repeat: no-repeat;
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

  .content-block-title {
    padding-top: 0;
  }

  .content-block {
    /*padding-bottom: 20px;*/
  }

  .listItem:nth-child(1) {
    margin-top: 60px;
  }
</style>

<template>
  <f7-page class="Meeting" name="recommend-corp">
    <f7-navbar title="推荐专家" back-link="Back" sliding></f7-navbar>
    <loading-bar v-if="loadingFlag"></loading-bar>
    <div class="page-content infinite-scroll">
      <f7-list style="margin: 56px 0">
        <f7-list-item v-for="(info,$index) in infoList" :key="info.id" class="listItem">
          <div class="info-content flex-vertical flex-center flex-middle"
               style="width: 100px; max-width: 120px; text-align: center; background: #ecf3fe;">
            <img class="info-midea" alt="" v-if="info.headImg!==''" :src="info.headImg"
                 style="width: 60px; height:60px;">
            <img alt="" v-else :src="baseImg" style="width: 60px; height:60px;">
            <div class="info-title">{{info.name}}</div>
          </div>
          <div class="info-content unit">
            <p class="info-title color-blue">{{info.college}} {{info.subunit}} {{info.professionalTitle}}</p>
            <p class="info-text">方向： {{info.researchDirect}}</p>
            <p class="info-text">行业： {{info.field}}</p>
            <p class="flex-around" style="margin-top: .5em;">
              <f7-button color="blue" class="mini-button" fill round @click="viewDetails(info,$index)">查看详情</f7-button>
              <f7-button color="orange" class="mini-button" fill round @click="nextStep(info,$index)">立即联系
              </f7-button>
            </p>
          </div>
        </f7-list-item>
        <div style="margin-bottom: 100px"></div>
      </f7-list>
    </div>
    <!--点击查看详情弹出专家的详细列表-->
    <f7-popup :opened="boolean">
      <!-- Popup content goes here -->
      <!--back-link="Back"-->
      <f7-navbar title="专家详情" back-link="Back" href="#" sliding></f7-navbar>
      <div class="close" @click="boolean = false"></div>
      <div class="page-content infinite-scroll" style="height: 5.05rem;margin-top: 0">
        <div class="card-wrapper headBj"
             style="width:100%;margin: 0 auto;height: 190px;text-align:center;border-radius:0;width: 100%;margin: 0">
          <img class="info-avatar" v-if="person.headImg" :src="person.headImg"
               style="height: 110px; width: 110px;border-radius: 50%;margin-top: 10px;border: 3px solid #ffffff;"/>
          <img class="info-avatar" v-else :src="baseImg"
               style="height: 110px; width: 110px;border-radius: 50%;margin-top: 10px;border: 3px solid #ffffff;"/>
          <div class="info-inner">
            <div class="info-title color-blue" style="font-size: 16px;"></div>
            <div>
            </div>
          </div>
          <p style="color:#2196f3;margin-top:0px;font-weight: bold">{{person.name}}</p>
          <p style="margin-top: -10px"><span>{{person.college}}</span><span
            style="margin-left: 5px">{{person.department}}</span><span
            style="margin-left: 5px">{{person.professionalTitle}}</span></p>
        </div>
        <f7-block-title><i class="fa fa-dot-circle-o fa-lg color-blue" style="margin-right: 10px"></i>所在领域
        </f7-block-title>
        <f7-block inner style="text-indent: 2em;padding-bottom: 0">
          <p>{{person.researchDirect}}</p>
          <p style="margin-top: 10px"><span v-for="value in array">{{value }}</span></p>
        </f7-block>
        <f7-block-title><i class="fa fa-file-text fa-lg color-blue" style="margin-right: 10px"></i>个人信息</f7-block-title>
        <f7-block inner style="text-indent: 2em;">
          {{person.intro}}
        </f7-block>
        <f7-block-title><i class="fa fa-file-text fa-lg color-blue" style="margin-right: 10px"></i>研究论文</f7-block-title>
        <ul v-if="paperList.length>0" style="width: 90%;margin-left: -3%">
          <li v-for="info in filterPaperList" :key="info.id"
              style="list-style-type:square;color:#759fe9;border-bottom: 1px solid #727272">
            <h4 style="color: #000;">{{info.title}}</h4>
            <div style="font-size: 14px;color: #000;">{{"作者：" + info.groupAuthor}}</div>
            <div style="font-size: 12px;color:#727272;margin-bottom: 10px;margin-top: 5px">{{'发布年份：' + info.publishYear}} <span>{{'-&nbsp被引量 ' + info.citeCount}}</span>
            </div>
          </li>
        </ul>
        <ul v-else style="width: 90%;margin-left: -3%;text-align: center;list-style: none">
          <li>暂无数据</li>
        </ul>
        <div v-if="paperList.length>5">
          <div class="color-blue" style="text-align: center" v-if="showFlag" @click="lookMore">查看更多<i
            class="fa fa-angle-double-down fa-1x" style="margin-left: 5px"></i></div>
          <div class="color-blue" style="text-align: center" v-if="!showFlag" @click="packUp">收起<i
            class="fa fa-angle-double-up fa-1x" style="margin-left: 5px"></i></div>
        </div>
        <f7-block-title><i class="fa fa-file-text fa-lg color-blue" style="margin-right: 10px"></i>项目成果</f7-block-title>
        <f7-block inner style="text-indent: 2em;" v-if="achievement">
          {{achievement}}
        </f7-block>
        <f7-block inner style="text-indent: 2em;text-align: center" v-else>
          暂无数据
        </f7-block>

      </div>
      <div style="background: #ffffff;width: 100%;height: 40px;position: fixed;bottom: 0px;z-index: 100">
        <f7-button style="width: 100%;margin-left:0%;height: 40px;line-height: 40px;font-size: 0.15rem" round
                   :color="buttonText == '立即联系' ? 'blue' : 'orange'" fill :disabled="buttonText != '立即联系'"
                   @click="immediately(person,person.id)">{{buttonText}}
        </f7-button>
      </div>
    </f7-popup>


    <div style="position: fixed;bottom:0;width: 100%;height:60px;z-index:100;display: flex">
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/mymeeting-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">会议约见</p>
      </f7-button>
      <f7-button style="height: 60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/recommend-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x color-blue"></i></p>
        <p style="margin-top: -25px" class="color-blue">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/myhome-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/myaccount-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x " style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>
<script>
  import loadingBar from '../../components/loadingBar.vue'
  export default {
    name: 'recommendCorp',
    components: {loadingBar},
    data() {
      return {
        baseImg: '../../../static/imgs/img-professor.jpg',
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
        userId: '',
        achievement: '',
        paperList: [],
        showNum: 5,
        showFlag: true,
        loadingFlag: true
      }
    },
    computed: {
      filterPaperList(){
        return this.paperList.slice(0, this.showNum)
      }
    },
    methods: {
      cropGetAixos(){
        this.$http({
          method: 'get',
          url: 'v1/recommend/list?companyId=' + this.oId,
          data: {}
        }).then((res) => {
          this.loadingFlag = false;
          this.infoList = res.data.data;
          this.infoList.forEach((value, index) => {
            if (value.field) {
              this.$set(value, 'field', value.field.split(";").map(item => this.bus[item]).join(","));
            }
          })
        })
      },
//    点击立即联系的时候
      nextStep(info, index){
        const self = this;
        this.$f7.confirm('您是否对该专家感兴趣，确定后系统将发送您的基本信息给对方。', '立即联系', () => {
          let address = info.address;
          this.$store.firmInfo.push(this.infoList[index].id);
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
              this.$f7.alert(res.data.message, '提示',)
            }
            if (res.data.errno == '1') {
              this.$f7.alert(res.data.message + "，请前往主页完善个人信息!", '提示');
              return;
            }
            if (res.data.errno == 3) {
              this.$f7.alert('已预约此专家，您可以支付进行约见！', '提示', () => {
                this.$router.load({url: '/mymeeting-corp'});
              })
            } else {
              this.$f7.alert('系统正在为您安排约会，稍后会有技术经纪人与您联系，您可以在“约会”查看进度。', '约会安排中', () => {
                this.$router.load({url: '/mymeeting-corp'});
                this.sendNews(address)
              })
            }
          });
        })
      },
      immediately(person, id){
        let address = person.address;
        let oid = id;
        const self = this;
        this.$f7.confirm('您是否对该专家感兴趣，确定后系统将发送您的基本信息给对方。', '立即联系', () => {
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
              this.$f7.alert('认证失败', res.data.message);
            }
            if (res.data.errno == '1') {
              this.$f7.alert(res.data.message + "，请前往主页完善个人信息!", '提示')
            } else {
              this.$f7.alert('系统正在为您安排约会，稍后会有技术经纪人与您联系，您可以在“约会”查看进度。', '约会安排中', () => {
                this.buttonText = "约见安排中";
                this.sendNews(address);
                this.$router.load({url: '/mymeeting-corp'})
              })
            }
          });
        })
      },
      //点击查看详情
      viewDetails(info, index){
        let id = info.id;
        this.boolean = true;
        this.buttonText = "立即联系";
        this.person = this.infoList[index];
        if (this.infoList[index].field) {
          this.keyWord = this.infoList[index].field.split(';')
        } else {
          this.keyWord = []
        }
        this.$http({
          method: 'get',
          url: '/v1/admin/fields',
          data: {}
        }).then((req) => {
          this.array.splice(0, this.array.length);
          req.data.forEach((item, index) => {
            this.keyWord.forEach((value, index) => {
              if (value === item.id) {
                this.array.push(item.name)
              }
            })
          })
        });
        this.expertThesis(id);
        this.expertsResults(id)
      },
      getBus(){
        this.$http.get('/v1/dict/type/bus').then((res1) => {
          this.bus = res1.data
        })
      },
//      点击立即联系的时候发送模板消息
      sendNews(address){
        let meetTime = this.$store.getNowFormatDate();
        this.$http({
          method: 'post',
          url: '/v1/wechat/sendMsg',
          data: {
            touserId: this.userId, //消息接收人id（必须）
            type: 1,
            meetName: '电话约谈',
            meetTime: meetTime,
            place: address ? address : ' ',
            url: 'http://m.youren.ai/#/recommend-user'
          }
        })
      },
//      查询专家论文
      expertThesis(id){
        this.$http.get('/v1/expert/paper/' + id).then((res) => {
          this.paperList = res.data.data;
        })
      },
      //专家成果
      expertsResults(id){
        this.$http.get('/v1/expert/achievement/' + id).then((res) => {
          this.achievement = res.data.achievement
        })
      },
      lookMore(){
        this.showNum = this.paperList.length;
        this.showFlag = false
      },
      packUp(){
        this.showNum = 5;
        this.showFlag = true
      }
    },
    mounted() {
      this.getBus();
      this.oId = this.$store.oId;
      this.userId = this.$store.userId;
      this.cropGetAixos()
    }
  }
</script>
































