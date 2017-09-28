<style>
  .footer_btn {
    width: 80px;
    height: 40px;
    color: #ffffff;
  }

  .list-block {
    margin: 50px 0;
  }

  .btn {
    display: none;
  }

  .keyWord {
    width: 3rem;
    height: 40px;
    border: 0;
    font-size: 16px;
    resize: none;
    overflow-y: hidden;
  }

  .userName {
    color: #2196f3;
    font-size: 16px;
    width: 0.65rem;
    border: 0;
    display: inline-block;;
  }

  .userCollege {
    width: 1rem;
    border: 0;
    font-size: 15px;
  }

  .userDegree {
    border: 0;
    width: 3em;
    overflow: hidden;
    font-size: 15px;
  }

  .researchDirect {
    border: 0;
    width: 8em;
    font-size: 15px;
  }

  .disabled, [disabled] {
    background: #ffffff;
    opacity: 1;
    color: #343434;
  }

  .userIntro {
    width: 3.1rem;
    height: 3.2rem;
    text-indent: 2em;
    font-size: 15px;
    line-height: 24px;
    color: #333333;
    overflow-y: hidden;
    font-weight: 200;
    /*text-overflow: ellipsis;*/
    resize: none;
    border: 0;
    color: #343434;
  }

  .changeActive {
    border: 1px solid #cccccc;
    overflow-y: inherit;
    resize: vertical;
    color: #cccccc;
    resize: none;
  }

  .userLogo {
    width: 100px;
    height: 100px;
    background-size: 100px 100px;
    background-repeat: no-repeat;
    border-radius: 50%;
  }
