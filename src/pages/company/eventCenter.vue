<template>
  <div></div>
</template>

<script>
export default{
    props:[
        'commonList'
    ],
    data(){
       return{

       }
    },
    ready(){
        console.log(this.commonList)
    },
  methods:{
        eventSend(){
            let data = this.commonList
            this.$emit('ievevt',data)
        }
  },
  mounted(){
       this.eventSend()
  }

}
</script>
<style>

</style>
