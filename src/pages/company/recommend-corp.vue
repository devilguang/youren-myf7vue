<style lang="scss">
    
</style>


<template>
    <f7-page class="Meeting">
        <f7-navbar title="推荐专家" back-link="Back" sliding></f7-navbar>

        <f7-list>
            <f7-list-item v-for="info in infoList" :key="info.id">
                <div class="info-content flex-vertical flex-center flex-middle" style="width: 100px; max-width: 120px; text-align: center; background: #ecf3fe;">
                    <img class="info-midea" :src="info.media" alt="" style="width: 60px; height:60px;">
                    <div class="info-title">{{info.name}}</div>
                </div>
                <div class="info-content unit">
                    <p class="info-title color-blue">{{info.unit}} {{info.subunit}} {{info.title}}</p>
                    <p class="info-text">方向： {{info.area}}</p>
                    <p class="info-text">行业： {{info.industry}}</p>
                    <p class="flex-around" style="margin-top: .5em;">
                        <f7-button color="blue" class="mini-button" fill round>查看详情</f7-button>
                        <f7-button color="orange" class="mini-button" fill round>立即联系</f7-button>
                    </p>
                </div>
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
                    id: 1,
                    media: '/static/img/avatar-user1.png',
                    name: '张良培',
                    unit: '上海交通大学',
                    subunit: '材料科学学院',
                    area: 'ASIC/FPGA设计, 测试 | 微电子行业研究',
                    industry: '微电子、半导体、多媒体技术',
                    title: "教授",
                    subtitle: "<br>",
                    text: "备需方提供工艺条件，工况，用专业仿真软件建立径向整体叶轮模型，划分网格仿真，优化模型输出为UG格式",
                },
                {
                    id: 2,
                    media: '/static/img/avatar-user1.png',
                    name: '张良培',
                    unit: '上海交通大学',
                    subunit: '材料科学学院',
                    area: 'ASIC/FPGA设计, 测试 | 微电子行业研究',
                    industry: '微电子、半导体、多媒体技术',
                    title: "教授",
                    subtitle: "<br>",
                    text: "备需方提供工艺条件，工况，用专业仿真软件建立径向整体叶轮模型，划分网格仿真，优化模型输出为UG格式",
                }
            ]
        }
    }
}
</script>
































