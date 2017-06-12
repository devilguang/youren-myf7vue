

<template>
    <f7-page class="MyAccount">
        <f7-navbar title="帐户" back-link="Back" sliding></f7-navbar>
        <f7-block inner>
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


































