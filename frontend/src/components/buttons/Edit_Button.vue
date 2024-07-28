<script setup>
import { defineProps, ref,  onMounted, computed } from 'vue';
import Edit from '@/assets/icons/Edit.vue';
import Modal_Form from '../modals/Modal_Form.vue';

 /* const props = defineProps({
    change: {
      type: Function,
      required: true
    },
  })*/

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
    formEditActivity: Boolean,
    renderForm: String,

  //Del admin
    change: {
      type: Function,
      required: true
    },
})

const changeState = props.change

let stateFormEdit = ref(false);
const changeStateModalFormEdit = () => ( stateFormEdit.value = !stateFormEdit.value )

</script>

<template>
<!-- DEl admin -->
  <button class="button--edit" @click="changeState('edit')" style="color:#fff"><Edit /></button> 
  <!-- <button class="button--edit" @click="changeStateModalFormEdit" style="color:#fff"><Edit /></button> 
 
 
  <Modal_Form 
    @closeModalForm="changeStateModalFormEdit"
    v-if="props.renderForm === 'event' && stateFormEdit"

    :dateWeek="props.dateWeek"
    :titleDay= "props.titleDay"
    :formDire= "props.formDire"
    :formTeacher="props.formTeacher"
    :weekNumber="props.weekNumber"
    :eventID="props.eventID"
    :dataEdit="props.dataEdit"

    :formEditEvent="stateFormEdit"
    
  /> 

 <Modal_Form
  @closeModalForm="changeStateModalFormEdit"
    v-if="props.renderForm === 'activity' && stateFormEdit"
    :titleDay= "props.titleDay"
    :formDire= "props.formDire"
    :formTeacher="props.formTeacher"
    :weekNumber="props.weekNumber"
    :dateWeek="props.dateWeek"
    :activityID="props.activityID"
    :dataEdit="props.dataEdit"

    :formEditActivity="stateFormEdit"
  />
   -->
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