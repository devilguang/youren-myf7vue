<style>
  .footer_btn {
    width: 80px;
    height: 40px;
    color: #ffffff;
  }

  .Meeting .card {
    padding: 30px;
  }

  .list-block {
    margin: 50px 0;
  }

  .btn {
    display: none;
  }

  .keyWord {
    width: 90%;
    height: 30px;
    border: 0;
    font-size: 16px;
  }

  .userName {
    color: #2196f3;
    font-size: 16px;
    width: 100px;
    border: 0;
    display: inline-block;
    ;
  }

  .userCollege {
    width: 50%;
    border: 0;
    font-size: 15px;
  }
  .userDegree {
    border: 0;
    width:15%;
    overflow: hidden;
    font-size: 15px;
  }

  .researchDirect {
    border: 0;
    width: 80%;
    font-size: 15px;
  }

  .disabled, [disabled] {
    background: #ffffff;
    opacity: 1;
    color: #343434;

  }
  .userIntro {
    width: 90%;
    height: 400px;
    text-indent: 2em;
    font-size: 15px;
    line-height: 24px;
    color: #333333;
    /*overflow: hidden;*/
    font-weight: 200;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    resize: none;
    border: 0;
    color: #343434;
  }
  .changeActive {
    border: 1px solid #cccccc;
    resize: vertical;
    color: #cccccc;

  }
</style>
<template>
  <!--with-subnavbar no-page-content   把这个去掉之后就可以滚动了但是还所有问题-->
  <f7-page class="Meeting">
    <div v-cloak="true">
      <f7-navbar title="个人中心" back-link="Back" sliding></f7-navbar>
    </div>
    <div class="card-wrapper">
      <f7-card class="flex-left flex-middle">
        <img class="info-avatar" :src="info.headImg"
             style="height: 100px; width: 100px; margin-right: 15px;"/>
        <span
          style="position: absolute;bottom: -10px;color:#2196f3;border-radius: 5px;height: 30px;left:50px;font-weight: bold;"
          v-if="!changeFlag">更改头像</span>
        <div class="info-inner">
          <input type="text" class="userName" v-model="info.name" :disabled="changeFlag"
                 :class="{'changeActive':!changeFlag}">
          <div style="margin-top: 10px">
            <input type="text" class="userCollege" v-model="info.college" :disabled="changeFlag"
                   :class="{'changeActive':!changeFlag}">
            <input type="text" class="userDegree" v-model="info.professionalTitle" :disabled="changeFlag"
                   :class="{'changeActive':!changeFlag}">
            <p>
              <input type="text" class="researchDirect" v-model="info.researchDirect" :disabled="changeFlag"
                     :class="{'changeActive':!changeFlag}">
            </p>
          </div>
        </div>
        <f7-block class="afterLine" style="position: absolute;right:0;top:10px" v-if="changeFlag">
          <f7-button round fill style="border-radius: 8px" @click="changeFlag = false">编辑主页</f7-button>
        </f7-block>
        <f7-block class="afterLine" style="position: absolute;right:0;top:10px" v-if="!changeFlag">

          <f7-button round fill style="border-radius: 8px" @click="achieveHome">完成编辑</f7-button>
        </f7-block>
      </f7-card>
    </div>
    <f7-block-title><i class="fa fa-dot-circle-o fa-lg color-blue"></i> 所属领域</f7-block-title>
    <div class="content-block">
      <div class="content-block-inner" style="text-indent: 2em;">
        <input type="text" class="keyWord" v-model="info.keyWord" :disabled="changeFlag"
               :class="{'changeActive':!changeFlag}">
      </div>
    </div>
    <f7-block-title><i class="fa fa-file-text fa-lg color-blue"></i> 个人简介</f7-block-title>
    <f7-block inner style="text-indent: 2em;">
      <div :class="{'wrap-text':dataflag}" style="color:#999">
        <textarea class="userIntro" :disabled="changeFlag"
                  :class="{'changeActive':!changeFlag}">{{info.intro}}</textarea>
      </div>
      <div class="color-blue" v-show="dataflag" :class="{'btn':bool}" style="margin-top: 10px;
      width: 100%;text-align: center" @click="seeMore()">
        <span>查看更多</span><i class="fa fa-angle-double-down color-blue" style="margin-left: -20px"></i>
      </div>
      <div class="color-blue" v-show="blag" style="margin-top: 10px;width: 100%;text-align: center"
           @click="seeMoreAgain()">
        <span>收起</span> <i class="fa fa-angle-double-up  color-blue" style="margin-left: -20px"></i>
      </div>
    </f7-block>
    <f7-block-title style="display: flex">
      <span style="flex: 1"><i class="fa fa-user fa-lg color-blue"></i>联系人信息</span>
      <span v-if="alter" @click="alter = false">编辑</span>
      <span v-else="!alter" @click="finishLikemans">完成</span>
    </f7-block-title>
    <f7-list form v-for="item in linkmans" :key="item.id" style="margin-top: 30px">
      <f7-list-item>
        <f7-label floating>姓名</f7-label>
        <f7-input name="name" type="text" :class="{'changeActive':!alter}"  v-model.lazy="item.name"
                  :disabled="alter"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>邮箱</f7-label>
        <f7-input name="email" type="text" :class="{'changeActive':!alter}" v-model="item.email"
                  :disabled="alter"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>手机号</f7-label>
        <f7-input name="phone" type="text" :class="{'changeActive':!alter}" v-model="item.telephone"
                  :disabled="alter"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label floating>所在地</f7-label>
        <f7-input name="address" type="text" :class="{'changeActive':!alter}" v-model="info.address"
                  :disabled="alter"></f7-input>
      </f7-list-item>
    </f7-list>
    <div style="position: fixed;bottom:0;background:#ffffff;width:100%;z-index:10000;height:60px;display: flex">
      <f7-button style="height:60px;line-height: 40px;
        color:#000;flex: 1"
                 href="/mymeeting-user">
        <p style="margin-top: 8px"><i class="fa fa-comments-o fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -30px">会议约见</p>
      </f7-button>
      <f7-button style="height: 60px;color:#000;flex:1;"
                 href="/recommend-user">
        <p style="margin-top: 8px"><i class="fa fa-thumbs-o-up fa-2x" style="color:#999;"></i></p>
        <p style="margin-top: -25px">推荐</p>

      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1"
                 href="/myhome-user">
        <p style="margin-top: 8px"><i class="fa fa-user-o fa-2x color-blue"></i></p>
        <p style="margin-top: -25px;" class="color-blue">主页 </p>
      </f7-button>
      <f7-button style="height:60px;color:#000;flex:1"
                 href="/myaccount-user">
        <p style="margin-top: 8px"><i class="fa fa-credit-card fa-2x" style="color:#999;"></i></p>
        <p style="margin-top:-25px">账户</p>
      </f7-button>
    </div>
  </f7-page>
