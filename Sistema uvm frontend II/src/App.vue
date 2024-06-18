<script setup>
/* import { RouterLink, RouterView } from 'vue-router' */
import Header from "./common/Header.vue"
import Footer from "./common/Footer.vue"
</script>

<template>
  <Header />
  <div class="contenido">

  </div>
  <Footer />
</template>

<style lang="scss" scoped>

 .contenido{
  min-height: 100vh;
 }

 body{
  height: 100vh;
}
</style>
