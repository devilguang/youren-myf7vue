<template>
  <div id="app">
    <f7-views navbar-through>
      <f7-view main :dynamic-havbar="true">
        <f7-pages>
          <f7-page toolbar-fixed>
            <f7-navbar>
              <f7-nav-left>
                <f7-link icon="icon-bars" open-panel="left"></f7-link>
              </f7-nav-left>
              <f7-nav-center sliding>有人</f7-nav-center>
              <f7-nav-right>
                <f7-link icon="icon-bars" open-panel="right"></f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-toolbar>
              <f7-link>Left</f7-link>
              <f7-link>Right</f7-link>
            </f7-toolbar>
  
            <f7-list>
              <f7-list-item title="登陆首页" link="/login/"></f7-list-item>

              <f7-list-item title="Accordion" link="/accordion/"></f7-list-item>
              <f7-list-item title="Calendar" link="/calendar/"></f7-list-item>
              <f7-list-item title="Cards" link="/cards/"></f7-list-item>
              <f7-list-item title="Chips" link="/chips/"></f7-list-item>
              <f7-list-item title="Contacts" link="/contacts/"></f7-list-item>
              <f7-list-item title="Content Block" link="/content-block/"></f7-list-item>
              <f7-list-item title="Data Table" link="/data-table/"></f7-list-item>
              <f7-list-item title="FAB" link="/fab/"></f7-list-item>
              <f7-list-item title="FAB Speed Dial" link="/fab-dial/"></f7-list-item>
              <f7-list-item title="Forms" link="/forms/"></f7-list-item>
              <f7-list-item title="Grid" link="/grid/"></f7-list-item>
              <f7-list-item title="Infinite Scroll" link="/infinite/"></f7-list-item>
              <f7-list-item title="Lists" link="/lists/"></f7-list-item>
              <f7-list-item title="Login Screen" link="/login-screen/"></f7-list-item>
              <f7-list-item title="Messages" link="/messages/"></f7-list-item>
              <f7-list-item title="Modals" link="/modals/"></f7-list-item>
              <f7-list-item title="Navbars & Toolbars" link="/bars/"></f7-list-item>
              <f7-list-item title="Photo Browser" link="/photo-browser/"></f7-list-item>
              <f7-list-item title="Preloader" link="/preloader/"></f7-list-item>
              <f7-list-item title="Progress Bar" link="/progressbar/"></f7-list-item>
              <f7-list-item title="Pull To Refresh" link="/pull-to-refresh/"></f7-list-item>
              <f7-list-item title="Searchbar" link="/searchbar/"></f7-list-item>
              <f7-list-item title="Smart Select" link="/smart-select/"></f7-list-item>
              <f7-list-item title="Sortable" link="/sortable/"></f7-list-item>
              <f7-list-item title="Swipeout" link="/swipeout/"></f7-list-item>
              <f7-list-item title="Swiper" link="/swiper/"></f7-list-item>
              <f7-list-item title="Tabs" link="/tabs/"></f7-list-item>
              <f7-list-item title="Tabs Swipeable" link="/tabs-swipeable/"></f7-list-item>
              <f7-list-item title="Timeline Vertical" link="/timeline-vertical/"></f7-list-item>
              <f7-list-item title="Timeline Horizontal" link="/timeline-horizontal/"></f7-list-item>
              <f7-list-item title="Timeline Calendar" link="/timeline-calendar/"></f7-list-item>
              <f7-list-item title="Virtual List" link="/virtual-list/"></f7-list-item>
              <f7-list-item title="Virtual List with Vue" link="/virtual-list-vue/"></f7-list-item>
            </f7-list>
            <f7-list>
              <f7-list-item title="Dynamic Route" link="/user/45/posts/28/?sort=first#opened"></f7-list-item>
              <f7-list-item title="Nested Routes" link="/nested-routes/"></f7-list-item>
              <f7-list-item title="Data Binding" link="/data-binding/"></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
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
