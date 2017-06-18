
<template>
    <f7-page class="Meeting">
      <v-cloak>
        <f7-navbar title="个人中心" back-link="Back" sliding></f7-navbar>
      </v-cloak>
        <div class="card-wrapper">
            <f7-card class="flex-left flex-middle">
                <img class="info-avatar" src="/static/img/avatar-user.png" style="height: 100px; width: 100px; margin-right: 15px;" />
                <div class="info-inner">
                    <div class="info-title color-blue" style="font-size: 16px;">{{info.name}}</div>
                    <div>
                        <span style="margin-right: 10px;">{{info.unit}}</span> |
                        <span style="margin-left: 10px;">{{info.title}}</span>
                    </div>
                    <div>{{info.area}}</div>
                </div>
            </f7-card>
        </div>


        <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 个人简介</f7-block-title>
        <f7-block inner  style="text-indent: 2em;">
            {{info.summary}}
        </f7-block>

        <f7-block-title><i class="fa fa-user fa-lg color-blue"></i> 联系人信息</f7-block-title>
        <f7-list form>
            <f7-list-item>
                <f7-label floating>姓名</f7-label>
                <f7-input name="name" type="text" placeholder="章华" v-model="info.name"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>邮箱</f7-label>
                <f7-input name="email" type="text" placeholder="上海交通大学" v-model="info.email"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>手机号</f7-label>
                <f7-input name="phone" type="text" placeholder="博士" v-model="info.phone"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>所在地</f7-label>
                <f7-input name="address" type="text" placeholder="教授" v-model="info.address"></f7-input>
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
            info: {
//                name: '张良培',
//                unit: '上海交通大学',
//                title: '教授',
//                area: '材料运用管理学',
//                address: '武汉',
//                research: ['分子结构', '材料学', '生物学', '化学'],
//                avatar: "static/img/avatar-professor.jpg",
//                summary: '张良培（1962-），湖南安乡人，“长江学者计划”特聘教授，国家973项目首席科学家，武汉大学教授、博士生导师。 1982年毕业于湖南师范大学物理系。1988年在中国科学院西安光学精密机械研究所获硕士学位，毕业后进入武汉测绘科技大学任教，历任助教、讲师、副教授、教授。1998年获武汉大学博士学位。1999年至2000年赴香港中文大学从事博士后研究工作。2007年被评为教育部"长江学者奖励计划"特聘教授。'
            }
        }
    },

    methods: {
        commit(){},

        nextStep(){
            this.$router.load({url: '/home/'})
        },
    },
  mounted(){
        this.info = window.localStorage.getItem("expertOpinion");
  }
}
</script>
