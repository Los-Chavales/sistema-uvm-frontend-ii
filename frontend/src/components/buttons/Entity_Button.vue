<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true
    },
    onClick: {
        type: Function,
        required: true
    },
});
</script>

<template>
    <button class="button--white" type="button" @click="onClick">{{ message }}</button>
</template>

<style style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

</style>