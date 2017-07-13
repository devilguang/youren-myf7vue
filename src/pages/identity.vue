<template>
  <f7-page name="identity">
    <f7-navbar back-link="Back" title="身份选择" sliding></f7-navbar>
    <div class="domain-wrap">
      <div class="domain " :class="{'domainBorder':select}"><img :src="professorImg" @click="professorBth">
        <p>企业</p></div>
      <div class="domain" :class="{'domainBorder':selected}"><img :src="daminImg" @click="domainBtn">
        <p>专家</p></div>
    </div>
    <f7-block class="afterLine" style="margin-top:0px;">

      <f7-button round fill style="border-radius: 5px" @click="nextStep">下一步</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  export default{
    name: 'identity',
    data(){
      return {
        professorImg: './static/imgs/professor.png',
        daminImg: './static/imgs/damin.png',
        select: false,
        selected: false
      }
    },
    methods: {
      nextStep(){
        if (this.select == false && this.selected == false) {
          this.$f7.alert('至少选择一个身份', '注册失败')
          return false
        } else if (this.select == true) {
          localStorage.setItem('type', JSON.stringify(2))
        } else {
          localStorage.setItem('type', JSON.stringify(1))
        }
        this.$router.load({url: '/registered '})
      },
      professorBth(){
        this.professorImg = './static/imgs/professor1.png'
        this.daminImg = './static/imgs/damin.png'
        this.select = true
        this.selected = false
      },
      domainBtn(){
        this.daminImg = './static/imgs/damin1.png'
        this.professorImg = './static/imgs/professor.png'
        this.select = false
        this.selected = true
      }
    }
  }

</script>
<style scoped>
  .domain-wrap {
    display: flex;
    width: 90%;
    margin: 150px auto;
  }

  .domain {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #f4f8fb;
    text-align: center;
    flex: 0 0 100px;
    box-sizing: border-box;

  }

  .domain:nth-child(1) {
    margin-left: 40px;
  }

  .domain:nth-child(2) {
    margin-left: 100px;
  }

  .domain img {
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-size: 50px 50px;
    margin-top: 50%;
    transform: translateY(-25px);
  }

  .domainBorder {
    border: 5px solid #7bb0ff

  }
</style>
