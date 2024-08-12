<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <main class="containerHome">
    <div class="containerh1">
      <h1 class="containerh1__title">¡Página no encontrada!</h1>
    </div>
    <div class="containerp">
      <p class="containerp__p">Lo sentimos, pero la página que estás buscando no existe.</p>
      <p class="containerp__p">
        <RouterLink class="containerp__a" to="/">
          Volver a la página principal
        </RouterLink>
      </p>
    </div>
  </main>
</template>

<style lang="scss">
.usr-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.containerHome {
  flex-grow: 1;
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.containerFontPage__logo {
  width: 283px;
  height: 285px;
}

.containerh1 {
  margin: 44px 30px 24px 30px;
}

.containerh1__title {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: $color5;
  text-align: center;
  font-family: Poppins;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.containerp {
  margin: 48px 50px 69px 50px;

}

.containerp__p {
  color: #E1FDF6;
  text-align: center;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-shadow: #000 1px 0 10px;
}

.containerp__a {
  text-shadow: none;
  text-decoration: none;
  color: #EF2D04;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.containerp__a:hover {
  color: #ff0800;
}

@media (min-width: 768px) {
  .containerFontPage__logo {
    width: 342px;
    height: 335px;
  }

  .containerh1__title {
    font-size: 40px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .containerFrontPage {
    height: 620px;
  }
}

@media (min-width: 1024px) and (min-height: 1366px) {
  .containerFrontPage {
    height: 620px;
  }
}
</style>
