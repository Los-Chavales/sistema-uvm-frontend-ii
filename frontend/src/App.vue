<script setup>
/* import { RouterLink, RouterView } from 'vue-router' */
import Header from "./common/Header.vue"
import Footer from "./common/Footer.vue"
</script>

<template>
  <Header />
  <div class="content">

  </div>
  <Footer />
</template>

<style lang="scss" scoped>

 .content{
/*   min-height: 100vh; */
  min-height: 100%;
 }

 body{
  position: relative;
  height: 100vh;
}

</style>
