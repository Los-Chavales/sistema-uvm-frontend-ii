<script setup>
  import Edit from '@/assets/icons/Edit.vue';

</script>

<template>
  <button class="button--edit" style="color:#fff"><Edit /></button>
</template>


<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

  .button--edit{
    border-radius: 5px;
    background: #FE6F51;
    border: none;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
    float: left;
  }

  .button--edit:hover{
    background-color: $secondary_color;
    cursor: pointer;
  }
</style>