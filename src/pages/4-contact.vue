<style lang="scss">

</style>

<template>
  <f7-page>
    <div v-cloak>
      <f7-navbar back-link="Back" title="联系方式" sliding></f7-navbar>
    </div>
    <f7-block style=" text-align:left">
      为了方便我们及时与您取得联系，请您填写至少一位联系人信息。
    </f7-block>
    <f7-card v-for="(item, index) in linkmans" :key="item.id">
      <f7-card-content style="margin-bottom: 20px;">

        <form class="list-block inputs-list">
          <div v-show="item.id != 0" class="fa fa-times-circle fa-lg"
               style="position: absolute; top:0px; right: 0px; z-index:100" @click="removeLinkman(item.id)"></div>
          <ul>
            <li>
              <div class="item-content" style="position: relative;">
                <div class="item-inner">
                  <div class="item-title label">联系人姓名</div>
                  <div class="item-input item-input-field">
                    <input type="text" placeholder="" v-model="item.name"/>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                <div class="item-inner">
                  <div class="item-title label">联系人电话</div>
                  <div class="item-input item-input-field">
                    <input type="tel" placeholder="" v-model="item.telephone"/>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                <div class="item-inner">
                  <div class="item-title label">联系人邮箱</div>
                  <div class="item-input item-input-field">
                    <input type="text" placeholder="" v-model="item.email"/>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                <div class="item-inner">
                  <div class="item-title label">联系人职务</div>
                  <div class="item-input item-input-field">
                    <input type="text" placeholder="" v-model="item.position"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </form>
      </f7-card-content>
    </f7-card>

    <f7-block style="">
      <f7-button @click="addLinkman()">新增联系人</f7-button>
    </f7-block>

    <f7-block style="margin-bottom: 200px">
      <f7-button round fill @click="commit">确定</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  let autoID = 0;
  export default {
    data() {
      return {
        linkmans: [
          {
            name: '',
            telephone: '',
            email: '',
            position: '',
            domain: '',
            userId: ''
          }
        ],
        type: '',
        experts: '',
        user_id: '',
        newDate:''
      }
    },
    methods: {
      test(){
        console.log('oo')
      },
      addLinkman() {
        this.linkmans.push({
          name: '',
          telephone: '',
          email: '',
          position: '',
          domain: ''
        })
      },
      removeLinkman(id) {
        let index = this.linkmans.findIndex(man => man.id == id)
        this.linkmans.splice(index, 1)
      },
      // 点击确定进行下一步
      commit() {
        this.type = window.localStorage.getItem("type")
        console.log(this.type)
        this.linkmans.forEach((item, index) => {
          this.linkmans[index].id = this._userId
          if (item.name == "" || item.phone == '' || item.email == '' || item.post == '') {
            this.$f7.alert("请填写完整的信息", "认证失败")
          } else if (/[^\u4e00-\u9fa5]/.test(item.name) && !(item.name.length < 2)) {
            this.$f7.alert("请填写正确的姓名", "认证失败")
          }
          else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(item.telephone))) {
            this.$f7.alert("请填写正确的手机号码", "认证失败")
          } else if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(item.email))) {
            this.$f7.alert("请填写正确格式的邮箱", "认证失败")
          }
          else {
            this.$f7.alert('恭喜您，认证成功！麦子根据您的信息自动为您匹配了10个企业需求，您可以点击推荐查看。', '认证成功', () => {

              if (this.type == "2") {  //企业的跳转
                this.getNowFormatDate()
                this.$router.load({url: '/myhome-corp'})
                this.submitFirm()

                let companyName = JSON.parse(window.localStorage.getItem("expertOpinion")).object.name
                let userName = JSON.parse(window.localStorage.getItem("expertOpinion")).object.contactName
                // 发送认证成功之后的模板消息
                this.$http({
                  method: 'post',
                  url: '/v1/wechat/sendMsg',
                  data: {
                    type: 2,
                    touserId: this.user_id,     //消息接收人的id
                    companyName: companyName,   //企业名
                    userName: userName,         //用户名
                    time: this.newDate,            //
                    url: '/recommend-corp'       // 模板消息点击详情跳转的地址
                  }
                })
              } else {   //专家的跳转
                this.getNowFormatDate()
                let userName = JSON.parse(window.localStorage.getItem("expertOpinion")).name
                this.submitInfor() //调用专家的完善资料的方法
                this.$router.load({url: '/myhome-user'})
                // 发送专家的认证成功之后的模板消息
                this.$http({
                  method: 'post',
                  url: '/v1/wechat/sendMsg',
                  data: {
                    type: 3,
                    touserId: this.user_id,     //消息接收人的id
                    userName: userName,        //用户名
                    time: this.newDate,        //
                    url: '/recommend-user'     // 模板消息点击详情跳转的地址
                  }
                })
              }
            })
          }
        })
      },
//      专家的完善资料
      submitInfor(){
        this.$http({
          method: 'post',
          url: '/v1/expert/change',
          data: {
            id: this._userId,
            name: this.experts.name,
            college: this.experts.unit,
            degree: this.experts.degree,
            professionalTitle: this.experts.theTitle,
            researchDirect: this.experts.research,
            userId: this.user_id,
            field: this.domain,
            contact: this.linkmans,
          }
        }).then((res) => {

        })
      },
//      企业完善资料
      submitFirm(){
        this.$http({
          method: "post",
          url: '/v1/company/change',
          data: {
            id: this._userId,
            name: this.experts.name,
            contactName: this.experts.contactName,
            position: this.experts.position,
            fields: this.domain,
            userId: this.user_id,
            contact: this.linkmans
          }
        }).then((req) => {

        })
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
        let currentdate = date.getFullYear() + "年" + month + "月" + strDate + "日"
          + " " + date.getHours() + seperator2 + date.getMinutes()
        this.newDate = currentdate
      }
    },
    mounted(){
      this.experts = JSON.parse(window.localStorage.getItem("experts"))  //专家认证的消息
      this.domain = JSON.parse(window.localStorage.getItem("domain")).join(";") //拿到专家的 选择领域的信息
      this.user_id = JSON.parse(window.localStorage.getItem("expertOpinion")).id  //拿到用户的id
      this._userId = JSON.parse(window.localStorage.getItem("expertOpinion")).oId  //专家的id
      this.$store.oId = this._userId
    }
  }
</script>
