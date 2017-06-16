<template>
  <f7-page toolbar-fixed>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon="icon-bars" open-panel="left"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding>有人微信公众号</f7-nav-center>
      <f7-nav-right>
        <f7-link icon="icon-bars" open-panel="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar>
      <f7-link>Left</f7-link>
      <f7-link>Right</f7-link>
    </f7-toolbar>

    <f7-block-title>登陆步骤</f7-block-title>
    <f7-list>
      <f7-list-item title="登陆" link="/login/"></f7-list-item>
      <f7-list-item title="认证" link="/check/"></f7-list-item>
      <f7-list-item title="选择领域" link="/areas/"></f7-list-item>
      <f7-list-item title="联系方式" link="/contact/"></f7-list-item>
    </f7-list>

    <f7-block-title>我的（专家版）</f7-block-title>
    <f7-list>
      <f7-list-item title="我的主页" link="/myhome-user/"></f7-list-item>
      <f7-list-item title="我的帐户" link="/myaccount-user/"></f7-list-item>
      <f7-list-item title="推荐" link="/recommend-user/"></f7-list-item>
      <f7-list-item title="约见" link="/mymeeting-user/"></f7-list-item>
    </f7-list>

    <f7-block-title>我的（企业版）</f7-block-title>
    <f7-list>
      <f7-list-item title="我的主页" link="/myhome-corp/"></f7-list-item>
      <f7-list-item title="我的帐户" link="/myaccount-corp/"></f7-list-item>
      <f7-list-item title="推荐" link="/recommend-corp/"></f7-list-item>
      <f7-list-item title="约见" link="/mymeeting-corp/"></f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
export default {}
</script>
