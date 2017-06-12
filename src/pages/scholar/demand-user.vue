

<template>
    <f7-page class="Meeting">
        <f7-navbar title="推荐需求" back-link="Back" sliding></f7-navbar>

        <div class="card-wrapper">
            <f7-card>
                <div class="info-title color-blue">{{info.title}}</div>
                <div class="info-content">
                    <p>编号: {{info.number}} </p>
                    <p>需求阶段: {{info.step}} </p>
                    <p>所在地: {{info.area}} </p>
                    <p>金额: {{info.money}} </p>
                    <p class="color-red">关键词: {{info.keywords.join(' ')}} </p>
                </div>
                <img class="info-media"  src="../../assets/img/corp1.jpg" />
            </f7-card>
        </div>


        <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 需求简介</f7-block-title>
        <f7-block inner>
            {{info.desc}}
        </f7-block>

        <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 企业信息</f7-block-title>
        <f7-block inner>
            {{info.corpDesc}}
        </f7-block>

        <f7-block style="margin-bottom: 200px">
            <f7-button round :color="buttonText == '立即联系' ? 'blue' : 'orange'" fill :disabled="buttonText != '立即联系'" @click="nextStep">{{buttonText}}</f7-button>
        </f7-block>

    </f7-page>
</template>

<script>
export default {
    data() {
        return {
            info: {
                title: '微通道换热器应用于制冷系统（干式）',
                number: 'N128745613',
                step: '研发',
                area: '北京',
                money: '50万',
                keywords: ['机械', '涡轮', '建模'],
                desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                midea: '',
            },

            buttonText: "立即联系" || " 约见安排中..." || "已安排约见" || "已完成"
                                
        }
    },

    methods: {
        nextStep(){
            const self = this;
            this.$f7.confirm('您是否对该需求感兴趣，确定后系统将发送您的基本信息给对方。', '立即联系', () => {
                this.$f7.alert('系统正在为您安排约会，稍后会有技术经纪人与您联系，您可以在“约会”查看进度。', '约会安排中', () => {
                    this.buttonText = "约见安排中"
                    // this.$router.load("/home/")
                })
            })
        }
    }
}
</script>