<template>
  <f7-page name="expertsHome" style="background:rgb(240,239,245)">
    <f7-navbar back-link="Back" title="专家认证" sliding></f7-navbar>
    <div class="experts-head">
      <div class="uploading" @click="uploading"><img :src="imgSrc" alt="" v-if="imgSrc==''?false:true"><i
        class="fa fa-photo fa-2x" v-if="imgSrc==''?true:false"
        style="line-height: 80px;color:#ffffff"></i>
      </div>
      <div class="newButton">新建专家主页</div>
    </div>
    <div class="content-top">联系人信息</div>
    <form id="my-form" class="list-block" style="background: #ffffff;margin: 0">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">姓名</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入姓名（必填）" v-model="infoList.name">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">单位</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入单位（必填）" v-model="infoList.college">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">学位</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入学位（必填）" v-model="infoList.degree">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">职称</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入职称（必填）" v-model="infoList.professionalTitle">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">研究方向</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入研究方向（必填）" v-model="infoList.researchDirect">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </form>
    <div class="content-top">个人简介</div>
    <form class="list-block" style="background: #ffffff">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-input">
                <textarea style="height: 150px;" v-model="infoList.intro"></textarea>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </form>
    <f7-block class="afterLine" style="margin-top: 0px;">
      <f7-button round fill style="border-radius: 5px" @click="nextStep">提交</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  export default{
    name: 'expertsHome',
    data(){
      return {
        infoList: {
          name: '',                   //姓名
          college: '',               //单位
          degree: '',                //学位
          professionalTitle: '',   //职称
          fieldStr: '',            //学科
          researchDirect: '',      //研究方向
          intro: '请填写简介（必填）',               //个人简介
          headImg: '',           //头像url
          field: '',             //行业
        },
        touserId: '',
        imgSrc: '',
        imgAddr:'',
        openId:''
      }
    },
    methods: {
      nextStep(){
        if (this.infoList.name == '' || this.infoList.college == '' || this.infoList.degree == '' || this.infoList.professionalTitle == '' ||
          this.infoList.researchDirect == '' || this.infoList.intro == '' || this.infoList.fields == '') {
          this.$f7.alert('请填写完整的信息', '注册失败')
          return
        }
        this.$http({
          method: 'post',
          url: '/v1/admin/createExpert',
          data: {
            userId: this.infoList.userId,
            name: this.infoList.name,
            college: this.infoList.college,
            degree: this.infoList.degree,
            professionalTitle: this.infoList.professionalTitle,
            researchDirect: this.infoList.researchDirect,
            intro: this.infoList.intro,
            fields: this.infoList.fields,
            headImg: this.imgAddr,
          }
        }).then((res) => {
          if (res.data.errno == 0) {
            let meetime = this.$store.getNowFormatDate()
            this.$http({
              method: 'post',
              url: '/v1/wechat/sendMsg',
              data: {
                type: 3,
                touserId: this.touserId,  //消息接收人的id
                userName: this.infoList.name,        //用户名
                time:meetime,             //
                url: 'http://m.youren.ai/#/recommend-user'     // 模板消息点击详情跳转的地址
              }
            })
            this.$f7.alert('是否为您跳转到登录页面', '恭喜您注册成功',() => {
              this.$router.load({url: '/home'})
            })
          } else {
            this.$f7.alert('请确认信息', '注册失败')
          }
        })
      },
      getFields(){
        this.infoList.fields = JSON.parse(localStorage.getItem('registered')).join(';')
        this.infoList.userId = this.$store.userId
      },
//      点击上传头像
      uploading(){
        let urlIp = encodeURIComponent(window.location.href.split('#')[0])
        this.$http.get('/v1/wechat/jsSignature?url='+urlIp).then((res) => {
          let resData = res.data.data
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: resData.appId,
            nonceStr: resData.noncestr,
            timestamp: resData.timestamp,
            signature: resData.sign,
            jsApiList: ['chooseImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(()=> {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            let images = {
              localId: '',
              serverId: '',
            };
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
              success: (res) =>{
                images.localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                this.imgSrc = res.localIds[0]
                wx.uploadImage({
                  localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success:(res)=>{
                    images.serverId = res.serverId; // 返回图片的服务器端ID
                    this.$http({
                      method:'post',
                      url:'/v1/wechat/headImg',
                      data:{
                        'itemId':this.touserId,
                        'type':1,
                        'mediaId':res.serverId
                      }
                    }).then((res)=>{
                        this.imgAddr  = res.data.data
                    })
                  }
                })
              }
            })
          })
          wx.error((res) =>{
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          })
        })
      },
    },
    mounted(){
      this.getFields()
      this.touserId = this.$store.userId
    }
  }
</script>

<style scoped>
  .experts-head {
    width: 100%;
    height: 200px;
    background: #ffffff;
    text-align: center;
    overflow: hidden;

  }

  .uploading {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #d7dde2;
    margin-top: 60px;
    margin-left: 50%;
    transform: translateX(-35px);
  }

  .uploading img {
    width: 80px;
    height: 80px;
    background-size: 80px 80px;
    background-repeat: no-repeat;
    border-radius: 50%;
  }

  .newButton {
    width: 140px;
    height: 40px;
    background: #2196f3;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    margin-left: 50%;
    margin-top: 10px;
    transform: translateX(-70px);
  }

  .content-top {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-indent: 30px;
    color: #989fa3;
    font-size: 14px;
  }

  .list-block {
    margin-top: 0;
  }

  .item-title {

  }
</style>
