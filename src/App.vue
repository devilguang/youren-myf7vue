<template>
  <div id="app">
    <f7-views navbar-through>
      <f7-view main url="/home/" :dynamic-havbar="true"></f7-view>
    </f7-views>
  </div>
</template>

<script>
import Routes from '@/router'

export default {
  name: 'app',
  framework7: {
    root: '#app', //Should be same as app el
    animateNavBackIcon: true,
    routes: Routes,
    material: !Framework7.prototype.device.ios
  },
  // Custom App Data
  data: function () {
    return {
      user: {
        name: 'Vladimir',
        lastName: 'Kharlampidi',
        age: 30
      },
      popupOpened: false,
      loginScreenOpened: false,
      pickerOpened: false,
      actionsOpened: false
    };
  },
  // Custom App Methods
  methods: {
    onF7Init: function () {
      console.log('f7-init1111');
    }
  }
}

</script>

<style>

</style>
