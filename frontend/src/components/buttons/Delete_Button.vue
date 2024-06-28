<script setup>
  import Delete from '@/assets/icons/Delete.vue';
</script>

<template>
    <button class="button--delete"><Delete /></button>
</template>


<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

  .button--delete{
    border-radius: 5px;
    background: #D74526;
    border: none;
    display: flex;
    width: 35px;
    height: 35px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    margin: 2px;
  }

  .button--delete:hover{
    background-color: $secondary_color;
    cursor: pointer;
  }

</style>