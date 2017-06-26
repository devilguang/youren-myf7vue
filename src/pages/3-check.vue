<style>

</style>
<template>
  <f7-page>
    <div v-cloak>
      <f7-navbar back-link="Back" title="企业认证" sliding></f7-navbar>
    </div>
    <p style="padding:10px">
      欢迎您{{experts.name + ':'}}<br>
      为了更好的为您服务，请您核实您的基本信息并按照 指引填写相关需求，谢谢您的信任！
    </p>
    <f7-list form>
      <f7-list-item>
        <f7-label floating>姓名</f7-label>
        <f7-input name="name" type="text" placeholder="" v-model="experts.contactName"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>企业名</f7-label>
        <f7-input name="unit" type="text" placeholder="" v-model="experts.name"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>地点</f7-label>
        <f7-input name="degree" type="text" placeholder="" v-model="experts.ext1"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>主营业务</f7-label>
        <f7-input name="title" type="text" placeholder="" v-model="experts.companyAbout"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>统一社会信用代码</f7-label>
        <f7-input name="area" type="text" placeholder="" v-model="experts.addrNo"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-block style="margin-bottom: 200px">
      <!--href="/areas/"-->
      <f7-button round fill @click="nextStep">没问题，下一步</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
        formValues: [],
        type: 2,
        experts:{
          id:'',
          contactName:'',
          name:'',
          ext1:'',
          companyAbout:'',
          addrNo:'',
        },
        user_id:''
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
      this.experts.contactName = this.formValues.contactName
      this.experts.ext1 = this.formValues.ext1
      this.experts.companyAbout = this.formValues.companyAbout
      this.experts.addrNo = this.formValues.addrNo
      this.experts.id = this.formValues.id
    },
    created(){
    }

  }
</script>
