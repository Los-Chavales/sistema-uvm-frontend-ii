<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true
    }
});
</script>

<template>
    <button class="submitB" type="submit">{{ message }}</button>
</template>

<style style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.submitB {
    padding: 6px 6px;
    flex-shrink: 0;
    border: 0;
    border-radius: 10px;
    color: $color7;
    font-family: "poppins";
    font-size: 32px;
    font-weight: 600;
    background-color: $color4;
    width: 100%;
}

.submitB:hover {
    cursor: pointer;
}
</style>