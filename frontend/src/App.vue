<script setup>
/* import { RouterLink, RouterView } from 'vue-router' */
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import Dashboard from "./views/Dashboard.vue";
import DashHeader from "./components/Dash-Header.vue";
import DashSidebar from "./components/DashSideBar/Dash-Sidebar.vue";
import { sbWidth } from "./components/DashSideBar/sidebar-state";
import { RouterView } from "vue-router";
import { computed } from 'vue';
import { userStore } from "./stores/Dash_Stores/users";

const storeUser = userStore();

storeUser.userOnlineData($cookies.get('auth'))

const getUserOnlineRol = computed(() => {
  return storeUser.getUserOnlineRol;
});


</script>

<template>
  <div v-if="getUserOnlineRol === 'director' || getUserOnlineRol === 'profesor'" class="admin-content" :style=" { 'margin-left:': sbWidth }">
    <DashHeader/>
    <DashSidebar/>
    <RouterView />
    <Footer/>
<!--     <Dashboard/> -->
  </div>
  

  <div v-else class="usr-content">
    <Header />
  <!--     <div class="content">

      </div> -->
      <RouterView />
    <Footer/>
  </div>
</template>

<style lang="scss" scoped>

 .content{
/*   min-height: 100vh; */
  min-height: 100%;
  margin-left: 45px;
 }

 body{
  position: relative;
  height: 100vh;
}

</style>
