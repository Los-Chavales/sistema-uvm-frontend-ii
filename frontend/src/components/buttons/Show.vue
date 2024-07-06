<script setup>
</script>

<template>
    <span class="button--delete">
      <i class="fa-solid fa-eye"></i>
    </span>
</template>


<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";

  .button--delete{
    border-radius: 5px;
    background: #D74526;
    border: none;
    display: flex;
    width: 30px;
    height: 30px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    margin: 2px;
    float:left;
  }

  .button--delete:hover{
    background-color: $secondary_color;
    cursor: pointer;
  }

</style>