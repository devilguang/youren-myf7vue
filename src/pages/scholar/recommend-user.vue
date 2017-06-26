<style lang="scss">

  .Recommend {

  }

</style>
<template>
  <f7-page class="Recommend">
    <div v-cloak="true">
      <f7-navbar title="推荐需求" back-link="Back" sliding></f7-navbar>
    </div>
    <f7-list media-list>
      <f7-list-item v-for="info in infoList" :key="info.id" :media=" '<img src=/static/img/corp1.jpg + width='+80+'/>'"
                    :title="info.title" :subtitle="'<br>'"
                    :text="info.demandInfo" ref="chemical" :link="'/demand/'+info.id">
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  export default {
    components: {

    },
    data() {
      return {
        infoList: [ ],
        _expertId:'',
        demandId:''
      }
    },
    methods: {
      userPostAixos(){
        this.$http({
          method: 'post',
          url: 'v1/expert/suggests',
          data: {
            "pageIndex": "1",
            "pageSize": "12",
            "orderProperty": "chatNum",
            "orderType":"asc",
            "expertId": this._expertId
          }
        }).then((res) => {
          this.infoList = res.data.data.data
        })
      }
    },
    created(){

    },
    mounted(){
      this._expertId = this.$route.params.id
      this.userPostAixos()
    }
  }
</script>
































