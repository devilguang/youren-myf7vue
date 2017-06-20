<style lang="scss">
    .Recommend {

    }

</style>

<template>

    <f7-page class="Recommend">
          <f7-navbar title="推荐需求-专家版" back-link="Back" sliding></f7-navbar>
        <f7-list media-list>
            <f7-list-item v-for="info in infoList" :key="info.id" :media=" '<img src=/static/img/corp1.jpg + width='+80+'/>'"
                          :title="info.title" :subtitle="'<br>'"
                          :text="info.demandInfo"  ref="chemical" :link="'/demand/'+info.id">
            </f7-list-item>
        </f7-list>

    </f7-page>
</template>


<script>
  export default {
    components:{
    },
    data() {
        return {
            infoList: [ ]
        }
    },
  methods:{
      userPostAixos(){
        this.$http({
          method:'post',
          url:'v1/expert/suggests',
          data:{
              "pageIndex":"1",
              "pageSize":"10",
              "orderProperty":"chatNum",
              "orderType":"asc",
              "expertId":"011bbe1e-f56c-41ef-8adb-1fe60287cc50"
          }
        }).then((res)=>{
            this.infoList = res.data.data.data
        })
    }
  },
  mounted(){
      this.userPostAixos()
  }
}
</script>
































