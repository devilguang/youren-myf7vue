<template>
  <f7-page name="certification" style="background:rgb(240,239,245)">
    <f7-navbar back-link="Back" title="企业认证" sliding></f7-navbar>
    <div class="content-top" style="margin-top: 60px">企业信息</div>
    <form id="my-form" class="list-block" style="background: #ffffff;margin: 0">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">企业名称</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入企业名称（必填）" v-model="infoList.name">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">营业执照注册号</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="营业执照注册号或统一社会信用代码（必填）" v-model="infoList.credentials">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">联系方式</div>
              <div class="item-input">
                <input type="number" name="name" placeholder="输入联系方式（必填）" v-model="infoList.contactNumber">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">邮政编码</div>
              <div class="item-input">
                <input type="number" name="name" placeholder="输入职邮政编码（必填）">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">通讯地址</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入研通讯地址（必填）" v-model="infoList.ext1">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </form>

    <div class="content-top">联系人信息</div>
    <form  class="list-block" style="background: #ffffff">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">姓名</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入姓名（必填）" v-model="infoList.contactName">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">联系电话</div>
              <div class="item-input">
                <input type="number" name="name" placeholder="输入电话（必填）" v-model="infoList.contactNumber">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">职位</div>
              <div class="item-input">
                <input type="text" name="name" placeholder="输入职位（必填）" v-model="infoList.position">
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
//      name  credentials  contactNumber ext1 contactName   position
          infoList:{
              userId :'',
              name:'',                // 企业名称
              credentials:'',        // 营业执照注册号
              ext1:'',               //详细地址
//              industry:'',           //主营业务
//              province:'',            // 省份
//              city:'',                 //城市
              contactName:'',          //  联系人姓名
              contactNumber:'',        // 电话
              position:'',              // 职位
              fields:'',                 // 领域
//              coopProject:'',            //合作项目
//              coopExpert:'',             //合作专家
//              coopUnit:'',               // 合作机构
          }
      }
    },
    methods:{
      nextStep(){
        if(this.infoList.name==''||this.infoList.credentials==''||this.infoList.ext1==''||
          this.infoList.contactName==''||this.infoList.contactName==''||this.infoList.contactNumber==''
          ||this.infoList.position==''||this.infoList.fields==''){
          this.$f7.alert('请填写完整的信息', '注册失败')
          return
        }
          this.$http({
            method:'post',
            url:'/v1/company/add',
            data:{
              userId:this.infoList.userId,
              name: this.infoList.name,
              credentials:this.infoList.credentials,
              ext1:this.infoList.ext1,
              contactName:this.infoList.contactName,
              contactNumber:this.infoList.contactNumber,
              position:this.infoList.position,
              fields:this.infoList.fields,
            }
          }).then((res)=>{
              if(res.data.errno==0){

                this.$f7.alert('即将为您跳转到登录页面', '恭喜您注册成功', () => {
                    this.$router.load({url:'/home'})
                })
                let meetime = this.$store.getNowFormatDate()
                let userName = JSON.parse(window.localStorage.getItem("expertOpinion")).loginName
                console.log(userName)
                this.$http({
                  method:'post',
                  url:'',
                  data:{
                    touserId: this.infoList.userId,
                    type: 2,
                    companyName:this.infoList.name,
                    userName:userName,
                    time: meetime,
                    url: '/recommend-user'
                  }
                })
              }else{
                  this.$f7.alert('请确认信息','注册失败')
              }
          })
      },
      getFields(){
        this.infoList.fields = JSON.parse(localStorage.getItem('registered')).join(';')
        this.infoList.userId = this.$store.userId
      }
    },
    mounted(){
        this.getFields()
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
    width: 70px;
    height: 70px;
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
    margin-top: 20px;
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
