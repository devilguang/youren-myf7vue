<template>
  <f7-page name="expertsHome" style="background:rgb(240,239,245)">
    <f7-navbar back-link="Back" title="专家认证" sliding></f7-navbar>
    <div class="experts-head">
        <div class="uploading" @click="uploading"><i class="fa fa-photo fa-2x" style="line-height: 80px;color:#ffffff"></i></div>
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
    <form  class="list-block" style="background: #ffffff">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-input">
                <textarea style="height: 150px;">{{infoList.intro}}</textarea>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </form>
    <f7-block  class= "afterLine" style="margin-top: 0px;">
      <f7-button round fill style="border-radius: 5px" @click="nextStep">提交</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  export default{
      name:'expertsHome',
      data(){
          return{
              infoList:{
                name:'',                   //姓名
                college:'',               //单位
                degree:'',                //学位
                professionalTitle:'',   //职称
                fieldStr:'',            //学科
                researchDirect:'',      //研究方向
//                keyWord:'',             //擅长领域
//                service:'',              //服务方式
//                phonePrice:'',          //电话价格
//                meetPrice:'',           //线下价格
                intro:'请填写简介（必填）',               //个人简介
//                project:'',             //合作项目
//                cooperExpert:'',      //合作专家
//                cooperCompany:'',     //合作机构
                headImg:'',           //头像url
                field:'',             //行业
              },
            newDate:'',
            touserId:''
          }
      },
    methods:{
      nextStep(){
        if(this.infoList.name==''||this.infoList.college==''||this.infoList.degree==''||this.infoList.professionalTitle==''||
          this.infoList.researchDirect==''||this.infoList.intro==''||this.infoList.fields==''){
          this.$f7.alert('请填写完整的信息', '注册失败')
          return
        }
        this.$http({
          method:'post',
          url:'/v1/company/add',
          data:{
            userId:this.infoList.userId,
            name: this.infoList.name,
            college:this.infoList.college,
            degree:this.infoList.degree,
            professionalTitle:this.infoList.professionalTitle,
            researchDirect:this.infoList.researchDirect,
            intro:this.infoList.intro,
            fields:this.infoList.fields,
            headImg:''
          }
        }).then((res)=>{
          console.log(res)
          if(res.data.errno==0){
            this.getNowFormatDate()
            let username = JSON.parse(window.localStorage.getItem("expertOpinion")).loginName
            this.$f7.alert('即将为您跳转到登录页面', '恭喜您注册成功', () => {
              this.$http({
                method: 'post',
                url: '/v1/wechat/sendMsg',
                data: {
                  type: 3,
                  touserId: this.touserId,     //消息接收人的id
                  userName:username,        //用户名
                  time: this.newDate,        //
                  url: '/recommend-user'     // 模板消息点击详情跳转的地址
                }
              })
                this.$router.load({url:'/home'})
            })
          }else{
            this.$f7.alert('请确认信息','注册失败')
          }
        })
        },
      getFields(){
        this.infoList.fields = JSON.parse(localStorage.getItem('registered')).join(';')
        this.infoList.userId = this.$store.userId
      },
//      点击上传头像
      uploading(){
        let localIds,serverId
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          }
        });
        wx.uploadImage({
          localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
             serverId = res.serverId; // 返回图片的服务器端ID
          }
        });
        wx.downloadImage({
          serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var localId = res.localId; // 返回图片下载后的本地ID
          }
        });
      },
      getNowFormatDate() {
        let date = new Date();
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = date.getFullYear() + "年" + month + "月" + strDate+"日"
          + " " + date.getHours() + seperator2 + date.getMinutes()
        return currentdate;
        this.newDate = currentdate
      }
    },
    mounted(){
      this.getFields()
      this.touserId = this.$store.userId
    }

  }

</script>

<style scoped>
    .experts-head{
      width:100%;
      height:200px;
      background: #ffffff;
      text-align: center;
      overflow: hidden;

    }
  .uploading{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background:#d7dde2;
    margin-top: 60px;
    margin-left: 50%;
    transform: translateX(-35px);
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
  .content-top{
    width:100%;
    height: 60px;
    line-height: 60px;
    text-indent: 30px;
    color: #989fa3;
    font-size:14px;
  }
  .list-block {
    margin-top: 0;
  }
  .item-title {

  }
</style>
