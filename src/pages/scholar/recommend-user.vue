<style lang="scss">

  .Recommend {

  }
  .list-block{
    margin-top: 30px;
  }
</style>
<template>
  <f7-page class="Recommend">
    <div v-cloak="true">
      <f7-navbar title="推荐需求" back-link="Back" sliding></f7-navbar>
    </div>
    <f7-list media-list style="margin-top: 30px">
      <!--:media=" '<img src=/static/img/corp1.jpg + width='+80+'/>'"-->
      <f7-list-item v-for="info in infoList" :key="info.id"
                    :title="info.title" :subtitle="'<br>'"
                    :text="info.demandInfo" ref="chemical"  @click="nextStep(info.id)">
        <!--:link="'/demand'"-->
      </f7-list-item>
    </f7-list>
    <div style="position: fixed;bottom:0;background:#ffffff;width: 100%;height:60px;z-index:100;display: flex" >
      <f7-button  style="height:60px;color:#000;flex:1"
                  href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -30px">会议约见</p>
      </f7-button>
      <f7-button  style="height: 60px;color:#000;flex:1"
                  href="/recommend-user">
        <p  style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x color-blue" ></i></p>
        <p  style="margin-top: -25px" class="color-blue">推荐</p>

      </f7-button>
      <f7-button  style="height:60px;color:#000;flex:1"
                  href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x color-blue"style="color:#999;"></i></p>
        <p  style="margin-top: -25px;">主页 </p>
      </f7-button>
      <f7-button  style="height:60px;color:#000;flex: 1"
                  href="/myaccount-user">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x" style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
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
      },
      nextStep(id){
        this.$store.lId = id
        this.$router.load({url:'/demand'})
      }
    },
    created(){

    },
    mounted(){
      this._expertId = this.$store.oId
      this.userPostAixos()
    }
  }
</script>
































