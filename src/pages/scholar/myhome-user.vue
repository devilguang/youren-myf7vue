<style>
  .footer_btn{
    width: 80px;
    height: 40px;
    color: #ffffff;
  }
  .list-block{
    margin: 50px 0;
  }
  .wrap-text {
    overflow: hidden;
    height: 400px;
    text-overflow: ellipsis;
  }
  .btn{
    display: none;
  }
</style>
<template>
  <!--with-subnavbar no-page-content   把这个去掉之后就可以滚动了但是还所有问题-->
  <f7-page  class="Meeting">
    <div v-cloak="true">
      <f7-navbar title="个人中心" back-link="Back" sliding></f7-navbar>
    </div>
    <div class="card-wrapper">
      <f7-card class="flex-left flex-middle">
        <img class="info-avatar" :src="info.headImg"
             style="height: 100px; width: 100px; margin-right: 15px;"/>
        <div class="info-inner">
          <div class="info-title color-blue" style="font-size: 16px;">{{info.name}}</div>
          <div>
            <span style="margin-right: 10px;">{{info.college}}</span> |
            <span style="margin-left: 10px;">{{info.degree}}</span>
            <span style="margin-left: 10px;">{{info.researchDirect}}</span>
          </div>
        </div>
      </f7-card>
    </div>
    <f7-block-title><i class="fa fa-dot-circle-o fa-lg color-blue"></i> 所属领域</f7-block-title>
    <div class="content-block">
      <div class="content-block-inner" style="text-indent: 2em;">
        <span v-for="value in array" style="margin-left: 5px">{{value}}</span>
      </div>
    </div>
    <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 个人简介</f7-block-title>
    <f7-block inner style="text-indent: 2em;">
      <div  :class="{'wrap-text':dataflag}" style="color:#999">
        {{info.intro}}
      </div>
      <div  class="color-blue" v-show="dataflag" :class="{'btn':bool}" style="margin-top: 10px;
      width: 100%;text-align: center" @click="seeMore()">
        <span>查看更多</span><i class="fa fa-angle-double-down color-blue" style="margin-left: -20px"></i>
      </div>
      <div  class="color-blue" v-show="blag" style="margin-top: 10px;width: 100%;text-align: center"
            @click="seeMoreAgain()">
        <span>收起</span> <i class="fa fa-angle-double-up  color-blue" style="margin-left: -20px" ></i>
      </div>
    </f7-block>


    <f7-block-title><i class="fa fa-user fa-lg color-blue"></i> 联系人信息</f7-block-title>
    <f7-list form v-for="item in linkmans" :key="item.id" style="margin-top: 30px">
      <f7-list-item>
        <f7-label floating>姓名</f7-label>
        <f7-input name="name" type="text" placeholder="" v-model="item.name"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>邮箱</f7-label>
        <f7-input name="email" type="text" placeholder="" v-model="item.email"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>手机号</f7-label>
        <f7-input name="phone" type="text" placeholder="" v-model="item.telephone"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>所在地</f7-label>
        <f7-input name="address" type="text" placeholder="" v-model="info.address"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-block style="margin-bottom: 200px">
      <f7-button round fill @click="nextStep">确定</f7-button>
    </f7-block>
        <div style="position: fixed;bottom:0;background:#ffffff;width:100%;z-index:10000;height:60px;display: flex" >
        <f7-button  style="height:60px;line-height: 40px;
        color:#000;flex: 1"
                    href="/mymeeting-user">
          <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
          <p style="margin-top: -30px">会议约见</p>
        </f7-button>
        <f7-button  style="height: 60px;color:#000;flex:1;"
                  href="/recommend-user">
          <p  style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
          <p  style="margin-top: -25px">推荐</p>

        </f7-button>
        <f7-button  style="height:60px;color:#000;flex:1"
                    href="/myhome-user">
          <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x color-blue"></i></p>
          <p  style="margin-top: -25px;" class="color-blue">主页 </p>
        </f7-button>
        <f7-button  style="height:60px;color:#000;flex:1"
                    href="/myaccount-user">
          <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x" style="color:#999;"></i></p>
          <p style="margin-top:-25px">账户</p>
        </f7-button>
      </div>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        info: { },
        linkmans:'',
        ordId:'',
        keyWords:[],
        array:[],
        userId:'',
        dataflag:true,
        blag:false,
        bool:false
      }
    },
    methods: {
      commit(){
      },
      nextStep(){
          this.$router.load({url: '/recommend-user'})
      },
//      获取专家的信息的方法
      getUserInfor(){
          this.$http({
            method:'get',
            url:'v1/expert/'+ this.ordId,
            data:{}
          }).then((res)=>{
              this.info = res.data
              if(res.data.intro.length > 800){
                this.bool = false
              }else{
                this.bool = true
              }
              this.keyWords = res.data.field.split(';')
              this.$http({
                method:'get',
                url:'/v1/admin/fields',
                data:{}
              }).then((req)=>{
                req.data.forEach((item,index)=>{
                  this.keyWords.forEach((value,index)=> {
                      if(value === item.id){
                          this.array.push(item.name)
                      }
                  })
                })
            })
        })


      },
      getContact(){
        this.$http({
          method:'get',
          url:'/v1/user/contacts/'+this.userId,
          data:{}
        }).then((res)=>{
          this.linkmans = res.data
        })
      },
      seeMore(){
        this.dataflag = false
        this.blag = true
      },
      seeMoreAgain(){
        this.dataflag = true
        this.blag = false
      }
    },
    mounted(){
        this.ordId = this.$store.oId
        this.userId = this.$store.userId
        this.getUserInfor()
        this.getContact()
    }
  }
</script>
