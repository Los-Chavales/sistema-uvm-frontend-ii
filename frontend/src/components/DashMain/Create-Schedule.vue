<script setup>
  import { defineProps, ref,  onMounted, computed } from 'vue';
  import Submit_Button from '../buttons/Submit_Button.vue';
  import { useSchedulesStore } from '@/stores/Dash_Stores/schedules';
  import Modal_Message from '../modals/Modal_Message.vue';

  let schedulesStore = useSchedulesStore();

  const props = defineProps({
    state: {
      type: Boolean,
      required: true
    },
    toChangeState: {
      type: Function,
      required: true
    },
  })
  const changeState = props.toChangeState

  let dia_semana = ref(''); 
  let hora_inicio = ref('00:00');
  let hora_final = ref('00:00');

  const postSchedule = computed(() => {
    let cookie = $cookies.get('auth')
    if(cookie !== null){
      let token = cookie.token;
      schedulesStore.postSchedules(
        token,
        {
          dia_semana: dia_semana.value,
          hora_inicio: hora_inicio.value,
          hora_final: hora_final.value
        }
      )
    } 

    dia_semana.value = ''; 
    hora_inicio.value = '00:00';
    hora_final.value = '00:00';
    changeStateMessageModal()
  });

  //función para desplegar el modal 
  let stateMessageModal = ref(false);
  const changeStateMessageModal = () => ( stateMessageModal.value = !stateMessageModal.value)

</script>

<template>

  <div class="container_modal" v-show="props.state">

    <div class="modal">

      <div class="modal_head">
        <div class="container_button">
          <button @click="changeState('create')" class="modal_cerrar">cerrar X</button>
        </div>
      </div>

      <div class="modal_body">

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_activities">Añadir Horario</h3>

            <form class="formCreate" @submit.prevent="postSchedule">

              <div class="formCreateEvent_Containerselect">
                <select class="formCreateEvent_select" v-model="dia_semana" required>
                  <option value="" disabled selected>Dia de la semana</option>
                  <option class="formCreateEvent_option" value="lunes">Lunes</option>
                  <option class="formCreateEvent_option" value="martes">Martes</option>
                  <option class="formCreateEvent_option" value="miércoles">Miércoles</option>
                  <option class="formCreateEvent_option" value="jueves">Jueves</option>
                  <option class="formCreateEvent_option" value="viernes">Viernes</option>
                  <option class="formCreateEvent_option" value="sábado">Sábado</option>
                  <option class="formCreateEvent_option" value="domingo">Domingo</option>
                </select>
              </div>

              <div class="formCreateActivity_containerLabel">
                <label class="formCreateActivity_label" for="timeStart">Hora de entrada:</label>
                <input type="time" id="timeStart" v-model="hora_inicio">
              </div>

              <div class="formCreateActivity_containerLabel">
                <label class="formCreateActivity_label" for="timeEnd">Hora de salida:</label>
                <input type="time" id="timeEnd" v-model="hora_final">
              </div>

              <Submit_Button :message="'Añadir'"/>

            </form>

          </div>
        </div>

      </div>

    </div>

  </div>

  
  <Modal_Message 
    v-show="stateMessageModal" 
    @closeModalMessage="changeStateMessageModal"
    :typeMessage="'schedule'" 
  />

</template>

