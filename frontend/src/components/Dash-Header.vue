<script setup>
</script>

<template>
  <header class="header">
    <div class="container">
      <img alt="UVM logo" class="container__logo" src="@/assets/img/svg/logo_uvm.svg" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
   @import "@/assets/scss/variables.scss";


  .header{
    border-bottom: 1px solid #FFF;
    background: rgba(255, 255, 255, 0.40);
    height: 79px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 55px 0 16px;
  }

  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

    
@media (min-width: 768px) {
    .header{
      padding: 5px 30px;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    .container{
      justify-content: center;
      width: 100%;
    }


  }

@media (min-width: 992px) { 
}

@media (min-width: 1024px) {


} 

</style>
