<style>
  .error {
    background: red;
  }
  [cloak]{
    display: none;
  }
</style>

<template>
  <f7-page toolbar-fixed>
    <div v-cloak><f7-navbar back-link="Back" title="登录" sliding></f7-navbar> </div>
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

      <f7-button round fill @click="nextStep" :href="this.hrefIp">不点</f7-button>

      <p class="flex-between" style="margin-top: 40px;">
        <f7-button>忘记密码</f7-button>
        <f7-button>立即注册</f7-button>
      </p>
    </div>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        loginType: "code" || "password",
        formValues: {
          code: "cwhmdqy6",
          loginEmail: "",
          password: "",
        },
        formValid: {
          loginEmail: false
        },
        meassage:'',
        flag:false,
        expertUser:'',
        ordId :'',
        info:[],
        hrefIp:''
      }
    },
    methods: {
      nextStep(){
          console.log(this.$route)
//        this.$router2 = this.$f7Router.framework7.router;
        // let rs = this.$validValue.email(this.formValues.loginEmail)
        // alert(rs)

        if(this.loginType == 'code'){
            this.$http({
              method : 'post',
              url : 'v1/user/loginCode/'+this.formValues.code,
              data:{ }
            }).then((res)=>{
              this.ordId = res.data.data.oId
              //等于1表示专家登录
              console.log(res.data.data)
                if(res.data.data.roleId==1){
//                    this.hrefIp = "/check/"
                    let userId = res.data.data.id
                    //邀请码正确但是资料没有完善
                    if(res.data.errno ==4&&res.data.data.dataFlag == 0 ){
                      this.flag = false
                    }
                    //邀请码正确但是资料已经完善
                    if(res.data.errno ==4 && res.data.data.dataFlag == 1 ){
                    }
                    if(res.data.errno ==2){
                      this.flag = true
                      this.meassage = res.data.message
                      return false
                    }
                    this.$http.get('v1/expert/'+this.ordId).then((res)=>{
                      localStorage.setItem("expertOpinion",JSON.stringify(res.data))//本地存储专家的个人信息
                    })
                }else{
                  this.$http.get('v1/expert/'+this.ordId).then((res)=>{
                    localStorage.setItem("priseInformation ",JSON.stringify(res.data))//本地存储专家的个人信息
                  })
                }
            })
        }


      }
    }

  }
</script>
