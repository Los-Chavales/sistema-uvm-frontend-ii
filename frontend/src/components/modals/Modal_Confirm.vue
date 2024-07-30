<script setup>
    import {  defineProps, ref } from 'vue';
    import { useActivitiesStore } from '@/stores/activities';
    import { useEventsStore } from '@/stores/events';
    import { useSchedulesStore } from '@/stores/Dash_Stores/schedules';
    import { useAssignedStore } from '@/stores/assigned';
    import { subjectStore } from '@/stores/Dash_Stores/subject';
    import { sectionStore } from '@/stores/Dash_Stores/sections';
    import { userStore } from '@/stores/Dash_Stores/users';

    let storeActivities = useActivitiesStore();
    let storeEvents = useEventsStore();
    let storeSchedules = useSchedulesStore();
    let storeAssigned = useAssignedStore();
    let storeSubject  = subjectStore();
    let storeSection = sectionStore();
    let storeUser = userStore();

    const props = defineProps({
      /*idD: String,*/
      actD: Number,
      evnD: Number,
      dateWeek: Date,
      idData:Number,
      typeDelete:String
    })

    let prop = props.dateWeek
    const deleteActivity = storeActivities.deleteActivities;
    const deleteEvent = storeEvents.deleteEvents;
    const deleteEventsOnly = storeEvents.deleteEventsOnly;
    const deleteSchedule = storeSchedules.deleteSchedules;
    const deleteAssigned = storeAssigned.deleteAssigned;
    const deleteSubject = storeSubject.deleteSubject;
    const deleteSection = storeSection.deleteSection;
    const deleteUser = storeUser.deleteProfessor;

    const deleteSubmit=()=>{
      let cookie= $cookies.get('auth')
      let token
      if (props.actD && cookie !==null){
        token= cookie.token
        let year = prop.getFullYear();
        let month = prop.getMonth();
        deleteActivity(props.actD, token, year, month)
        
      }else if(props.evnD && cookie !==null){
        token= cookie.token
        let year = prop.getFullYear();
        let month = prop.getMonth();
        deleteEvent(props.evnD, token, year, month)
        
      }else if(props.idData && cookie !==null && props.typeDelete === "eventTable"){
        token= cookie.token
        deleteEventsOnly(props.idData, token)
      }else if(props.idData && cookie !==null && props.typeDelete === "schedule"){
        token= cookie.token
        deleteSchedule(props.idData, token)
      }else if(props.idData && cookie !==null && props.typeDelete === "assigned"){
        token= cookie.token
        deleteAssigned(props.idData, token)
      }else if(props.idData && cookie !==null && props.typeDelete === "subject"){
        token= cookie.token
        deleteSubject(props.idData, token)
      }else if(props.idData && cookie !==null && props.typeDelete === "section"){
        token= cookie.token
        deleteSection(props.idData, token)
      }else if(props.idData && cookie !==null && props.typeDelete === "professor"){
        token= cookie.token
        deleteUser(props.idData, token)
      }
    }

</script>


<template>
  <div class="container_modal">
    <div class="modalConfirm">
      <div class="modalConfirm_part">
        <h3 class="modalConfirm_title">¿Está seguro de que quiere eliminarlo?</h3> <!--{{ props.idD }}-->
        <div class="modalConfirm_buttons">
          <button class="button_confirm button--white" @click="deleteSubmit">Si</button> <!--@click="deleteActivity( props.idD )"   @click="deleteActivity( props.actD );deleteEvent( props.evnD )"-->
          <button  class="button_confirm button--white" @click="$emit('close')">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";
  .container_modal{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.51);

    display: flex;
    justify-content: center;
    align-items: center; 

    padding: 0 2%;
  }

  .modalConfirm{
    background-color: $color4;
    width: 450px;
    padding: 15px;
    border-radius: 15px;
  }

  .modalConfirm_part{
    background-color: #fff;
    border-radius: 15px;
    padding: 30px 20px;
  }
  .modalConfirm_title{
    color: #000;
    font-family: Poppins;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    line-height: 1.8;
    
  }

  .modalConfirm_buttons{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
  } 

  .button_confirm{
    margin: 10px;
    font-size: 20px;
    border: none;
    width: 90px;
    border: solid 2px $color5;
    
  }
</style>