</style>
<template>
  <!--with-subnavbar no-page-content   把这个去掉之后就可以滚动了但是还所有问题-->
  <f7-page class="Meeting">
    <f7-navbar title="个人中心" back-link="Back" sliding></f7-navbar>
    <loading-bar v-if="loadingFlag"></loading-bar>
    <div class="page-content infinite-scroll" style="height: 5.6rem;">
      <div class="card-wrapper" style="margin-top: 56px">
        <f7-card class="flex-left flex-middle" style="padding: 30px;display: flex">
          <img class="info-avatar" v-if="info.companyLogo" :src="info.companyLogo">
          <img class="userLogo" v-if="info.headImg" :src="info.headImg" style="flex:0 0 100px"/>
          <img class="userLogo" v-else :src="baseImg" alt="" style="flex:0 0 100px">
          <span
            style="position: absolute;bottom: -10px;color:#2196f3;border-radius: 5px;height: 30px;left:52px;font-weight: bold;"
            v-if="!changeFlag" @click="chooseImage">更改头像</span>
          <div class="info-inner" style="margin-left: 15px;flex:1">
            <p v-if="commenFlag" style="color:#2196f3;font-size: 16px">{{info.name}}</p>
            <input v-else type="text" class="userName" v-model="info.name" :disabled="changeFlag" style="color:#2196f3;"
                   :class="{'changeActive':!changeFlag}" @blur="loose" @focus="getpoint" placeholder="姓名">
            <div style="margin-top: 10px">
              <input v-if="!commenFlag" type="text" class="userCollege" v-model="info.college" :disabled="changeFlag"
                     :class="{'changeActive':!changeFlag}" @blur="loose" @focus="getpoint" placeholder="大学机构">
              <span v-if="commenFlag" >{{info.college}}</span>
              <input v-if="!commenFlag" type="text" class="userDegree" v-model="info.professionalTitle" :disabled="changeFlag"
                     :class="{'changeActive':!changeFlag}" @blur="loose" @focus="getpoint" placeholder="学位">
              <span v-if="commenFlag"style="margin-left: 15px">{{info.professionalTitle}}</span>
              <p>
                <span v-if="commenFlag">{{info.researchDirect}}</span>
                <input v-if="!commenFlag" type="text" class="researchDirect" v-model="info.researchDirect" :disabled="changeFlag"
                       :class="{'changeActive':!changeFlag}" @blur="loose" @focus="getpoint" placeholder="研究方向">
              </p>
            </div>
          </div>
          <div class="afterLine" style="position: absolute;right:10px;top:10px" v-if="changeFlag" >
            <f7-button round fill style="border-radius: 8px" @click="changeHome()">编辑主页</f7-button>
          </div>
          <div class="afterLine" style="position: absolute;right:10px;top:10px" v-if="!changeFlag">

            <f7-button round fill style="border-radius: 8px" @click="achieveHome">完成编辑</f7-button>
          </div>
        </f7-card>
      </div>
      <f7-block-title><i class="fa fa-dot-circle-o fa-lg color-blue" style="margin-right: 10px"></i> 所属领域
      </f7-block-title>
      <div class="content-block">
        <div class="content-block-inner" style="text-indent: 2em;">
        <textarea class="keyWord" v-model="info.keyWord" :disabled="changeFlag"
                  :class="{'changeActive':!changeFlag}" @blur="loose" @focus="getpoint"></textarea>
        </div>
      </div>
      <f7-block-title><i class="fa fa-file-text fa-lg color-blue" style="margin-right: 10px"></i> 个人简介</f7-block-title>
      <f7-block inner style="text-indent: 2em;">
        <div v-if="introFlag" :class="{'wrap-text':dataflag}" style="color:#999">
        <textarea class="userIntro" :disabled="changeFlag"
                  :class="{'changeActive':!changeFlag}" @blur="loose" @focus="getpoint">{{info.intro}}</textarea>
        </div>
        <div v-else>
          <div v-if="intro1.length>200">{{intro1.substring(0, showNum)}}</div>
          <div v-else>{{intro1}}</div>
        </div>
        <div v-if="textFlag">
          <div class="color-blue" style="text-align: center" v-if="showFlag" @click="loadedMore ">查看更多<i
            class="fa fa-angle-double-down fa-1x" style="margin-left: -18px"></i></div>
          <div class="color-blue" style="text-align: center" v-else @click="packup">收起<i
            class="fa fa-angle-double-up fa-1x" style="margin-left: -18px"></i></div>
        </div>
      </f7-block>
      <div style="display: flex;justify-content: space-between">
        <f7-block-title>
          <span><i class="fa fa-user fa-lg color-blue" style="margin-right: 10px"></i>联系人信息</span>
        </f7-block-title>
        <div v-if="linkmans.length>0" style="margin-right: 10px;margin-top: 30px">
          <span style="font-size:1em" v-if="alter" @click="alter = false">编辑</span>
          <span style="font-size:1em" v-else="!alter" @click="finishLikemans">完成</span>
        </div>
      </div>
      <div v-if="linkmans.length<=0" style="text-align: center;margin-bottom: 0.1rem">暂无数据</div>
      <f7-list v-else form v-for="item in linkmans" :key="item.id" style="margin-top: 20px;margin-bottom: 0.1rem;">
        <f7-list-item>
          <f7-label floating>姓名</f7-label>
          <f7-input name="name" type="text" :class="{'changeActive':!alter}" v-model.lazy="item.name"
                    :disabled="alter" @blur="loose" @focus="getpoint"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label floating>邮箱</f7-label>
          <f7-input name="email" type="text" :class="{'changeActive':!alter}" v-model="item.email"
                    :disabled="alter" @blur="loose" @focus="getpoint"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label floating>手机号</f7-label>
          <f7-input name="phone" type="text" :class="{'changeActive':!alter}" v-model="item.telephone"
                    :disabled="alter" @blur="loose" @focus="getpoint"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label floating>所在地</f7-label>
          <f7-input name="address" type="text" :class="{'changeActive':!alter}" v-model="info.address"
                    :disabled="alter" @blur="loose" @focus="getpoint"></f7-input>
        </f7-list-item>
      </f7-list>
    </div>

    <div style="position: fixed;bottom:0;width:100%;z-index:10000;height:60px;display: flex" v-show="footerFlag">
      <f7-button style="height:60px;line-height: 40px;
        color:#000;flex: 1;background:#ffffff"
                 href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -30px">会议约见</p>
      </f7-button>
      <f7-button style="height: 60px;color:#000;flex:1;;background:#ffffff"
                 href="/recommend-user">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff"
                 href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x color-blue"></i></p>
        <p style="margin-top: -25px;" class="color-blue">主页 </p>
      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff"
                 href="/myaccount-user">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x" style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>
