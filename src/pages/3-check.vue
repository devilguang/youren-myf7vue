<style>

</style>
<template>
    <f7-page>
        <div v-cloak>
         <f7-navbar back-link="Back" title="企业认证" sliding></f7-navbar>
        </div>
        <p style="padding:10px">
            欢迎您<br>
          为了更好的为您服务，请您核实您的基本信息并按照 指引填写相关需求，谢谢您的信任！
        </p>
        <f7-list form>
            <f7-list-item>
                <f7-label floating>姓名</f7-label>
                <f7-input name="name" type="text" placeholder="" v-model="formValues.contactName"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>企业名</f7-label>
                <f7-input name="unit" type="text" placeholder="" v-model="formValues.name"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>地点</f7-label>
                <f7-input name="degree" type="text" placeholder="" v-model="formValues.ext1"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>主营业务</f7-label>
                <f7-input name="title" type="text" placeholder="" v-model="formValues.companyAbout"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>统一社会信用代码</f7-label>
                <f7-input name="area" type="text" placeholder="" v-model="formValues.addrNo"></f7-input>
            </f7-list-item>
        </f7-list>
        <f7-block style="margin-bottom: 200px">
          <!--href="/areas/"-->
            <f7-button round fill @click="nextStep" >没问题，下一步</f7-button>
        </f7-block>
    </f7-page>
</template>
<script>
export default {
    data() {
        return {
            formValues: []
        }
    },
    methods: {
        nextStep(){
          this.$router.load({url: '/areas/'})
          console.log(window.location.href)

        },
    },
  mounted(){
      this.formValues = JSON.parse(window.localStorage.getItem("priseInformation "));

  },
  created(){
    let nowAdress = window.location.href
    console.log(window.location.href)
  }
}
</script>
