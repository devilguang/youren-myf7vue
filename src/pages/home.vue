<style>
  .page-content{
    padding-top:0px;
  }
</style>
<template>
  <f7-page toolbar-fixed>
    <div v-cloak>
    <f7-navbar> <f7-nav-center sliding>有人微信公众号</f7-nav-center></f7-navbar></div>
    <div style="margin:30px;">
      <f7-buttons>
        <f7-button round :fill="loginType=='code'" @click="loginType = 'code'">邀请码登陆</f7-button>
        <f7-button round :fill="loginType=='password'" @click="loginType = 'password'">帐号登陆</f7-button>
      </f7-buttons>
      <f7-list v-if="loginType=='code'">
        <f7-list-item>
          <f7-input name="code" type="text" placeholder="请输入12位邀请码" v-model="formValues.code"></f7-input>
        </f7-list-item>
      </f7-list>

      <f7-list form v-if="loginType=='password'">
        <f7-list-item>
          <f7-input name="email"  type="email" placeholder="请输入您的注册邮箱" v-model="formValues.loginEmail"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-input name="password"  type="password" placeholder="请输入密码" v-model="formValues.password"></f7-input>
        </f7-list-item>
      </f7-list>
      <span v-show="flag" class="color-red">{{meassage}}</span>
      <!--:href="hrefIp"-->
          <f7-button round fill open-login-screen :href="hrefIp"  @click="nextStep">确定</f7-button>
      <p class="flex-between" style="margin-top: 40px;">
        <f7-button>忘记密码</f7-button>
        <f7-button>立即注册</f7-button>
      </p>
    </div>
    <f7-button  href="/myhome-corp/"  >我要去企业的主页</f7-button>
    <f7-button  href="/recommend-corp/"  >我要去企业的推荐专家</f7-button>
    <f7-button  href="/myhome-user/"  >我要去专家的主页</f7-button>
    <f7-button  href="/recommend-user/"  >我要去专家的推荐</f7-button>
    <f7-button  href="/mymeeting-corp/"  >我要去约见信息</f7-button>
    <f7-button  href="/mymeeting-user/"  >我要去专家约见信息</f7-button>
    <f7-button  href="/check/" >专家认证</f7-button>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      loginType: "code" || "password",
      formValues: {
        code: "cwhmdqy5",
        loginEmail: "",
        password: "",
      },
      formValid: {
        loginEmail: false
      },
      meassage: '',
      flag: false,
      expertUser: '',
      ordId: '',
      info: [],
      hrefIp:'',
      gotoAdress:'',
      type:''  //判断是专家登录还是企业登录 1表示专家登录 2 表示企业登录
    }
  },
    methods: {
      nextStep(){
          if(this.loginType == 'code'){
            // 邀请码登录
            this.$http({
              method: 'post',
              url: 'v1/user/loginCode/'+this.formValues.code,
              data:{}
            }).then((res)=>{
                this.type = res.data.data.roleId
                this.ordId = res.data.data.oId
                if(res.data.errno == 2){   //表示邀请码无效
                  this.flag = true
                  this.meassage = "邀请码无效，请重新输入"
                  return false

                }else {  //表示登录成功
                  this.flag = false

                  console.log(this.gotoAdress)
                  this.hrefIp = this.gotoAdress
                  if(this.type==2){
                    this.$http.get('v1/expert/'+this.ordId).then((res)=>{
                       localStorage.setItem("priseInformation",JSON.stringify(res.data))//本地存储企业的信息
                     })
                  }else{
                    this.$http.get('v1/expert/'+this.ordId).then((res)=>{
                      localStorage.setItem("expertOpinion",JSON.stringify(res.data))//本地存储专家的信息
                    })
                  }
                }
            })
          }else {
              console.log("我是通过账号登录的")
          }
   }

    },
  created(){
  },
  mounted(){
    let winIp = this.gotoAdress = window.location.href.split("?")[1]
    if(winIp = "undefined"){
      winIp = '/check/'+this.type
      this.gotoAdress = winIp
    }else{
      this.gotoAdress = winIp
    }
  }
}
</script>
