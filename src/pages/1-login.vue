<style scoped lang="scss">
  ul {
    list-style: none;
  }

  .colorRed {
    color: red;
  }

  ul {
    margin: 0;
    padding: 0;
    width: 3.3rem;
    margin: 0 auto;
  }

  ul li {
    display: flex;
    justify-content: space-around;
  }

  ul li p {
    flex: 0 0 100px;
    vertical-align: middle;
  }

  ul li div {
    flex: 1;
  }

  .inputStyle, .userDamin {
    border: 1px solid gainsboro;
    border-radius: 5px;
    width: 100%;
    vertical-align: middle;
    text-indent: 0.1rem;
  }

  .inputStyle {
    height: 30px;
  }

  textarea {
    margin-bottom: 15px;
  }

  .userDamin {
    height: 100px;
    resize: none;
  }

  .identity {
    display: inline-block;
    padding: 5px 20px;
    background: gainsboro;
    border-radius: 5px;
    margin-right: 10px;
  }

  .checkIdentity {
    display: inline-block;
    vertical-align: middle;
  }

  .active {
    background: #2196f3;
    color: #ffffff;
  }
  .bJactive{
    background:#cccccc;
    border:1px solid #000;
  }

  .areas {
    label.areaItem {
      border: 1px solid #ddd;
      font-size: 12px;
      margin: 7px;
      padding: 10px 15px;
      position: relative;

      &.checked {
        border-color: #26a2ff;
      }
      > input {
        display: none;
      }
    }
    .badge {
      position: absolute;
      background: white;
      top: -5px;
      right: -5px;
      border-radius: 50%;
      padding: 0 2px;
    }
  }
