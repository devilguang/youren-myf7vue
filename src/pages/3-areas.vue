<style lang="scss">
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
  <f7-page>
    <f7-navbar back-link="Back" title="关注领域" sliding></f7-navbar>
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
    <f7-block style="margin-bottom: 50px">
      <!--href="/contact/"-->
      <f7-button round fill @click="nextStep">已选好，下一步</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {
    data() {
      return {
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
        checked: false,
        selection: [],
        type: ''
      }
    },
    methods: {
      onChange($event, area, i) {
        this.$set(area, 'checked', $event.target.checked)

      },
      nextStep(){
        let selectField = this.areaMap.filter(area => area.checked).map(area => area.id)
          //获取到已经选中的领域
          if (selectField.length == 0) {
            this.$f7.alert("请至少选择一个关注领域", "认证失败")
            return false
          } else {
            this.$http.get('v1/admin/fields', {params: {selectField}}).then((res) => {
              this.$router.load({url: '/contact/'});
              localStorage.setItem("domain", JSON.stringify(selectField))   //存储行业领域的信息
            })
          }
      },
    },
    mounted(){

    }
  }
</script>
