<style>
  .error {
    background: red;
  }
</style>

<template>
  <f7-page toolbar-fixed>
    <f7-navbar back-link="Back" title="登陆" sliding></f7-navbar>

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

      <!--<span v-show="errors.has('email')" class="color-red">{{errors.first('email')}}</span>-->

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
          code: "",
          loginEmail: "",
          password: "",
        },
        formValid: {
          loginEmail: false
        }
      }
    },


    methods: {
      nextStep(){
        // let rs = this.$validValue.email(this.formValues.loginEmail)
        // alert(rs)
        this.$router.load({url: 'check/'})
      }
    }

  }
</script>
