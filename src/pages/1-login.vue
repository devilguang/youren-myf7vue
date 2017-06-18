<style>
  .error {
    background: red;
  }

</style>

<template>
  <f7-page toolbar-fixed>
    <v-cloak>
      <f7-navbar back-link="Back" title="登陆" sliding></f7-navbar>
    </v-cloak>
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

      <f7-button round fill @click="nextStep">确定</f7-button>

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
          code: "pwhdxmet6",
          loginEmail: "",
          password: "",
        },
        formValid: {
          loginEmail: false
        },
        meassage:'',
        flag:false,
        expertUser:''
      }
    },


    methods: {
      nextStep(){
        // let rs = this.$validValue.email(this.formValues.loginEmail)
        // alert(rs)
        if(this.loginType == 'code'){
            this.$http({
              method : 'post',
              url : 'v1/user/loginCode/'+this.formValues.code,
              data:{ }
            }).then((res)=>{
                console.log(res.data.data)
//                this.expertUser.id = res.data.data.id
//                this.expertUser.name = res.data.data.loginName  //专家姓名
//                this.expertUser.unit = res.data.data.loginName  //单位
//                this.expertUser.degree = res.data.data.loginName //学位
//                this.expertUser.jobTitle =res.data.data.loginName // 职称
//                this.expertUser.researchArea = res.data.data.loginName //研究方向
                  this.expertUser = res.data.data
                localStorage.setItem("expertOpinion",JSON.stringify(this.expertUser))//本地存储专家的个人信息
//              var json_data = JSON.parse(storage.getItem("expertOpinion"));//从本地获取数据的方法
              let userId = res.data.data.id
                //邀请码正确但是资料没有完善
                  if(res.data.errno ==4&&res.data.data.dataFlag == 0 ){
                    this.flag = false
                    this.$router.load({url: 'check/'})
                  }
              //邀请码正确但是资料已经完善
                  if(res.data.errno ==4&&res.data.data.dataFlag == 1 ){
                    this.$router.load({url: 'check/'})
                  }
                  if(res.data.errno ==2){
                    this.flag = true
                    this.meassage = res.data.message
                    return false
                  }
            })
        }
      }
    }

  }
</script>
