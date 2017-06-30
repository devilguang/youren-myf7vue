<style>

</style>
<template>
  <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;height:60px;z-index:10000;display: flex" >
    <f7-button  style="height:60px;color:#000;flex:1"
                @click="$router.load({url:'/mymeeting-corp'})">
      <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x color-blue"></i></p>
      <p style="margin-top: -25px" class="color-blue">会议约见</p>
    </f7-button>
    <f7-button  style="height: 60px;color:#000;flex:1"
                @click="$router.load({url:'/recommend-corp'})">
      <p  style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
      <p  style="margin-top: -25px">推荐</p>

    </f7-button>
    <f7-button  style="height:60px;color:#000;flex:1"
                @click="$router.load({url:'/myhome-corp'})">
      <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
      <p  style="margin-top: -25px;" >主页 </p>
    </f7-button>
    <f7-button  style="height:60px;color:#000;flex:1"
                @click="$router.load({url:'/myaccount-corp'})">
      <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x " style="color:#999;"></i></p>
      <p style="margin-top:-25px">账户</p>
    </f7-button>
  </div>
</template>
<script>
  export default{
      name:'homePage',
      components:{

      }
  }
</script>
