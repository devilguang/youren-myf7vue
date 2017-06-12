

<template>
    <f7-page with-subnavbar no-page-content class="Home">
        <f7-navbar back-link="Back" title="主页" sliding>
            <f7-subnavbar sliding :slot="$theme.material ? 'after-inner' : 'default'">
                <f7-buttons>
                    <f7-button tab-link="#tab1">需求列表</f7-button>|
                    <f7-button tab-link="#tab2" >企业主页</f7-button>|
                    <f7-button tab-link="#tab3" active>联系人</f7-button>
                </f7-buttons>
            </f7-subnavbar>
        </f7-navbar>
    
        <f7-tabs swipeable>
            <f7-page-content id="tab1" tab >
                <f7-block-title class="color-black"> 推广中</f7-block-title>
                <f7-list>
                    <f7-list-item v-for="info in infoList.filter(info=> info.enable)" :key="info.id">
                        <div class="flex-left flex-top">
                            <img :src="info.media" alt="" style="width: 80px; height:80px; margin-right: 10px;">
                            <div class="unit">
                                <div class="info-title">{{info.title}}</div>
                                <p class="info-misc">{{info.desc}} </p>
                                <div class="info-misc flex-right flex-middle" style="text-align: right;">
                                    <f7-input name="switch" type="switch" @change="" v-model="info.enable"></f7-input> 
                                    <span style="white-space: nowrap; margin-left: 10px;">下架</span>
                                </div>
                            </div>
                        </div> 
                    </f7-list-item>
                </f7-list>

                <f7-block-title class="color-black"> 已下架</f7-block-title>
                <f7-list>
                    <f7-list-item v-for="info in infoList.filter(info=> !info.enable)" :key="info.id">
                        <div class="flex-left flex-top">
                            <img :src="info.media" alt="" style="width: 80px; height:80px; margin-right: 10px;">
                            <div class="unit">
                                <div class="info-title">{{info.title}}</div>
                                <p class="info-misc">{{info.desc}} </p>
                                <div class="info-misc flex-right flex-middle" style="text-align: right;">
                                    <f7-input name="switch" type="switch" @change="" v-model="info.enable"></f7-input> 
                                    <span style="white-space: nowrap; margin-left: 10px;">上架</span>
                                </div>
                            </div>
                        </div> 
                    </f7-list-item>
                </f7-list>
            </f7-page-content>

            <f7-page-content id="tab2" tab >
                <div class="infoCard-wrapper">
                    <f7-card>
                        <img class="infoCard-avatar" src="../../assets/app-icons/avatar-unit1.png" />
                        <div class="infoCard-inner">
                            <div class="infoCard-name">{{infoCard.name}}</div>
                            <div>
                                <span style="margin-right: 20px;">{{infoCard.corpType}}</span> | 
                                <span style="margin-left: 20px;">{{infoCard.corpMany}}</span>
                            </div>
                        </div>
                    </f7-card>
                </div>

                <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 所属领域</f7-block-title>
                <f7-block inner>
                    <p style="line-height: 2em;">
                        {{infoCard.area}}
                    </p>
                </f7-block>

                <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 企业简介</f7-block-title>
                <f7-block inner>
                    <p style="line-height: 2em; text-indent: 2em;">
                        {{infoCard.summary}}
                    </p>
                </f7-block>

            </f7-page-content>

            <f7-page-content id="tab3" tab active>
                <f7-block-title>联系人</f7-block-title>
                <f7-list>
                    <f7-list-item v-for="info in contactors" :key="info.name">
                        <div class="unit">
                            <div class="info-misc">姓名：{{info.name}}</div>
                            <div class="info-misc">电话：{{info.phone}}</div>
                            <div class="info-misc">邮箱：{{info.email}}</div>
                            <div class="info-misc">职位：{{info.title}}</div>
                        </div>
                        <div class="flex-middle flex-center" style="width: 40px;">
                            <div class="fa fa-edit fa-lg" @click=""></div>
                        </div>
                    </f7-list-item>
                </f7-list>
                <f7-block style="">
                    <f7-button @click="">新增联系人</f7-button>
                </f7-block>
            </f7-page-content>
        </f7-tabs>
    </f7-page>
</template>
<script>
export default {

    data() {
        return {
            infoCard: {
                name: '百度网络科技有限公司',
                corpName: '百度网络科技有限公司',
                corpType: '上市公司',
                corpMany: '2000人以上',
                area: 'IT/互联网、生产计算机软件; 提供相关技术咨询、技术服务技术培训',
                summary: '百度，全球最大的中文搜索引擎，最大的中文网站。2000年1月创立于北京中关村。1999年底，身在美国硅谷的的李彦宏看到了中国互联网及中文搜索引擎服务的巨大发展潜力，抱着技术改变世界的梦想，他毅然辞掉硅谷的高薪工作，携搜索引擎专利技术，于2000年1月1日在中关村创建了百度公司。从最初的不足10人发展至今，员工人数超过18000人。如今的百度，已成为中国最受欢迎，影响力最大的中文网站。'
            },

            infoList: [
                {
                    id: 1,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp1.jpg',
                    enable: true,
                },
                {
                    id:2,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp2.jpg',
                    enable: false,
                },
                {
                    id:3,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp1.jpg',
                    enable: true,
                },
                {
                    id:4,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp2.jpg',
                    enable: false,
                },
            ],

            contactors: [
                {
                    name: '张万磊',
                    phone: '13071242556',
                    email: 'awl@metadata.net.cn',
                    title: '产品经理'
                }
            ],
        }
    },

    methods: {
        formateDate (date, fmt = "M月D日dddd H:mm"){
            return moment(date).format(fmt)
        },

        isToday(date){
            return moment(date).isSame(new Date(), 'day')
        },

        isAfterToday(date){
            return moment(date).isAfter(new Date(), 'day')
        }

    }
}
</script>
