<style>
  .page-content {
    padding-top: 0px;
  }

  .list-block {
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
        <f7-button round :fill="loginType=='code'" @click="loginCode">邀请码登陆</f7-button>
        <f7-button round :fill="loginType=='password'" @click="loginNumber">帐号登陆</f7-button>
      </f7-buttons>

      <f7-list v-if="loginType=='code'" style="margin-top: 32px;margin-bottom: 50px">
        <f7-list-item>
          <f7-input name="code" type="text" placeholder="邀请码默认为联系人手机号" v-model="formValues.code"></f7-input>
        </f7-list-item>
      </f7-list>

      <f7-list form v-if="loginType=='password'" style="margin-top: 32px;margin-bottom: 50px">
        <f7-list-item>
          <f7-input name="email" type="email" placeholder="请输入您的账号" v-model="formValues.loginName"></f7-input>
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
        <f7-button @click="enroll">立即注册</f7-button>
      </p>
    </div>
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
          code: '', //企业 cwhmdqy6 pwhdxmet6   qyxq2  whdx1 专家
          loginName: '',
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
        _dataFlag: '', //判断资料是否填写完善 1表示资料已经完善，2表示未完善
        userId: '', //登录用户的id
      }
    },
    methods: {
      loginCode(){
        this.loginType = 'code';
        this.formValues.code = '';
        this.flag = false
      },
      loginNumber(){
        this.loginType = 'password';
        this.formValues.password = '';
        this.flag = false
      },
      nextStep(){
        if (this.loginType !== 'code') {

          if (this.formValues.loginName == '' || this.formValues.password == '') {
            this.meassage = '账号或密码不能为空，请重新输入';
            this.flag = true;
            return false
          }
          this.$http.post('/v1/user/login', {
            'loginName': this.formValues.loginName,
            'password': this.formValues.password
          }).then((res) => {
            let errno = res.data.errno;
            if (errno == 1 || errno == 2 || errno == 3) {
              this.flag = true
              this.meassage = res.data.message;
              return false
            }
            this.$store.userId = res.data.data.user.id;
            let {data: {token, user}} = res.data;
            let roleId = res.data.data.user.roleId;
            let {auditFlag, oId} = user;
            if (errno !== (1 || 2 || 3 )) {
              localStorage.setItem('loginName', JSON.stringify(this.formValues.loginName));
              this.$store.state.token = res.data.data.token;
              this.$router.load({url: this.nextPage || (roleId == '1' ? '/myhome-user' : '/myhome-corp')});
              localStorage.setItem('expertOpinion', JSON.stringify(user));
              localStorage.setItem('type', JSON.stringify(roleId));
              this.$store.oId = user.oId;
              this.usersBinding(user.id)
            }
//            else {
//              this.$store.state.token = res.data.data.token;
//              this.usersBinding(user.id);
//              this.$router.load({url: '/identity'})
//            }
          })
        } else {
          if (this.formValues.code == '') {
            this.meassage = '邀请码不能为空';
            this.flag = true;
            return false
          }
          this.$http({
            method: 'post',
            url: 'v1/user/loginCode/' + this.formValues.code,
            data: {}
          }).then((res) => {
            let err = res.data.errno;
            if (err == 2) {
              this.flag = true;
              return false;
            }
            this.$store.userId = res.data.data.user.id;
            let {errno, role, data: {token, user}} = res.data;
            let {dataFlag, oId} = user;
            if (err == 2) {
              this.flag = true;
              return false;
            } else if (dataFlag == '1') {
              this.$store.state.token = res.data.data.token;
              this.$router.load({url: this.nextPage || (role == '1' ? '/myhome-user' : '/myhome-corp')});
              localStorage.setItem('expertOpinion', JSON.stringify(user));
              localStorage.setItem('type', JSON.stringify(role));
              this.$store.oId = user.oId;
              this.usersBinding(user.id)
            } else {
              this.$store.state.token = res.data.data.token;
              this.$router.load({url: role == '1' ? '/check' : '/checkfirm'});
              localStorage.setItem('expertOpinion', JSON.stringify(user));
              localStorage.setItem('type', JSON.stringify(role));
              this.usersBinding(user.id)
            }
          })
        }
      },
      enroll(){
        this.$router.load({url: '/login'})
      },
      getQueryString(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return ''
      },
      usersBinding(userId){ //绑定微信
        let openId = localStorage.getItem('openId');
        this.$http({
          method: 'post',
          url: '/v1/wechat/bindWechat',
          data: {
            userId: userId,
            openId: openId
          }
        })
      },
      local(key, value) {
        if (value == null) {
          value = localStorage.getItem(key) + "";
          if (value == 'null' || value == 'undefined' || value == '') return '';
          return value;
        }
        localStorage.setItem(key, value);
      },
//      automaticLogin(openId){
//        if (openId) {
//          this.$http({
//            method: 'post',
//            url: '/v1/user/openId',
//            data: {wechatId: openId}
//          }).then((res) => {
//            let resData = res.data;
//            if (resData.errno === 0) {
//              let token = resData.data.token;
//              let user = resData.data.user;
//              let auditFlag = user.auditFlag;  //注册登录的资料字段
//              let dataFlag = user.dataFlag;   //邀请码登录的字段
//              let roleId = user.roleId;       //身份字段
//              this.$store.oId = user.oId;
//              this.$store.userId = user.id;
//              this.$store.state.token = token;
//              if (auditFlag == 1 || dataFlag == 1) {
//                this.$router.load({url: roleId == '1' ? '/mymeeting-user' : '/mymeeting-corp'});
//                return;
//              }
//              if (dataFlag === 0) {
//                this.$router.load({url: roleId == '1' ? '/check' : '/checkfirm'});
//                return;
//              }
//              if (auditFlag === 0) {
//                this.$router.load({url: '/identity'});
//                return;
//              }
//            } else {
//              this.$router.load({url: '/home'});
//              return;
//            }
//          })
//        }
//      }
    },
    mounted(){
      if (JSON.parse(localStorage.getItem('loginName'))){
        this.formValues.loginName = JSON.parse(localStorage.getItem('loginName'));
      }
      this.$$("#ss").click();
      this.nextPage = window.location.hash.replace('#', '');
      let opendId = this.local('openId');
      let code = this.getQueryString('code');
      if (opendId)return
      if (code){
        this.$http.get('v1/wechat/actoken/' + code).then((res) => {
          let openId = res.data.data.weChatId;
          this.local('openId', openId)
        })
      }
      else {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7d1c2fa9d118f642&redirect_uri=http://m.youren.ai&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
      }
    }
  }
</script>
