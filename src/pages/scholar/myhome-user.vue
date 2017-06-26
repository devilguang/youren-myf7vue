
<template>
  <!--with-subnavbar no-page-content   把这个去掉之后就可以滚动了但是还所有问题-->
  <f7-page  class="Meeting">
    <div v-cloak="true">
      <f7-navbar title="个人中心" back-link="Back" sliding></f7-navbar>
    </div>
    <div class="card-wrapper">
      <f7-card class="flex-left flex-middle">
        <img class="info-avatar" src="/static/img/avatar-user.png"
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
    <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 所属领域</f7-block-title>
    <div class="content-block">
      <div class="content-block-inner" style="text-indent: 2em;">
        <span v-for="value in array" style="margin-left: 5px">{{value}}</span>
      </div>
    </div>
    <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 个人简介</f7-block-title>
    <f7-block inner style="text-indent: 2em;">
      {{info.intro}}
    </f7-block>

    <f7-block-title><i class="fa fa-user fa-lg color-blue"></i> 联系人信息</f7-block-title>

    <f7-list form v-for="item in linkmans" :key="item.id">
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
  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        info: { },
        linkmans:[{
            name:'李志光',
            email:'1005576676@qq.com ',
            telephone:'15926919715',
            address:'湖北武汉'
        }],
        ordId:'',
        keyWords:[],
        array:[]
      }
    },
    methods: {
      commit(){
      },
      nextStep(){
          this.$router.load({url: '/recommend-user/'+this.ordId})
      },
//      获取专家的信息的方法
      getUserInfor(){
          this.$http({
            method:'get',
            url:'v1/expert/'+ this.ordId,
            data:{}
          }).then((res)=>{
              this.info = res.data
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
      }
    },
    mounted(){
         this.ordId = this.$route.params.id
         this.getUserInfor()
    }
  }
</script>
