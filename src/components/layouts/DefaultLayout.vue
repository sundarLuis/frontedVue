<template>
  <v-app id="inspire" class="app dashboard">
    <app-drawer class="app--drawer" :show-drawer="showDrawer"></app-drawer>
    <app-toolbar class="app--toolbar" @side-icon-click="handleDrawerVisiable"></app-toolbar>
    <v-content>
      <!-- Page Header -->
      <!-- <page-header></page-header> -->
      <div class="page-wrapper">
        <router-view></router-view>
      </div>
      <!-- App Footer -->
      <br> <br>
        <v-footer height="auto" class="white pa-3 app--footer footerclass" color="primary" >
          <!-- <span class="caption mr-2">isocked.com Design &copy; {{ new Date().getFullYear() }}</span>
          <v-spacer></v-spacer>
          <span class="caption mr-1"> Make With Love </span>
          <v-icon color="pink" small>favorite</v-icon> -->
  
        </v-footer>
      
    </v-content>
    <!-- Go to top -->
    <app-fab></app-fab>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer"
import AppToolbar from "@/components/AppToolbar"
import AppFab from "@/components/AppFab"
import PageHeader from "@/components/PageHeader"

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader
  },

  data() {
    return {
      showDrawer: true
    }
  },
  methods: {
    handleDrawerVisiable() {
      this.showDrawer = !this.showDrawer
    }
  },
  created() {}
}
</script>

<style scoped>
.footerclass{
  position:fixed;
  left:0px;
   bottom:0px;
   height:0px;
   width:100%;

}
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}

</style>