</template>
<script>
  export default {
    data(){
      return {
        changeFlag: true,
        info: {
          userId: '',
          id: '',
          name: '',
          college: '',
          professionalTitle: '',
          researchDirect: '',
          keyWord: '',
          intro: '',
          headImg: ''
        },
        linkmans:'',
        ordId: '',
        keyWords: [],
        array: [],
        userId: '',
        dataflag: true,
        blag: false,
        bool: false,
        alter: true,
      }
    },
    watch:{},
    methods: {
      finishLikemans(){
        this.alter = true
        this.$http({
          method:'post',
          url:'/v1/user/contacts/edit',
          data:this.linkmans
        })
      },
      achieveHome(){
        this.changeFlag = true
        this.$http({
          method: 'post',
          url: '/v1/expert/change',
          data: {
            id: this.info.id,
            name: this.info.name,
            professionalTitle: this.info.professionalTitle,
            researchDirect: this.info.researchDirect,
            keyWord: this.info.keyWord,
            intro:this.info.intro,
            headImg:this.info.headImg,
            college:this.info.college,
            userId: this.info.userId
          }
        })
      },
//      获取专家的信息的方法
      getUserInfor(){
        this.$http({
          method: 'get',
          url: 'v1/expert/' + this.ordId,
          data: {}
        }).then((res) => {
          this.info.id = res.data.id
          this.info.name = res.data.name
          this.info.professionalTitle = res.data.professionalTitle
          this.info.researchDirect = res.data.researchDirect
          this.info.keyWord = res.data.keyWord
          this.info.intro = res.data.intro
          this.info.headImg = res.data.headImg
          this.info.college = res.data.college
          if (res.data.intro.length > 800) {
            this.bool = false
          } else {
            this.bool = true
          }
          this.keyWords = res.data.field.split(';')
          this.$http({
            method: 'get',
            url: '/v1/admin/fields',
            data: {}
          }).then((req) => {
            req.data.forEach((item, index) => {
              this.keyWords.forEach((value, index) => {
                if (value === item.id) {
                  this.array.push(item.name)
                }
              })
            })
          })
        })
      },
      getContact(){
        this.$http({
          method: 'get',
          url: '/v1/user/contacts/' + this.userId,
          data: {}
        }).then((res) => {
          this.linkmans = res.data
        })
      },
      seeMore(){
        this.dataflag = false
        this.blag = true
      },
      seeMoreAgain(){
        this.dataflag = true
        this.blag = false
      }
    },
    mounted(){
      this.ordId = this.$store.oId
      this.userId = this.$store.userId
      this.info.userId = this.$store.userId
      this.getUserInfor()
      this.getContact()
    }
  }
</script>
