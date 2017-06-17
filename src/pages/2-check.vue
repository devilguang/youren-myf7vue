<style>

</style>
<template>
    <f7-page>
        <v-cloak>
         <f7-navbar back-link="Back" title="专家认证" sliding></f7-navbar>
        </v-cloak>

        <p style="padding:10px">
            欢迎您，章华教授：<br>
            为了更好的为您服务，请您核实您的基本信息并按照指引填写相关需求，谢谢您的信任！
        </p>

        <f7-list form>
            <f7-list-item>
                <f7-label floating>姓名</f7-label>
                <f7-input name="name" type="text" placeholder="章华" v-model="formValues.name"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>单位</f7-label>
                <f7-input name="unit" type="text" placeholder="上海交通大学" v-model="formValues.unit"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>学位</f7-label>
                <f7-input name="degree" type="text" placeholder="博士" v-model="formValues.degree"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>职称</f7-label>
                <f7-input name="title" type="text" placeholder="教授" v-model="formValues.title"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label floating>研究方向</f7-label>
                <f7-input name="area" type="text" placeholder="材料科学" v-model="formValues.area"></f7-input>
            </f7-list-item>
        </f7-list>

        <f7-block style="margin-bottom: 200px">
            <f7-button round fill @click="nextStep">没问题，下一步</f7-button>
        </f7-block>



    </f7-page>
</template>
<script>
export default {
    data() {
        return {
            formValues: {
                name: '',
                unit: '',
                degree: '',
                title: '',
                area:  '',
            }
        }
    },
    methods: {
        nextStep(){
            this.$router.load({url: '/areas/'})

        },
      checkAixos(){
            this.$http.get('v1/user/login',{params:{}}).then((res)=>{

            })
      }
    },
  mounted(){
        this.$http({
          "method":"psot",
          "url":"v1/user/loginCode",
          "data":{
              "id":this.$route.params.id
          }
        }).then((res)=>{

        })
        console.log(this.$route.params.id)
  }

}
</script>
