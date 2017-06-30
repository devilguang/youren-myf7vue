<style>
  .page-content {
    padding-top: 0px;
  }
  .list-block{
    margin-top: 32px;
  }
</style>
<template>
  <f7-page>
    <div v-cloak>
      <f7-navbar>
        <f7-nav-center sliding>有人微信公众号</f7-nav-center>
      </f7-navbar>
    </div>
    <div style="margin:30px;">
      <f7-buttons>
        <f7-button round :fill="loginType=='code'" @click="loginType = 'code'">邀请码登陆</f7-button>
        <f7-button round :fill="loginType=='password'" @click="loginType = 'password'">帐号登陆</f7-button>
      </f7-buttons>
      <f7-list v-if="loginType=='code'" style="margin-top: 32px;margin-bottom: 50px">
        <f7-list-item>
          <f7-input name="code" type="text" placeholder="请输入12位邀请码" v-model="formValues.code"></f7-input>
        </f7-list-item>
      </f7-list>
      <f7-list form v-if="loginType=='password'" style="margin-top: 32px;margin-bottom: 50px">
        <f7-list-item>
          <f7-input name="email" type="email" placeholder="请输入您的注册邮箱" v-model="formValues.loginEmail"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-input name="password" type="password" placeholder="请输入密码" v-model="formValues.password"></f7-input>
        </f7-list-item>
      </f7-list>
      <span v-show="flag" class="color-red">{{meassage}}</span>
      <!--:href="hrefIp"-->
      <f7-button round fill open-login-screen @click="nextStep">确定</f7-button>
      <p class="flex-between" style="margin-top: 40px;">
        <f7-button>忘记密码</f7-button>
        <f7-button>立即注册</f7-button>
      </p>
    </div>
    <!--<f7-button href="/homePage">首页</f7-button>-->
    <f7-button style="display: none" id="ss" href="/home/"></f7-button>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        nextPage: '',
        loginType: "code" || "password",
        formValues: {
          code: 'qyxq2 ', //企业 cwhmdqy6 pwhdxmet6   qyxq2  whdx1 专家
          loginEmail: '',
          password: '',
        },
        formValid: {
          loginEmail: false
        },
        meassage: '邀请码无效，请重新输入',
        flag: false,
        expertUser: '',
        ordId: '',
        info: [],
        type: '', //判断是专家登录还是企业登录 1表示专家登录 2 表示企业登录
        gotoAdress: '',
        _dataFlag:'', //判断资料是否填写完善 1表示资料已经完善，2表示未完善
        userId:'' //登录用户的id
      }
    },
    methods: {
      nextStep(){
        if (this.loginType !== 'code') return this.$f7.confirm('目前只提供邀请码登录', '立即联系', () => {});
        this.$http({
          method: 'post',
          url: 'v1/user/loginCode/' + this.formValues.code,
          data: {}
        }).then((res) => {
          let err = res.data.errno
          if(err==2){
            this.flag = true
            return false;
          }
          this.$store.userId = res.data.data.user.id
          let {errno, role, data: {token, user}} = res.data;
          let {dataFlag, oId } = user;
          if (err == 2) {
            this.flag = true
            return false;
          }
          else if (dataFlag == '1') {
            this.$store.state.token = res.data.data.token
            this.$router.load({url: this.nextPage || (role == '1' ? '/myhome-user' : '/myhome-corp')})
              localStorage.setItem('expertOpinion',JSON.stringify(user))
              localStorage.setItem('type',JSON.stringify(role))
              this.$store.oId = user.oId
          }
          else {
              this.$store.state.token = res.data.data.token
              this.$router.load({url: role == '1' ? '/check' : '/checkfirm'})
              localStorage.setItem('expertOpinion',JSON.stringify(user))
              localStorage.setItem('type',JSON.stringify(role))
          }
        })
      }
    },
    created(){
    },
    mounted(){
        this.$$("#ss").click()
       this.nextPage = window.location.hash.replace('#', '');
    }
  }
</script>
