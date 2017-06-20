<template>

    <f7-page with-subnavbar no-page-content class="Meeting ">
      <div v-cloak>
       <f7-navbar back-link="Back" title="约见" sliding></f7-navbar>
        <f7-subnavbar sliding :slot="$theme.material ? 'after-inner' : 'default'">
        <f7-buttons>
          <f7-button tab-link="#tab1">待确认</f7-button>|
          <f7-button tab-link="#tab2">已确认</f7-button>|
          <f7-button tab-link="#tab3" active>已结束</f7-button>
        </f7-buttons>
      </f7-subnavbar>
      </div>
        <f7-tabs swipeable>
            <f7-page-content id="tab1" tab >
                <f7-block-title class="color-blue">
                    <i class="fa fa-star"></i> 我感兴趣的
                </f7-block-title>
                <f7-list>
                    <f7-list-item v-for="info in myInteresting" :key="info.id">
                        <div class="info-content unit">
                            <p class="info-title color-blue">{{info.title}}</p>
                            <p class="info-text">{{info.desc}}</p>
                            <p class="info-time">{{info.time}}</p>
                        </div>
                        <div class="info-action flex-vertical flex-middle flex-center color-red">
                            <div style="font-size: 12px;">{{info.stepMessage}}</div>
                        </div>
                    </f7-list-item>
                </f7-list>

                <f7-block-title class="color-blue">
                    <i class="fa fa-heartbeat"></i> 对我感兴趣的
                </f7-block-title>
                <f7-list>
                    <f7-list-item v-for="info in beInterested" :key="info.id">
                        <div class="info-content unit">
                            <div class="flex-left">
                                <img class="info-midea" :src="info.media" alt="" style="width: 80px; height:50px; margin-right: 10px;">
                                <div class="">
                                    <p class="info-title">{{info.customerUnit}}</p>
                                    <p class="info-misc">{{info.customerName}}  <span style="display:inline-block; margin-left: 10px; font-size: smaller">({{info.customerTitle}})</span></p>
                                </div>
                            </div>
                            <p class="info-text" style="margin-top: .5em;">
                                留言： {{info.message}}
                            </p>
                        </div>
                        <div class="info-action flex-vertical flex-around color-red">
                            <template v-if="info.stepCode=='待确认'">
                                <f7-button color="red" fill round>拒绝</f7-button>
                                <f7-button color="blue" fill round>接受</f7-button>
                            </template>
                            <div v-else-if="info.stepCode=='已确认'" style="font-size: 12px;">
                                {{info.stepMessage}}
                            </div>
                        </div>
                    </f7-list-item>
                </f7-list>
            </f7-page-content>

            <f7-page-content id="tab2" tab>
                <f7-block-title class="color-blue">今天</f7-block-title>
                <f7-list>
                    <f7-list-item v-for="info in meetings" v-if="isToday(info.meetingDate)" :key="info.id">
                        <div class="info-content" style="width: max-content; max-width: 120px;">
                            <img class="info-midea" :src="info.media" alt="" style="width: 80px; height:50px; margin-right: 10px;">
                            <p class="info-title">{{info.customerUnit}}</p>
                            <p class="info-misc">{{info.customerName}} <small>{{info.customerTitle}}</small></p>
                        </div>
                        <div class="info-content unit">
                            <p class="info-title color-blue">{{info.meetingType}}</p>
                            <p class="info-misc has-icon-phone">{{info.customerPhone}}</p>
                            <p class="info-misc has-icon-time">{{formateDate(info.meetingDate)}} <small style="margin-left: 10px;">({{info.meetingDuration}})</small></p>
                            <p class="info-misc has-icon-address">{{info.meetingAddress}}</p>
                            <p class="info-misc has-icon-money">获取报酬 <span class="color-orange">{{info.payment}}</span> 元</p>
                        </div>
                    </f7-list-item>
                </f7-list>

                <f7-block-title class="color-blue">之后</f7-block-title>
                <f7-list>
                    <f7-list-item v-for="info in meetings" v-if="isAfterToday(info.meetingDate)" :key="info.id">
                        <div class="info-content" style="width: max-content; max-width: 120px;">
                            <img class="info-midea" :src="info.media" alt="" style="width: 80px; height:50px; margin-right: 10px;">
                            <p class="info-title">{{info.customerUnit}}</p>
                            <p class="info-misc">{{info.customerName}} <small>{{info.customerTitle}}</small></p>
                        </div>
                        <div class="info-content unit">
                            <p class="info-title color-blue">{{info.meetingType}}</p>
                            <p class="info-misc has-icon-phone">{{info.customerPhone}}</p>
                            <p class="info-misc has-icon-time">{{formateDate(info.meetingDate)}} <small style="margin-left: 10px;">({{info.meetingDuration}})</small></p>
                            <p class="info-misc has-icon-address">{{info.meetingAddress}}</p>
                            <p class="info-misc has-icon-money">获取报酬 <span class="color-orange">{{info.payment}}</span> 元</p>
                        </div>
                    </f7-list-item>
                </f7-list>
            </f7-page-content>

            <f7-page-content id="tab3" tab active>
                <f7-list>
                    <f7-list-item v-for="info in meetings" v-if="isBeforeToday(info.meetingDate)" :key="info.id">
                        <div class="info-content" style="width: max-content; max-width: 120px;">
                            <img class="info-midea" :src="info.media" alt="" style="width: 80px; height:50px; margin-right: 10px;">
                            <p class="info-title">{{info.customerUnit}}</p>
                        </div>
                        <div class="info-content unit">
                            <p class="info-title">{{info.customerName}} <small>{{info.customerTitle}}</small></p>
                            <p class="info-misc has-icon-time">{{formateDate(info.meetingDate)}}</p>
                            <p class="info-misc has-icon-money">
                                获取报酬 <span class="color-orange">{{info.payment}}</span> 元
                                <span class="color-red">(未结算)</span>
                            </p>
                        </div>
                        <div class="info-action" style="width: 80px;">
                            <template v-if="info.hasRating">
                                综合评分
                                <StarRating class="unit" v-model="info.rating.composite" :star-size="15" :increment="1" :padding="3" :show-rating="false"></StarRating>
                            </template>
                            <template v-else>
                                <f7-button color="blue" fill round @click="rating(info)">去评价</f7-button>
                            </template>
                        </div>
                    </f7-list-item>
                </f7-list>
            </f7-page-content>
        </f7-tabs>

        <f7-popup :opened="popupRating" @popup:closed="popupRating=false">
            <f7-view>
                <f7-pages class="Rating">
                <f7-page navbar-fixed v-for="info in infos" :key="info.id">
                    <f7-navbar title="星级评分">
                    <f7-nav-right>
                        <!-- Using state: -->
                        <f7-link @click="popupRating=false">完成</f7-link>
                    </f7-nav-right>
                    </f7-navbar>

                    <div class="flex-left flex-middle" style="margin: 5px;">
                        <img class="info-midea" :src="info.media" alt="" style="width: 80px; height:80px; margin-right: 10px;">
                        <div class="info-content unit">
                            <p class="info-title" style="margin-bottom: .2em;">{{info.customerUnit}}</p>
                            <p class="info-misc" style="margin-bottom: .2em;">{{info.customerName}} <small>{{info.customerTitle}}</small></p>
                            <p class="info-misc" style="margin-bottom: .2em;">报酬金额 <span class="color-orange">{{info.payment}}</span> 元</p>
                        </div>
                        <div class="info-content">
                            <p class="info-misc">{{formateDate(info.meetingDate, 'YYYY-MM-DD HH:mm')}}</p>
                        </div>
                    </div>


                    <f7-block>
                        <div class="info-title">约见评价</div>
                        <div class="flex-left flex-top">
                            <div class="color-gray unit-1-4">匹配准确：</div>
                            <StarRating class="unit" v-model="info.rating.accuracy" :star-size="22" :increment="1" :padding="10" :show-rating="false"></StarRating>
                        </div>
                        <div class="flex-left flex-top">
                            <div class="color-gray unit-1-4">企业诚意：</div>
                            <StarRating class="unit" v-model="info.rating.sincerity" :star-size="22" :increment="1" :padding="10" :show-rating="false"></StarRating>
                        </div>
                        <div class="flex-left flex-top">
                            <div class="color-gray unit-1-4">经纪人服务：</div>
                            <StarRating class="unit" v-model="info.rating.service" :star-size="22" :increment="1" :padding="10" :show-rating="false"></StarRating>
                        </div>
                        <div class="flex-left flex-top">
                            <div class="color-gray unit-1-4">综合评分：</div>
                            <StarRating class="unit" v-model="info.rating.composite" :star-size="22" :increment="1" :padding="10" :show-rating="false"></StarRating>
                        </div>
                    </f7-block>
                </f7-page>
                </f7-pages>
            </f7-view>
        </f7-popup>

    </f7-page>
