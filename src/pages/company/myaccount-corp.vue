<style>
  .item-title {
    font-size: 14px;
  }
</style>

<template>
  <f7-page class="MyAccount" name="myaccount-corp">
    <f7-navbar title="帐户" back-link="Back" sliding></f7-navbar>
    <div class="page-content infinite-scroll" style="margin-top: 70px;height: 5rem">
      <f7-block inner>
        <div class="message-type">累计咨询次数</div>
        <div class="money-content">0</div>
      </f7-block>

      <f7-block inner>
        <div class="money-type">累计支出</div>
        <div class="money-content">0</div>
      </f7-block>

      <f7-block inner>
        <div class="money-type">可开发票</div>
        <div class="money-content">0</div>
      </f7-block>

      <f7-block-title class="color-blue"><span
        style="float: left">发票信息</span><span style="color: #000;float: right" v-if="flag"
                                             @click="flag = false">编辑</span>
        <span style="color: #000;float: right" v-if="!flag" @click="flag = true">完成</span></f7-block-title>
      <div style="clear: both"></div>
      <f7-block>
        <form id="my-form" class="list-block" style="margin: 0;width: 100%;color: #cccccc;" :disabled="flag">
          <ul style="width: 100%;">
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label item-title">公司名称：</div>
                  <div class="item-input">
                    <input type="text" name="name" v-model="info.name" @blur="loose" @focus="getpoint">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label item-title">公司税号：</div>
                  <div class="item-input">
                    <input type="text" name="name" v-model="info.tallage" @blur="loose" @focus="getpoint">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label item-title">公司地址：</div>
                  <div class="item-input">
                    <input type="text" name="name" v-model="info.addr" @blur="loose" @focus="getpoint">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label item-title">开户银行：</div>
                  <div class="item-input">
                    <input type="text" name="name" v-model="info.bank" @blur="loose" @focus="getpoint">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label item-title">帐号：</div>
                  <div class="item-input">
                    <input type="text" name="name" v-model="info.account" @blur="loose" @focus="getpoint">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label item-title">收票地址：</div>
                  <div class="item-input">
                    <input type="text" name="name" v-model="info.billToAddr" @blur="loose" @focus="getpoint">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label item-title">收票人：</div>
                  <div class="item-input">
                    <input type="text" name="name" v-model="info.checkTaker" @blur="loose" @focus="getpoint">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title label item-title">电话：</div>
                  <div class="item-input">
                    <input type="text" name="name" v-model="info.phone" @blur="loose" @focus="getpoint">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </form>
      </f7-block>
    </div>
    <div style="position: fixed;bottom:0;width: 100%;height:60px;z-index:100;display: flex" v-show="footerFlag">
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/mymeeting-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">会议约见</p>
      </f7-button>
      <f7-button style="height: 60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/recommend-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/myhome-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x " style="color:#999;"></i></p>
        <p style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1;background:#ffffff;"
                 @click="$router.load({url:'/myaccount-corp'})">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x color-blue"></i></p>
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
          name: '',
          tallage: '',
          addr: '',
          bank: '',
          account: '',
          billToAddr: '',
          checkTaker: '',
          phone: ''
        },
        flag: true,
        footerFlag: true

      }
    },
    methods: {
      nextStep(){
        this.$router.load({url: '/home/'})
      },
      loose(){
        this.footerFlag = true
      },
      getpoint(){
        this.footerFlag = false
      },
    }
  }
</script>


































