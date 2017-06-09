<style lang="scss">
    .MyAccount {

        .content-block {
            margin: 10px 0;
        }

        .message-type, .money-type {
            background-image: url(../assets/app-icons/icon-money.png);
            background-size: 1.5em 1.5em;
            line-height: 1.8em;
            background-repeat: no-repeat;
            padding-left: 2em;
        }

        .message-type {
            background-image: url(../assets/app-icons/icon-message.png);
        }

        .money-content {
            padding-left: 2em;
        }
    }
</style>


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
            <f7-button round fill @click="">确定</f7-button>
        </f7-block>
    </f7-page>
</template>


































