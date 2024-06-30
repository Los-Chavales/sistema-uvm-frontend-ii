import { ref, computed } from 'vue'

export const to_toggle = ref(false)


export const toggle = ( ) => ( to_toggle.value = !to_toggle.value )


export const SB_WIDTH = 228;
export const SB_WIDTH_COLLAPSE = 45;
export const sbWidth = computed(
    () => `${ to_toggle.value ? SB_WIDTH_COLLAPSE : SB_WIDTH }px`
)