</style>
<template>
  <f7-page name="1-login">
    <f7-navbar back-link="Back" title="注册"></f7-navbar>
    <form style="margin-top: 60px">
      <ul>
        <li>
          <p><span class="colorRed">*&nbsp;</span>用户名：</p>
          <div>
            <input class="inputStyle" type="text" placeholder="手机号/邮箱" v-model="loginName" @blur="prompting()">
          </div>
        </li>
        <li>
          <p><span class="colorRed">*&nbsp;</span>密码：</p>
          <div>
            <input class="inputStyle" type="password" placeholder="请输入密码" v-model="password">
          </div>
        </li>
        <li>
          <p><span class="colorRed">*&nbsp;</span>角色：</p>
          <div>
            <span class="identity" :class="{active:activeName1}" @click="navTab(1)">专家</span>
            <span class="identity" :class="{active:activeName2}" @click="navTab(2)">企业</span>
          </div>
        </li>
        <ul class="experts" v-if="activeName1">
          <li>
            <p><span>&nbsp;</span>真实姓名：</p>
            <div>
              <input class="inputStyle" type="text" v-model="expertsList.userName">
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>单位：</p>
            <div>
              <input class="inputStyle" type="text" v-model="expertsList.unit">
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>邮箱：</p>
            <div>
              <input class="inputStyle" type="email" v-model="expertsList.email">
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>手机号码：</p>
            <div>
              <input class="inputStyle" type="number" min="1" max="11" placeholder="请输入手机号码"
                     v-model="expertsList.phone">
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>个人简介：</p>
            <div>
                  <textarea class="userDamin" cols="30" rows="10" v-model="expertsList.profile">

                  </textarea>
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>擅长领域：</p>
            <div>
              <input class="inputStyle" type="text" min="1" max="11" placeholder=""
                     v-model="expertsList.area">
            </div>
          </li>
          <li>
            <p><span>&nbsp;</span>合作项目：</p>
            <div>
                  <textarea class="userDamin" cols="30" rows="10" v-model="expertsList.projects">

                  </textarea>
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>关注领域：</p>
            <div>
              <span class="identity" @click="boolean = true" v-if="selectionCh.length<=0">请选择</span>
              <span v-else class="checkIdentity" @click="againSelectArea()">{{selectionCh.join(";")}}</span>
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>服务方式：</p>
            <div>
              <label class="label-checkbox item-content" style="padding:10px 0;display: flex"
                     v-for="(item,index) in serviceList ">
                <input type="checkbox" name="my-radio" @change="selectSeverType($event, item, index)">
                <div class="item-media" style="flex:0 0 0.6rem">
                  <i class="icon icon-form-checkbox"></i>
                </div>
                <div class="item-inner">
                  <div class="item-title" style="">{{item.serviceType}}</div>
                </div>
              </label>
            </div>
          </li>
          <li style="border-top: 1px solid gainsboro">
            <p><span class="colorRed">*&nbsp;</span>提供咨询方式及价格：</p>
            <div>
              <div style="display: flex;justify-content:space-between">
                <label class="label-checkbox item-content" style="padding:10px 0;display: flex">
                  <input type="checkbox" name="phoneMet" @change="selectPhone($event,info)">
                  <div class="item-media">
                    <i class="icon icon-form-checkbox"></i>
                  </div>
                  <div class="item-inner" style="width: 1rem;">
                    <div class="item-title">{{info.value}}</div>
                  </div>
                </label>
                <div>
                  <input type="number" style="width:0.5rem;margin-top: 10px;margin-right: 10px"
                         v-model="info.phonePrice" :disabled="!info.checked" :class="{'bJactive':!info.checked}"><span>{{info.time}}</span>
                </div>
              </div>

              <div style="display: flex;justify-content:space-between">
                <label class="label-checkbox item-content" style="padding:10px 0;display: flex">
                  <input type="checkbox" name="offlineMet" @change="selectOffline($event,infoList)">
                  <div class="item-media">
                    <i class="icon icon-form-checkbox"></i>
                  </div>
                  <div class="item-inner" style="width: 1rem;">
                    <div class="item-title">{{infoList.value}}</div>
                  </div>
                </label>
                <div>
                  <input type="number" style="width:0.5rem;margin-top: 10px;margin-right: 10px"
                         v-model="infoList.meetPrice" :disabled="!infoList.checked" :class="{'bJactive':!infoList.checked}"><span>{{infoList.time}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="enterprise" v-else>
          <li>
            <p><span>&nbsp;</span>真实姓名：</p>
            <div>
              <input class="inputStyle" type="text" v-model="enterpriseList.userName">
            </div>
          </li>
          <li>
            <p><span>&nbsp;</span>单位：</p>
            <div>
              <input class="inputStyle" type="text" v-model="enterpriseList.unit">
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>邮箱：</p>
            <div>
              <input class="inputStyle" type="email" placeholder="请输入邮箱" v-model="enterpriseList.email">
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>手机号码：</p>
            <div>
              <input class="inputStyle" type="number" placeholder="请输入手机号码" min="1" max="11"
                     v-model="enterpriseList.phone">
            </div>
          </li>
          <li>
            <p><span class="colorRed">*&nbsp;</span>需解决问题：</p>
            <div>
                  <textarea class="userDamin" cols="30" rows="10" v-model="enterpriseList.description">
                  </textarea>
            </div>
          </li>
          <li style="margin-top: 0.2rem">
            <p><span class="colorRed">*&nbsp;</span>关注领域：</p>
            <div>
              <span class="identity" @click="boolean = true" v-if="selectionCh1.length<=0">请选择</span>
              <span v-else class="checkIdentity" @click="againSelectArea()">{{selectionCh1.join(";")}}</span>
            </div>
          </li>
        </ul>
      </ul>
    </form>
    <f7-button round fill style="border-radius: 5px;margin-top: 30px" @click="nextStep()">注册</f7-button>
    <div style="width:100%;text-align: center;margin:30px 0"><span>已有账号? <a href="/home">点击登录</a></span></div>
    <f7-popup :opened="boolean">
      <f7-block style=" text-align:center">
        您主要关注的产业领域（可多选）
      </f7-block>
      <f7-block class="areas">
        <div class="flex-between flex-wrap ">
          <label class="areaItem" v-for="(area, i) in areaMap" :key="area.id" :class="{checked: area.checked}">
            <input type="checkbox" @change="onChange($event, area, i)">{{area.name}}
            <span v-if="area.checked" class="badge">
            <i class="fa fa-check-circle fa-lg color-blue"></i>
          </span>
          </label>
        </div>
      </f7-block>
      <f7-button round fill style="border-radius: 5px;margin-top: 30px" @click="selectAreas()">确定</f7-button>
    </f7-popup>
  </f7-page>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        loginName: '',
        password: '',
        expertsList: {
          userName: '', //真实姓名
          unit: '',     //单位
          email: '',
          phone: '',
          profile: '',//个人简介
          projects: '', //合作项目
          area: ''  //擅长领域
        },
        enterpriseList: {
          userName: '', //真实姓名
          unit: '',     //单位
          email: '',
          phone: '',
          description: '',//需求描述
        },
        boolean: false,
        message: '',
        activeName1: true,
        activeName2: false,
        openId: '',
        type: '1',
        areaMap: [
          {"name": "房地产", "id": "12"},
          {"name": "采矿 ", "id": "02"},
          {"name": "制造", "id": "03"},
          {"name": "建筑", "id": "06"},
          {"name": "信息传输、软件和信息技术服务", "id": "10"},
          {"name": "教育 ", "id": "17"},
          {"name": "农林牧渔 ", "id": "01"},
          {"name": "电力、热力、燃气及水生产供应 ", "id": "04"},
          {"name": "科学研究、技术服务", "id": "14"},
          {"name": "交通运输、仓储和邮政", "id": "08"},
          {"name": "水利、环境和公共设施管理", "id": "15"},
          {"name": "租赁和商务服务", "id": "13"},
          {"name": "卫生和社会文化、体育和娱乐", "id": "05"},
          {"name": "批发和零售", "id": "07"},
          {"name": "国际组织", "id": "20"},
          {"name": "住宿和餐饮", "id": "09"},
          {"name": "电子信息 ", "id": "18"},
          {"name": "居民服务、修理和其他服务", "id": "16"},
          {"name": "金融", "id": "11"},
          {"name": "公共管理和社会组织", "id": "19"},
        ],
        selection: [],
        selectionCh: [],
        selectionCh1: [],
        checked: false,
        serviceList: [
          {lable: 1, serviceType: '技术咨询'},
          {lable: 2, serviceType: '技术服务'},
          {lable: 3, serviceType: '技术开发'},
          {lable: 4, serviceType: '技术转让'}
        ],
        info: {lable: 1, value: '电话约谈', time: '元/分钟', phonePrice: ''},
        infoList: {lable: 2, value: '线下约见', time: '元/小时', meetPrice: ''},
        serviceType: [],
        appointmentType:''
      }
    },
    methods: {
      navTab(name){
        this.type = name;
        if (name == 1) { //专家
          this.activeName1 = true;
          this.activeName2 = false;
          this.loginName = '';
          this.password = '';
          this.selectionCh1 = [];
          this.selectionCh = [];
          this.info.phonePrice = '';
          this.infoList.meetPrice = '';
          for (var key in  this.enterpriseList) {
            this.enterpriseList[key] = ''
          }
        } else {
          this.activeName1 = false;
          this.activeName2 = true;
          this.loginName = '';
          this.password = '';
          this.selectionCh = [];
          this.selectionCh1 = [];
          this.info.phonePrice = '';
          this.infoList.meetPrice = '';
          for (var key in  this.expertsList) {
            this.expertsList[key] = ''
          }
        }
      },
      onChange($event, area, i) {
        this.$set(area, 'checked', $event.target.checked);
      },
      selectSeverType($event, item, index){
        this.serviceType = [];
        this.$set(item, 'checked', $event.target.checked);
      },
      selectPhone($event, info){
        this.$set(info, 'checked', $event.target.checked);
      },
      selectOffline($event, infoList){
        this.$set(infoList, 'checked', $event.target.checked);
      },
      selectAreas(){
        let selectField = this.areaMap.filter(area => area.checked).map(area => area.id);
        this.selection = selectField;
        if (selectField.length == 0) {
          this.$f7.alert("请至少选择一个关注领域", "认证失败");
          return false
        } else {
          this.$http.get('v1/admin/fields', {params: {selectField}}).then((res) => {
            res.data.forEach((value, index) => {
              this.selection.forEach((item, index) => {
                if (item == value.id) {
                  if (this.type == '1') {
                    this.selectionCh.push(value.name)
                  } else {
                    this.selectionCh1.push(value.name)
                  }
                }
              })
            })
          });
          this.boolean = false
        }
      },
      againSelectArea(){
        this.boolean = true;
        this.selectionCh = [];
        this.selectionCh1 = [];
      },
      prompting(){
        if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.loginName)) && !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.loginName))) {
          this.$f7.alert("用户名只能为手机号或者邮箱号！", "注册失败");
          return
        }
        if (this.type == '1') {
          if ((/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.loginName))) {
            this.expertsList.email = this.loginName
          }
          if ((/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.loginName))) {
            this.expertsList.phone = this.loginName
          }
        } else {
          if ((/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.loginName))) {
            this.enterpriseList.email = this.loginName
          }
          if ((/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.loginName))) {
            this.enterpriseList.phone = this.loginName
          }
        }

      },
      nextStep(){
        if (this.type == '1') {
          this.serviceList.forEach((item) => {
            if (item.checked) {
              this.serviceType.push(item.lable);
            }
          });

          if (this.loginName == '' || this.password == '' || this.expertsList.unit == '' ||
            this.expertsList.email == '' || this.expertsList.phone == '' ||
            this.expertsList.profile == '' || this.expertsList.area == '' || this.serviceType.length <= 0) {
            this.$f7.alert("带*号的为必填项！", "注册失败");
            return
          }else if (!this.infoList.checked && !this.info.checked) {
            this.$f7.alert("带*号的为必填项", "注册失败");
            return
          }else if(this.info.checked && this.info.phonePrice == ''){
            this.$f7.alert("请填写电话约谈价格！", "注册失败");
            return
          }else if(this.infoList.checked && this.infoList.meetPrice == ''){
            this.$f7.alert("请填写线下约见价格！", "注册失败");
            return
          }
          else if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.expertsList.email))) {
            this.$f7.alert("请填写正确格式的邮箱！", "注册失败");
            return false
          } else if (this.selectionCh.length <= 0) {
            this.$f7.alert("请选择您想关注的领域！", "注册失败");
            return false
          } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.expertsList.phone))) {
            this.$f7.alert("请填写正确的手机号码！", "注册失败");
            return false
          } else {
            if(this.info.checked&&!this.infoList.checked){
                this.appointmentType = '1';
            }
            if(!this.info.checked&&this.infoList.checked){
              this.appointmentType = '2';
            }
            if(this.info.checked&&this.infoList.checked){
              this.appointmentType = '0';
            }

            let data = {
              loginName: this.loginName,
              password: this.password,
              role: this.type,
              name: this.expertsList.userName,
              college: this.expertsList.unit,
              email: this.expertsList.email,
              phoneNum: this.expertsList.phone,
              intro: this.expertsList.profile,
              keyWord: this.expertsList.area,
              field: this.selection.join(';'),
              project: this.expertsList.projects,
              service: this.serviceType.join(";"),
              appointmentType:this.appointmentType,
              phonePrice: this.info.phonePrice,
              meetPrice: this.infoList.meetPrice
            };
            this.sendUserInformation(data, this.type);
          }
        } else {
          if (this.loginName == '' || this.password == '' || this.enterpriseList.unit == '' || this.enterpriseList.email == '' || this.enterpriseList.phone == '' || this.enterpriseList.description == '') {
            this.$f7.alert("带*号的为必填项！", "注册失败");
            return
          } else if (!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.enterpriseList.email))) {
            this.$f7.alert("请填写正确格式的邮箱！", "注册失败");
            return false
          }
          else if (this.selectionCh1.length <= 0) {
            this.$f7.alert("请选择您想关注的领域！", "注册失败");
            return false
          } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.enterpriseList.phone))) {
            this.$f7.alert("请填写正确的手机号码！", "注册失败");
            return false
          } else {
            let data = {
              loginName: this.loginName,
              password: this.password,
              role: this.type,
              contactName: this.enterpriseList.userName,
              name: this.enterpriseList.unit,
              contactEmail: this.enterpriseList.email,
              contactNumber: this.enterpriseList.phone,
              problem: this.enterpriseList.description,
              fields: this.selection.join(';')
            };
            this.sendUserInformation(data, this.type)
          }
        }
      },
      sendUserInformation(data, type){
        this.$http({
          method: 'post',
          url: '/v2/user/registe',
          data: data
        }).then((res) => {
          if (res.data.errno == 1) {
            this.$f7.alert(res.data.message + "！", "注册失败");
          } else {
            if (type == '1') {
              this.sendWxsmg(data.contactName)
            } else {
              this.sendWxsmg()
            }
            this.$f7.confirm("恭喜你注册成功，是否为您跳转到登录？", "注册成功", () => {
              this.$router.load({url: '/home'});
            })
          }
        })
      },
//      发送微信的模板消息
      sendWxsmg(userName){
        let meetime = this.$store.getNowFormatDate();
        this.$http({
          method: 'post',
          url: '/v1/wechat/sendMsg',
          data: {
            type: 3,
            touserId: this.touserId,  //消息接收人的id
            userName: userName,        //用户名
            time: meetime,             //
            url: 'http://m.youren.ai/#/recommend-user'     // 模板消息点击详情跳转的地址
          }
        });
      }
    },
    mounted(){
      this.selection = [];
      this.selectionCh = [];
      this.selectionCh1 = [];
      this.openId = localStorage.getItem('openId');
      this.touserId = this.$store.userId;
    }
  }
</script>