<style lang="scss" scoped>
  @import "@/assets/scss/variables.scss";


  /* Estructura del modal */

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

  .modal_head{
    width: -webkit-fill-available;
  }

  .modal{
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: $color4;
    //width: 790px;
    width: auto;
    padding: 15px 30px 30px 30px;
    border-radius: 15px;
  }

  .container_button{
    display: flex;
    flex-direction: row-reverse;
  }

  .modal_cerrar{
    background: none;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
  }
  .modal_cerrar:hover{
    cursor: pointer;
    background-color: $secondary_color;
    border-radius: 5px;
  }

  .modal_title{
    color: #FFF;
    font-family: 'Poppins';
    font-size: 35px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
  }

  

  /* Contenedor del titulo del modal */

  .modal_body{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
  }

   /* Contenedor de las secciones blancas modal */

  .modal_part{
    background-color: #FFF;
    border-radius: 7px;
    margin: 10px;
    overflow: auto;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .part_container{
    padding: 14px 18px;
    width: auto;
  }

  .formCreate{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* información del contenido, titulos, parrafos... */

  .part_title{
    font-family: Poppins;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    margin-bottom: 20px;
  }

  .title_activities{
    color: #000
  }

  .title_events{
    color: $secondary_color;
  }

  .form-input{
  display: flex;
  width: 300px;
  padding: 13px;
  color: #000;
  font-size: 24px;
  line-height: normal;
  border-radius: 10px;
  background: rgba( 158, 158, 158, 0.30);
  margin-bottom: 18px;
  border:0;
  border-top: 3px solid var(--Color4, #329D9C);
  outline: none;

  }

.form-input::placeholder{
color:#000000;
font-family: "Ubuntu"; 
text-align: center;
justify-content: center;
align-items: center;
font-style: normal;
font-weight: 400;
}

.form-submit{
width: 300px;
height: 60px;
flex-shrink: 0;
border:0;
border-radius: 10px;
color: #fff;
font-family:"poppins";
font-size: 24px;
font-weight: 600;
background-color: var(--Color4, #329D9C);;

}

  .formCreateEvent_select{
    width: 100%;
    margin: 0 0 25px 0;
    border: 1px solid $color5;
    background: #FFF;

    color: #000;
    font-family: Poppins;
    font-size: 20px;
    outline: none;

    cursor: pointer;
  }


.text-input{
  height:48px;
}

.form-submit:hover{
   cursor: pointer;
}

.searcher{
  display: flex;
  height: 45px;
  outline: 3px solid $color5;
  border-radius:10px;
  min-width: 320px;
  margin: 10px 0;
  
}

.searcher_input{
  height: 45px;
  border: none;
  border-radius: 10px;
  outline: none;
  min-width: 280px;
  padding: 10px;
  font-size: 13px;
  font-family: 'Ubuntu';
}
.searcher_icon{
  float: right;
  font-size: 30px;
  margin-top:5px;
}

.formCreateActivity_label{
    color: #000;
    font-family: "Inria Sans";
    font-size: 24px;
    font-weight: 400;
  }

  .formCreateActivity_containerLabel{
    margin-bottom: 25px;
  }


.materiasContainer{
  display: flex;
  min-height: 390px;
  padding-bottom: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  background: rgba(158, 158, 158, 0.40);
  overflow-x: auto;
}

.title{
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  background-color: $color4;
  height:49px;
    .subject_title{
    color: #FFF;
    font-family: Poppins;
    font-size: 23px;
    font-style: normal;
    font-weight: 300;
    float: right;
    margin-left: 15px;
    
    }

    .title_container{
      margin-top:15px ;
      margin-left:10px;
    }
    span{
      height: auto;
      font-size: 33px;
      color: #fff;
    }
}

.subject_check{
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: stretch;
  height:49px;

  color: #000;
  font-family: Poppins;
  font-size: 23px;
  font-style: normal;
  font-weight: 300;
  

  input{
    width: 30px;
    height: 30px;
    margin-left: 10px;
    accent-color:#329D9C;
  }

}

  @media (min-width: 768px) and (max-width: 991px) {
    .containerFrontPage {
      height: 620px;
    }
  }

  @media (min-width: 780px) {
    .part_container {
      /*width: auto;*/
      /*height: 60%;*/
    }

    .modal_body {
      flex-direction: row;
    }
  }


  @media (min-width: 1024px) {
    /*.part_container {
      /*width: 85%;
      /*width: auto;
      height: 41vw;
    }*/
  }


</style>