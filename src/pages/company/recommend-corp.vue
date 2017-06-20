<style >
    .layOutExperts{
      position: absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
    }
   .close{
     width:100%;
     height: 56px;
     position: absolute;
     top:0;
     left:0;
     z-index: 100000;
    }
    .head{
      text-align: center;
      height: 200px;
      position: relative;
      background: rgba(0,0,0,.3);
    }
    .headBj{
      width:100%;
      height: 200px;
      position: absolute;
      background-image: url("../../assets/img/avatar-dog.jpg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      z-index:-1000;
      top:0;
      left:0;
      filter: blur(10px)

    }
    .head img{
      width: 104px;
      height: 103px;
      margin-top: 15px;
      background-size: 104px 103px;
      background-repeat: no-repeat;
    }
    .head .avatarName{
      margin-top: 0;
      color: #3982e8;
    }
    .avataDegree{
      margin-top: -10px;
    }
    .avataDegree span{
      margin-left: 10px;
    }
</style>


<template>
    <f7-page class="Meeting">
          <div v-cloak>
          <f7-navbar title="推荐专家" back-link="Back" sliding></f7-navbar></div>
        <f7-list>
            <f7-list-item v-for="info in infoList" :key="info.id">
                <div class="info-content flex-vertical flex-center flex-middle" style="width: 100px; max-width: 120px; text-align: center; background: #ecf3fe;">
                    <img class="info-midea" :src="info.headImg" alt="" style="width: 60px; height:60px;">
                    <div class="info-title">{{info.name}}</div>
                </div>
                <div class="info-content unit">
                    <p class="info-title color-blue">{{info.college}} {{info.subunit}} {{info.professionalTitle}}</p>
                    <p class="info-text">方向： {{info.researchDirect}}</p>
                    <p class="info-text">行业： {{info.field}}</p>
                    <p class="flex-around" style="margin-top: .5em;">
                        <f7-button color="blue" class="mini-button" fill round  @click="boolean=true">查看详情</f7-button>
                        <f7-button color="orange" class="mini-button" fill round @click="">立即联系</f7-button>
                    </p>
                </div>
            </f7-list-item>
        </f7-list>

      <!--点击查看详情弹出专家的详细列表-->
        <f7-popup :opened="boolean">
          <!-- Popup content goes here -->
          <!--back-link="Back"-->
          <f7-navbar title="专家详情" back-link="Back" href="#"  sliding></f7-navbar>
          <div class="close" @click="boolean = false"></div>
          <f7-pages>
            <div class="head">
              <img src="../../assets/img/avatar-user1.png" alt="">
              <p class="avatarName">张良培</p>
              <p class="avataDegree"><span>上海交通大学</span><span>材料科学学院</span><span>教授</span></p>
              <div class="headBj"></div>
            </div>
            <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i>所在领域</f7-block-title>
            <f7-block inner  style="text-indent: 2em;">
              <p>方向：ASIC/FPGA设计、测试 | 微电子行业研究</p>
              <p>领域： 微电子 半导体 半导体装备 多媒体技术</p>
            </f7-block>
            <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i>个人信息</f7-block-title>
            <f7-block inner  style="text-indent: 2em;">
              张良培，男，1962年生。博士，武汉大学教育部“长江学者”特聘教授、博士生导师。长期从事测绘、遥感图像处理、人工智能、模式识别等方向的科学研究工作。已在国内外学术刊物上发表科研论文近300篇，主持和参加完成了三十多项国家自然科学基金重点、国防、863和973等方面的科研项目。获国家测绘科技进步一等奖、教育部自然科学一等奖、武汉大学优秀教师、全国百篇优秀博士论文指导教师等奖励。
            </f7-block>

          </f7-pages>
        </f7-popup>
      </f7-page>
</template>


<script>
export default {
    data() {
        return {
            infoList: [
//                {
//                    id: 1,
//                    media: '/static/img/avatar-user1.png',
//                    name: '张良培',
//                    unit: '上海交通大学',
//                    subunit: '材料科学学院',
//                    area: 'ASIC/FPGA设计, 测试 | 微电子行业研究',
//                    industry: '微电子、半导体、多媒体技术',
//                    title: "教授",
//                    subtitle: "<br>",
//                    text: "备需方提供工艺条件，工况，用专业仿真软件建立径向整体叶轮模型，划分网格仿真，优化模型输出为UG格式",
//                },
            ],
          boolean:false,
          buttonText: "立即联系" || " 约见安排中..." || "已安排约见" || "已完成",
        }
    },
  methods:{
    cropGetAixos(){
      this.$http.get("v1/recommend/list",{params:{}}).then( (res)=>{
        this.infoList = res.data.data
      }) .catch((error) => console.log(error))
    },
//    点击立即联系的时候
    immediately(){

    }
  },
  mounted() {
      this.cropGetAixos()
  }
}
</script>
































