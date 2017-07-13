<style scoped>
  .wrap-from{
    margin-top: 200px;
  }
  .list-block{
    width:90%;
   margin-left: 5%;
  }
  .listItem{
    border:1px solid rgba(0,0,0,.12);
    margin-bottom:10px;
    border-radius: 5px;
  }
  .checkWrap{
    display: flex;
    height: 30px;
  }
  .afterLine:after{
    content: '';
    margin-top: 50px;
    height: 1px;
    width: 100%;
    background-color: rgba(0,0,0,.12);
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
</style>
<template>
  <f7-page name="1-login">
   <f7-navbar back-link="Back" title="注册" sliding></f7-navbar>
        <f7-list from class="wrap-from">
           <f7-list-item class="listItem">
             <f7-input type="text" placeholder="请输入邮箱/手机号" v-model="loginName"></f7-input>
           </f7-list-item>
          <f7-list-item class="listItem" >
            <f7-input  type="password" placeholder="请输入密码" v-model="password"></f7-input>
          </f7-list-item>
          <div style="display: flex;margin-top: 15px">
            <div style="flex: 0 0 14px;"><input type="checkbox" name="my-checkbox"  @change.natvie="seleCheckbox"></div>
            <div class="item-title" style="font-size: 12px;flex:1;margin-left: 10px;"><span>我已阅读并同意 <a href="#">《服务协议》</a>和<a href="#">《隐私协议》</a></span></div>
          </div>
        </f7-list>
        <f7-block  class= "afterLine" style="margin-top: 0px;">
          <f7-button round fill style="border-radius: 5px" @click="signUp ">立即注册</f7-button>
        </f7-block>
        <div style="width:100%;text-align: center;margin-top: 70px"><span>已有账号? <a href="/home">点击登录</a></span></div>
  </f7-page>
</template>
<script>
  export default {
    name:'login',
    data() {
      return {
        loginName:'',
        password:'',
        checked:'',
        message:''
      }
    },
    methods:{
      signUp(){
          if(this.loginName.indexOf('@') <0 && this.loginName!==''){
            if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.loginName))){
              this.$f7.alert("请填写正确的手机号码", "注册失败")
              return false
            }
          }else{
              if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.loginName))&& this.loginName!==''){
                this.$f7.alert("请填写正确格式的邮箱", "注册失败")
                return false
              }
          }
          if(this.loginName==""|| this.password=='' ){
            this.$f7.alert("请填写完整用户名或密码", "注册失败")
            return false
          }else if(this.loginName!==""&& this.password!==''&&this.checked == false ){
            this.$f7.alert("请仔细阅读《服务协议》和《隐私协议》", "注册失败")
            return false
          }
          this.$http({
            method:'post',
            url:'/v1/user/registe',
            data:{
              'loginName':this.loginName,
              'password':this.password
            }
          }).then((res)=>{
              if(res.data.errno==1){
                this.$f7.alert(res.data.message+',请重新输入', "注册失败")
              }else{
                this.$store.state.token = res.data.data.token
                this.$store.userId = res.data.data.user.id
                this.$router.load({url:'/identity'})
              }
          })
      },
      seleCheckbox(e){
          this.checked = e.target.checked;

      }
    }
  }
</script>
