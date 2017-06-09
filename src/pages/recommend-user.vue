<style lang="scss">
    .Recommend {

    }
</style>


<template>
    <f7-page class="Recommend">
        <f7-navbar title="推荐需求" back-link="Back" sliding></f7-navbar>

        <f7-list media-list>
            <f7-list-item v-for="info in infoList" :key="info.id" v-bind="info">
            </f7-list-item>
        </f7-list>


    </f7-page>
</template>


<script>
export default {
    data() {
        return {
            infoList: [
                {
                    id: "1",
                    media: '<img src="/static/img/corp1.jpg" width="80">',
                    title: "涡轮机械叶片设计建模仿真优化",
                    subtitle: "<br>",
                    text: "备需方提供工艺条件，工况，用专业仿真软件建立径向整体叶轮模型，划分网格仿真，优化模型输出为UG格式",
                    link: "/demand/"
                },
                {
                    id: "2",
                    media: '<img src="/static/img/corp2.jpg" width="80">',
                    title: "涡轮机械叶片设计建模仿真优化",
                    subtitle: "<br>",
                    text: "备需方提供工艺条件，工况，用专业仿真软件建立径向整体叶轮模型，划分网格仿真，优化模型输出为UG格式",
                    link: "/demand/"
                },
                {
                    id: "3",
                    media: '<img src="/static/img/corp3.jpg" width="80">',
                    title: "涡轮机械叶片设计建模仿真优化",
                    subtitle: "<br>",
                    text: "备需方提供工艺条件，工况，用专业仿真软件建立径向整体叶轮模型，划分网格仿真，优化模型输出为UG格式",
                    link: "/demand/"
                },
                {
                    id: "4",
                    media: '<img src="/static/img/corp4.jpg" width="80">',
                    title: "涡轮机械叶片设计建模仿真优化",
                    subtitle: "<br>",
                    text: "备需方提供工艺条件，工况，用专业仿真软件建立径向整体叶轮模型，划分网格仿真，优化模型输出为UG格式",
                    link: "/demand/"
                }
            ]
        }
    }
}
</script>
































