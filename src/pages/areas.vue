
<style lang="scss">

    .areas {
        // min-height: 100vh;

        // padding-bottom: 40px;

        label.areaItem {
            border: 1px solid #ddd;
            font-size: 12px;
            margin:7px;
            padding: 10px 15px;
            position: relative;

            &.checked
            { 
                border-color: #26a2ff;
            }

            > input {
                display: none;
            }
        }

        .badge {
            position: absolute;  
            background:white; 
            top: -5px; 
            right: -5px; 
            border-radius: 50%;
            padding:0 2px;
            // width: 10.27px;
            // height: 12px;
            // vertical-align: middle;
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
                <label class="areaItem" v-for="(checked, area) in areaMap" :key="area" :class="{checked: checked}">
                    <input type="checkbox" name="area" @change="onChange($event, area)">{{area}}
                    
                    <span  v-if="checked" class="badge">
                        <i class="fa fa-check-circle fa-lg color-primary"></i>
                    </span>
                </label>
            </div>
        </f7-block>

        <f7-block style="margin-bottom: 200px">
            <f7-button round fill @click="nextStep">已选好，下一步</f7-button>
        </f7-block>

    
    
    </f7-page>
</template>
<script>
export default {

    data() {
        return {
            areaMap: {
                "农林牧渔": false,
                "采矿": false,
                "制造": false,
                "建筑": false,
                "信息传输、软件和信息技术服务": false,
                "租赁和商务服务": false,
                "电力、热力、燃气及水生产供应": false,
                "科学研究技术服务": false,
                "教育": false,
                "房地产": false,
                "国际组织": false,
                "批发和零售": false,
                "电子信息": false,
                "卫生和社会文化、体育和娱乐": false,
                "交通运输、仓储和邮政": false,
                "水利、环境和公共设施管理": false,
                "住宿和餐饮": false,
                "居民服务、修理和其它服务": false,
                "金融": false,
                "公共管理、社保保障和社会组织": false,
            }
        }
    },

    methods: {
        onChange($event, area) {
            let {checked} = $event.target;
            this.areaMap[area] = checked;
        },
        
        nextStep(){
            this.$router.load({url: '/contact/'})
        }
    }

}
</script>
