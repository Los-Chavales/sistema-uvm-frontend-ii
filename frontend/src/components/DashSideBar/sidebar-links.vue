<script setup>
import { computed } from 'vue';
import { to_toggle } from './sidebar-state';
import { useRoute } from 'vue-router';
    const props = defineProps({
        to: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
    })

    const route = useRoute()

    const isActive = computed(() => route.path == props.to )
</script>

<template>
    <router-link :to="to" class="link" :class="{ active : isActive }">
        <i class="icon" :class="icon"></i>
            <transition name="fade">
                <span v-if="!to_toggle">
                    <slot />
                </span>
            </transition>
    </router-link>
</template>

<style lang="scss" scoped>
    @import '@/assets/scss/variables.scss';

.face-enter-active,
.fade-leave-active{
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to{
    opacity: 0;
}
    .link{
        display:flex;
        aling-items:center;
        cursor:pointer;
        position: relative;
        user-select: none;
        margin: 0.2em 0;
        padding: 10px;
        height: 1.5em;
        color: #000;
        text-decoration: none;
        background-color: $color6;
        height: 55px;
        font-family: "Poppins", sans-serif;
        font-weight: 100;
        font-style: normal;
        font-size: 20px;


    }

    .link .icon{
        font-size: 25px;
        flex-shrink: 0;
        width: 25px;
        margin-right: 10px;
    }

    .link:hover{
        background-color: $color4;
        color: #fff;
        
        .icon{
            color: #fff;
        }
        
    }
    .link.isActive{
        background-color: $color4;
        color: #fff;
        
        .icon{
            color: #fff;
        }
        
    }
</style>