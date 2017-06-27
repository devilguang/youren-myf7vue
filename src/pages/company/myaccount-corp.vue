<style>
/*.content-block-inner:nth-child(1){*/
  /**/
/*}*/
.content-block:nth-child(1){
  margin-top: 60px;
}
  .content-block{
    padding-bottom: 0px;
  }
</style>

<template>
    <f7-page class="MyAccount">
          <f7-navbar title="帐户" back-link="Back" sliding></f7-navbar>
        <f7-block inner >
            <div class="message-type">累计咨询次数</div>
            <div class="money-content">3</div>
        </f7-block>

        <f7-block inner>
            <div class="money-type">累计支出</div>
            <div class="money-content">8000.00</div>
        </f7-block>

        <f7-block inner>
            <div class="money-type">可开发票</div>
            <div class="money-content">3000.00</div>
        </f7-block>

        <f7-block-title class="color-blue">发票信息</f7-block-title>
        <f7-block style="margin-bottom: 200px">
            <div class="fqinfo">
                <p>公司名称：<span class="color-gray">xxx公司</span></p>
                <p>公司税号：<span class="color-gray">25487xxxxx</span></p>
                <p>公司地址：<span class="color-gray">武汉市洪山区XXXX 027-12589xx</span></p>
                <p>开户银行：<span class="color-gray">中国XX银行xx支行</span></p>
                <p>帐号：<span class="color-gray">xxxxxx</span></p>
                <p>收票地址：<span class="color-gray">武汉市xxxxx</span></p>
                <p>收票人：<span class="color-gray">xxx收</span></p>
                <p>电话：<span class="color-gray">15798745621</span></p>
            </div>
        </f7-block>
      <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;z-index:100;display: flex" >
        <f7-button  style="width:80px;height:60px;color:#000;flex:1"
                    href="/mymeeting-corp">
          <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
          <p style="margin-top: -25px">会议约见</p>
        </f7-button>
        <f7-button  style="width:80px;height: 60px;color:#000;flex:1"
                    href="/recommend-corp">
          <p  style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
          <p  style="margin-top: -25px">推荐</p>

        </f7-button>
        <f7-button  style="width:80px;height:60px;color:#000;flex:1"
                    href="/myhome-corp">
          <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
          <p  style="margin-top: -25px;" >主页 </p>
        </f7-button>
        <f7-button  style="width:80px;height:60px;color:#000;flex:1"
                    href="/myaccount-corp">
          <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x color-blue" ></i></p>
          <p style="margin-top:-25px" class="color-blue">账户</p>
        </f7-button>
      </div>
    </f7-page>
</template>

<script>
export default {
    data(){
        return {
            info: {

            }
        }
    },
    methods: {
        nextStep(){
            this.$router.load({url: '/home/'})
        },
    }
}
</script>


