</template>
<script>
export default {

    data() {
        return {
            popupRating: false,

            infos: [],

            myInteresting: [
                {
                    id: 1,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    midea: '',
                    stepMessage: '系统正在安排约会，请耐心等待',
                },
                {
                    id: 2,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    midea: '',
                    stepMessage: '系统正在安排约会，请耐心等待',
                },
            ],

            beInterested: [
                {
                    id: 1,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp1.jpg',
                    stepCode:    '待确认',
                    stepMessage: '您已接受对方邀请，系统正在安排约见，请耐心等待',

                    message: '对您的技术“可靠可坐的婴儿椅” 很感兴趣，希望跟您电话约谈。',
                    customerUnit: '武汉船舶研究院',
                    customerName: '张大大',
                    customerTitle: '部门负责人',


                },
                {
                    id: 2,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp2.jpg',

                    stepCode:    '已确认',
                    stepMessage: '您已接受对方邀请，系统正在安排约见，请耐心等待',

                    message: '对您的技术“可靠可坐的婴儿椅” 很感兴趣，希望跟您电话约谈。',
                    customerUnit: '武汉船舶研究院',
                    customerName: '张大大',
                    customerTitle: '部门负责人',
                },
            ],

            meetings: [
                {
                    id: 1,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp1.jpg',
                    stepCode:    '待确认',
                    stepMessage: '您已接受对方邀请，系统正在安排约见，请耐心等待',

                    message: '对您的技术“可靠可坐的婴儿椅” 很感兴趣，希望跟您电话约谈。',
                    customerUnit: '武汉船舶研究院',
                    customerName: '张大大',
                    customerTitle: '部门负责人',
                    meetingDate: '2017-06-09 12:30:00',
                    meetingDuration: '会议30分钟',
                    meetingType: '电话会议',
                    meetingAddress: '',
                    customerPhone: '1357891254',
                    payment: 0,

                    edit: false,
                    hasRating: false,
                    rating: {
                        accuracy : 0, // 准确度
                        sincerity: 0, // 诚意
                        service  : 0, // 服务
                        composite: 0
                    },
                },
                {
                    id: 2,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp2.jpg',

                    stepCode:    '已确认',
                    stepMessage: '您已接受对方邀请，系统正在安排约见，请耐心等待',

                    message: '对您的技术“可靠可坐的婴儿椅” 很感兴趣，希望跟您电话约谈。',
                    customerUnit: '武汉船舶研究院',
                    customerName: '张大大',
                    customerTitle: '部门负责人',
                    meetingDate: '2017-06-20 12:30:00',
                    meetingDuration: '会议30分钟',
                    meetingType: '线下约谈',
                    meetingAddress: '武汉市洪山区光谷天地c区星巴克',
                    customerPhone: '1357891254',
                    payment: 200,

                    edit: false,
                    hasRating: false,
                    rating: {
                        accuracy : 0, // 准确度
                        sincerity: 0, // 诚意
                        service  : 0, // 服务
                        composite: 0
                    },
                },
                {
                    id: 3,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp3.jpg',

                    stepCode:    '已确认',
                    stepMessage: '您已接受对方邀请，系统正在安排约见，请耐心等待',

                    message: '对您的技术“可靠可坐的婴儿椅” 很感兴趣，希望跟您电话约谈。',
                    customerUnit: '武汉船舶研究院',
                    customerName: '张大大',
                    customerTitle: '部门负责人',
                    meetingDate: '2017-06-20 12:30:00',
                    meetingDuration: '会议30分钟',
                    meetingType: '线下约谈',
                    meetingAddress: '武汉市洪山区光谷天地c区星巴克',
                    customerPhone: '1357891254',
                    payment: 300,

                    edit: false,
                    hasRating: false,
                    rating: {
                        accuracy : 0, // 准确度
                        sincerity: 0, // 诚意
                        service  : 0, // 服务
                        composite: 0
                    },
                },
                {
                    id: 4,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp3.jpg',


                    stepCode:    '已结束',
                    stepMessage: '您已接受对方邀请，系统正在安排约见，请耐心等待',

                    message: '对您的技术“可靠可坐的婴儿椅” 很感兴趣，希望跟您电话约谈。',
                    customerUnit: '武汉船舶研究院',
                    customerName: '张大大',
                    customerTitle: '部门负责人',
                    meetingDate: '2017-05-20 12:30:00',
                    meetingDuration: '会议30分钟',
                    meetingType: '线下约谈',
                    meetingAddress: '武汉市洪山区光谷天地c区星巴克',
                    customerPhone: '1357891254',
                    payment: 300,

                    edit: false,
                    hasRating: false,
                    rating: {
                        accuracy : 0, // 准确度
                        sincerity: 0, // 诚意
                        service  : 0, // 服务
                        composite: 0
                    },
                },
                {
                    id: 5,
                    title: '微通道换热器应用于制冷系统（干式）',
                    number: 'N128745613',
                    step: '研发',
                    area: '北京',
                    money: '50万',
                    time: '2017年5月21日 17:30 发送',
                    keywords: ['机械', '涡轮', '建模'],
                    desc: '备需方提供工艺条件，工况，用仿真软件建议径向整体叶轮模型，划分网格仿真，优化模型输入为UG格式。需求方有基础数据，涡轮叶片尺寸为300mm',
                    corpDesc: '武钢是新中国成立后兴建的第一个特大型钢铁联合企业，于1955年开始建设，1958年9月13日建成投产。2016年9月22日，宝钢集团与武钢集团实施联合重组，组建“中国宝武钢集团有限公司”，武钢集团整体资产无偿划入，成为其全资子公司。武钢集团与宝武集团武汉总部实行“两块牌子、一套班子”方式动作，是宝武集团在武汉的延伸，承担武钢集团作为公司法人的各项管理职能。',
                    media: '/static/img/corp3.jpg',

                    stepCode:    '已结算',
                    stepMessage: '您已接受对方邀请，系统正在安排约见，请耐心等待',

                    message: '对您的技术“可靠可坐的婴儿椅” 很感兴趣，希望跟您电话约谈。',
                    customerUnit: '武汉船舶研究院',
                    customerName: '张大大',
                    customerTitle: '部门负责人',
                    meetingDate: '2017-03-20 12:30:00',
                    meetingDuration: '会议30分钟',
                    meetingType: '线下约谈',
                    meetingAddress: '武汉市洪山区光谷天地c区星巴克',
                    customerPhone: '1357891254',
                    payment: 300,

                    edit: false,
                    hasRating: true,
                    rating: {
                        accuracy : 2, // 准确度
                        sincerity: 3, // 诚意
                        service  : 1, // 服务
                        composite: 3
                    },
                }
            ]
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
        },

        isBeforeToday(date){
            return moment(date).isBefore(new Date(), 'day')
        },

        rating(info) {
            // info.edit = true;
            this.infos = [info];
            this.popupRating = true;
        }

    },
  mounted(){
      window.localStorage.getItem("a")
  }
}
</script>
