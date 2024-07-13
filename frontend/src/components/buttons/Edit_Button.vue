<script setup>
import { defineProps, ref,  onMounted, computed } from 'vue';
import Edit from '@/assets/icons/Edit.vue';
import Modal_Form from '../Modal_Form.vue';

const props = defineProps({
    dateWeek: Date,
    titleDay: String,
    formDire: Boolean,
    formTeacher: Boolean,
    weekNumber: Number,
    formEditEvent: Boolean,
    eventID: Number,
    dataEdit: Object,
    activityID:Number, //actividades
    formEditActivity: Boolean
})

let stateFormEventEdit = ref(false);
const changeStateModalFormEventEdit = () => ( stateFormEventEdit.value = !stateFormEventEdit.value )

let stateFormActivityEdit = ref(false);
const changeStateModalFormActivityEdit = () => (stateFormActivityEdit.value = !stateFormActivityEdit.value)

</script>

<template>
  <button @click="changeStateModalFormActivityEdit" class="button--edit" style="color:#fff"><Edit /></button> <!--"changeStateModalFormEventEdit" eventos-->
 <!-- <Modal_Form 
    @closeModalForm="changeStateModalFormEventEdit"
    v-show="stateFormEventEdit"

    :dateWeek="props.dateWeek"
    :titleDay= "props.titleDay"
    :formDire= "props.formDire"
    :formTeacher="props.formTeacher"
    :weekNumber="props.weekNumber"
    :eventID="props.eventID"
    :dataEdit="props.dataEdit"

    :formEditEvent="stateFormEventEdit"
    
  /> -->

 <Modal_Form
  @closeModalForm="changeStateModalFormActivityEdit"
    v-show="stateFormActivityEdit"
    :titleDay= "props.titleDay"
    :formDire= "props.formDire"
    :formTeacher="props.formTeacher"
    :weekNumber="props.weekNumber"
    :dateWeek="props.dateWeek"
    :activityID="props.activityID"
    :dataEdit="props.dataEdit"

    :formEditActivity="stateFormActivityEdit"
  />
  
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