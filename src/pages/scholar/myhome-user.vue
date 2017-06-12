
<template>
    <f7-page class="MyHome">
        <f7-navbar title="个人中心" back-link="Back" sliding></f7-navbar>

        <div class="userCard-wrapper">
            <f7-card>
                <img class="userCard-avatar" src="../../assets/app-icons/avatar-user.png" />
                <div class="userCard-inner">
                    <div class="userCard-name">{{userCard.name}}</div>
                    <div>
                        <span class="userCard-unit">{{userCard.unit}}</span>
                        <span class="userCard-title">{{userCard.title}}</span>
                    </div>
                    <div class="userCard-area">{{userCard.area}}</div>
                </div>
            </f7-card>
        </div>


        <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 个人简介</f7-block-title>
        <f7-block inner>
            <p class="userBlock-summary">
                {{userCard.summary}}
            </p>
        </f7-block>

        <f7-block-title><i class="fa fa-user fa-lg color-blue"></i> 联系人信息</f7-block-title>
        <f7-list form>
            <f7-list-item>
                <f7-label floating>姓名</f7-label>
                <f7-input name="name" type="text" placeholder="章华" v-model="userCard.name"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>邮箱</f7-label>
                <f7-input name="email" type="text" placeholder="上海交通大学" v-model="userCard.email"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>手机号</f7-label>
                <f7-input name="phone" type="text" placeholder="博士" v-model="userCard.phone"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>所在地</f7-label>
                <f7-input name="address" type="text" placeholder="教授" v-model="userCard.address"></f7-input>
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
            userCard: {
                name: '张良培',
                unit: '上海交通大学',
                title: '教授',
                area: '材料运用管理学',
                address: '武汉',
                research: ['分子结构', '材料学', '生物学', '化学'],
                avatar: "static/img/avatar-professor.jpg",
                summary: '张良培（1962-），湖南安乡人，“长江学者计划”特聘教授，国家973项目首席科学家，武汉大学教授、博士生导师。 1982年毕业于湖南师范大学物理系。1988年在中国科学院西安光学精密机械研究所获硕士学位，毕业后进入武汉测绘科技大学任教，历任助教、讲师、副教授、教授。1998年获武汉大学博士学位。1999年至2000年赴香港中文大学从事博士后研究工作。2007年被评为教育部"长江学者奖励计划"特聘教授。'
            }
        }
    },

    methods: {
        commit(){},

        nextStep(){
            this.$router.load({url: '/home/'})
        },
    }
}
</script>