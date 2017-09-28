<template>
  <f7-page class="MyAccount">
    <f7-navbar title="帐户" back-link="Back" sliding></f7-navbar>
    <f7-block inner style="margin-top:70px ">
      <div class="money-type">今日收益</div>
      <div class="money-content">0.00</div>
    </f7-block>

    <f7-block inner>
      <div class="money-type">累计收益</div>
      <div class="money-content">0.00</div>
    </f7-block>

    <f7-block inner>
      <div class="message-type">累计咨询次数</div>
      <div class="money-content">0</div>
    </f7-block>

    <f7-block inner>
      <div class="money-type">已提现</div>
      <div class="money-content">0.00</div>
    </f7-block>

    <f7-block inner>
      <div class="money-type">帐户余额</div>
      <div class="money-content">0.00</div>
    </f7-block>

    <f7-block>
      <f7-button round fill @click="nextStep">提现</f7-button>
    </f7-block>
    <div style="position: fixed;bottom:0;width: 100%;height:60px;z-index: 100;display: flex" >
      <f7-button  style="height:60px;color:#000; flex:1;background:#ffffff"
                  href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -30px">会议约见</p>
      </f7-button>
      <f7-button  style="height: 60px;color:#000;flex: 1;background:#ffffff"
                  href="/recommend-user">
        <p  style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p  style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button  style="height:60px;color:#000;flex: 1;background:#ffffff"
                  href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x "style="color:#999;"></i></p>
        <p  style="margin-top: -25px;" >主页 </p>
      </f7-button>
      <f7-button  style="height:60px;color:#000;flex:1;background:#ffffff"
                  href="/myaccount-user">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x color-blue" ></i></p>
        <p style="margin-top:-25px" class="color-blue">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>

<script>
  export default {
    methods: {
      nextStep(){
//        this.$router.load({url: '/home/'})
      },
    }
  }
</script>


































