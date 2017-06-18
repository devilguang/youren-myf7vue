<style lang="scss">

</style>

<template>
    <f7-page>
      <v-cloak>
        <f7-navbar back-link="Back" title="联系方式" sliding></f7-navbar>
      </v-cloak>
        <f7-block style=" text-align:left">
            为了方便我们及时与您取得联系，请您填写至少一位联系人信息。
        </f7-block>

        <f7-card v-for="(linkman, index) in linkmans" :key="linkman.id">
            <f7-card-content style="margin-bottom: 20px;">

                <form class="list-block inputs-list">
                    <div v-show="linkman.id != 0" class="fa fa-times-circle fa-lg" style="position: absolute; top:0px; right: 0px; z-index:100" @click="removeLinkman(linkman.id)"></div>
                    <ul>
                        <li>
                            <div class="item-content" style="position: relative;">
                                <div class="item-inner">
                                    <div class="item-title label">联系人姓名</div>
                                    <div class="item-input item-input-field">
                                        <input type="text" placeholder="" v-model="linkman.name" />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                                <div class="item-inner">
                                    <div class="item-title label">联系人电话</div>
                                    <div class="item-input item-input-field">
                                        <input type="tel" placeholder="" v-model="linkman.phone" />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                                <div class="item-inner">
                                    <div class="item-title label">联系人邮箱</div>
                                    <div class="item-input item-input-field">
                                        <input type="text" placeholder="" v-model="linkman.email" />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <!--<div class="item-media"><i class="icon material-icons">person_outline</i></div>-->
                                <div class="item-inner">
                                    <div class="item-title label">联系人职务</div>
                                    <div class="item-input item-input-field">
                                        <input type="text" placeholder="" v-model="linkman.post" />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </form>
            </f7-card-content>
        </f7-card>

        <f7-block style="">
            <f7-button @click="addLinkman">新增联系人</f7-button>
        </f7-block>

        <f7-block style="margin-bottom: 200px">
            <f7-button round fill @click="commit">确定</f7-button>
        </f7-block>
    </f7-page>
</template>
<script>
let autoID = 0;
export default {

    data() {
        return {
            linkmans: [
                {
                    id: 0,
                    name: '',
                    phone: '',
                    email: '',
                    post: '',
                }
            ],
        }
    },
    methods: {
        test(){
            console.log('oo')
        },
        addLinkman() {
            this.linkmans.push({
                id: ++autoID,
                name: '',
                phone: '',
                email: '',
                post: '',
            })
        },
        removeLinkman(id) {

            let index = this.linkmans.findIndex(man => man.id == id)
            this.linkmans.splice(index, 1)
        },
        commit() {
            const self = this;
            this.$f7.alert('恭喜您，认证成功！麦子根据您的信息自动为您匹配了12个企业需求，您可以点击推荐查看。', '认证成功', function(){
                self.$router.load({url: '/home/'})
            })
        },

    },

}
</script>