<script>
  import loadingBar from '../../components/loadingBar.vue'
  import LoadingBar from "../../components/loadingBar";
  export default {
    components: {LoadingBar},
    data(){
      components:{
        loadingBar
      }
      return {
        baseImg: '../../../static/imgs/img-professor.jpg',
        changeFlag: true,
        footerFlag: true,
        textFlag: false,
        loadingFlag:true,
        intro1: '',
        introFlag: false,
        showNum: 200,
        showFlag: true,
        commenFlag:true,
        info: {
          userId: '',
          id: '',
          name: '',
          college: '',
          professionalTitle: '',
          researchDirect: '',
          keyWord: '',
          intro: '',
          headImg: ''

        },
        linkmans: '',
        ordId: '',
        keyWords: [],
        array: [],
        userId: '',
        dataflag: true,
        blag: false,
        bool: false,
        alter: true,
        imgAddr: ''
      }
    },
    watch: {},
    methods: {
      finishLikemans(){
        this.alter = true;
        this.$http({
          method: 'post',
          url: '/v1/user/contacts/edit',
          data: this.linkmans
        })
      },
//      完成编辑
      achieveHome(){
        this.introFlag = false;
        this.changeFlag = true;
        this.commenFlag = true;
        if (this.intro1.length > 200) {
          this.textFlag = true
        }
        this.$http({
          method: 'post',
          url: '/v1/expert/change',
          data: {
            id: this.info.id,
            name: this.info.name,
            professionalTitle: this.info.professionalTitle,
            researchDirect: this.info.researchDirect,
            keyWord: this.info.keyWord,
            intro: this.info.intro,
            headImg: this.info.headImg,
            college: this.info.college,
            userId: this.info.userId
          }
        })
      },
      //点击编辑主页
      changeHome(){
        this.textFlag = false;
        this.introFlag = true;
        this.changeFlag = false;
        this.commenFlag = false;
      },
      loadedMore(){
        this.showNum = 100000 * 1000000;
        this.showFlag = false
      },
      packup(){
        this.showNum = 200;
        this.showFlag = true
      },
      loose(){
        this.footerFlag = true
      },
      getpoint(){
        this.footerFlag = false
      },
//      获取专家的信息的方法
      getUserInfor(){
        this.$http({
          method: 'get',
          url: 'v1/expert/' + this.ordId,
          data: {}
        }).then((res) => {
          this.loadingFlag = false;
          this.info.id = res.data.id;
          this.info.name = res.data.name;
          this.info.professionalTitle = res.data.professionalTitle;
          this.info.researchDirect = res.data.researchDirect;
          this.info.keyWord = res.data.keyWord;
          this.info.intro = res.data.intro;
          this.info.headImg = res.data.headImg;
          this.info.college = res.data.college;
          this.intro1 = res.data.intro;
          if (res.data.intro.length > 200) {
            this.textFlag = true
          } else {
            this.textFlag = false
          }
          if (res.data.intro.length > 800) {
            this.bool = false
          } else {
            this.bool = true
          }
          this.keyWords = res.data.field.split(';');
          this.$http({
            method: 'get',
            url: '/v1/admin/fields',
            data: {}
          }).then((req) => {
            req.data.forEach((item, index) => {
              this.keyWords.forEach((value, index) => {
                if (value === item.id) {
                  this.array.push(item.name)
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
          this.linkmans = res.data
        })
      },
//      更改头像
      chooseImage(){
        let urlIp = encodeURIComponent(window.location.href.split('#')[0]);
        this.$http.get('/v1/wechat/jsSignature?url=' + urlIp).then((res) => {
          let resData = res.data.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: resData.appId,
            nonceStr: resData.noncestr,
            timestamp: resData.timestamp,
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
                this.info.headImg = res.localIds[0];
                wx.uploadImage({
                  localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: (res) => {
                    images.serverId = res.serverId; // 返回图片的服务器端ID
                    this.$http({
                      method: 'post',
                      url: '/v1/wechat/headImg',
                      data: {
                        'itemId': this.ordId,
                        'type': 1,
                        'mediaId': res.serverId
                      }
                    }).then((res) => {
                      let pathImg = res.data.data;
                      this.info.headImg = 'http://120.55.191.189:9002/v1/expert/getimage?path=' + pathImg
                    })
                  }
                })
              }
            })
          })
        })
      },

    },
    mounted(){
      this.ordId = this.$store.oId;
      this.userId = this.$store.userId;
      this.info.userId = this.$store.userId;
      this.getUserInfor();
      this.getContact();
    }
  }
</script>
