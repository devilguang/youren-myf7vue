<style>

</style>
<template>
  <!--这是专家的认证信息-->
  <f7-page>
      <div v-cloak>
        <f7-navbar back-link="Back" title="专家认证" sliding></f7-navbar>
      </div>
      <p style="padding:10px">
        欢迎您,{{formValues.name}}教授：<br>
        为了更好的为您服务，请您核实您的基本信息并按照指引填写相关需求，谢谢您的信任！
      </p>
      <f7-list form>
        <f7-list-item>
          <f7-label floating >姓名</f7-label>
          <f7-input name="name" type="text" placeholder="" v-model="experts.name"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label floating>单位</f7-label>
          <f7-input name="unit" type="text" placeholder="" v-model="experts.unit"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label floating>学位</f7-label>
          <f7-input name="degree" type="text" placeholder="" v-model="experts.degree"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label floating>职称</f7-label>
          <f7-input name="title" type="text" placeholder="" v-model="experts.theTitle"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label floating>研究方向</f7-label>
          <f7-input name="area" type="text" placeholder="" v-model="experts.research"></f7-input>
        </f7-list-item>
      </f7-list>
      <f7-block style="margin-bottom: 200px">
        <f7-button round fill @click="nextStep">没问题，下一步</f7-button>
      </f7-block>
    <!--这是企业的认证信息-->
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        formValues: [],
        experts:{
          id:'',
          name:'',
          unit:'',
          degree:'',
          theTitle:'',
          research:''
        }
      }
    },
    methods: {
      nextStep(){
        this.$router.load({url: '/areas/'})
        localStorage.setItem("experts", JSON.stringify(this.experts)) //存储的是认证的信息
      }
    },
    mounted(){
      this.formValues = JSON.parse(window.localStorage.getItem("expertOpinion")).object;
      this.experts.name = this.formValues.name
      this.experts.unit = this.formValues.college
      this.experts.degree = this.formValues.degree
      this.experts.theTitle = this.formValues.professionalTitle
      this.experts.research = this.formValues.researchDirect
      this.experts.id = this.formValues.id
    }
 }
</script>
