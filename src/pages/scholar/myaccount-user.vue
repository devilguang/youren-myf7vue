
<template>
    <f7-page class="MyAccount">
        <f7-navbar title="帐户" back-link="Back" sliding></f7-navbar>

        <f7-block inner>
            <div class="money-type">今日收益</div>
            <div class="money-content">10000.00</div>
        </f7-block>

        <f7-block inner>
            <div class="money-type">累计收益</div>
            <div class="money-content">8000.00</div>
        </f7-block>

        <f7-block inner>
            <div class="message-type">累计咨询次数</div>
            <div class="money-content">3</div>
        </f7-block>

        <f7-block inner>
            <div class="money-type">已提现</div>
            <div class="money-content">3000.00</div>
        </f7-block>

        <f7-block inner>
            <div class="money-type">帐户余额</div>
            <div class="money-content">5000.00</div>
        </f7-block>

        <f7-block style="margin-top: 40px; margin-bottom: 200px">
            <f7-button round fill @click="nextStep">确定</f7-button>
        </f7-block>
    </f7-page>
</template>

<script>
export default {
    methods: {
        nextStep(){
            this.$router.load({url: '/home/'})
        },
    }
}
</script>


































