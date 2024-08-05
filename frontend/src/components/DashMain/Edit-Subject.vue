<script setup>
  import { defineProps, ref,  onMounted, computed, watch} from 'vue';
  import { subjectStore } from '@/stores/Dash_Stores/subject';
  import Modal_Message from '../modals/Modal_Message.vue';

  const storeSubject  = subjectStore();

  const props = defineProps({
    state: {
      type: Boolean,
      required: true
    },
    toChangeState: {
      type: Function,
      required: true
    },
    scheduleDetail: {
      type: Object,
      required: true,
    }
  })
  const changeState = props.toChangeState
 
  const data = ref({ ...props.scheduleDetail })

  const id_materia = ref(props.scheduleDetail.id_materia)
  const nombre_materia = ref(props.scheduleDetail.nombre_materia);
  const trimestre = ref(props.scheduleDetail.trimestre);
  const descripcion = ref(props.scheduleDetail.descripcion);
  const carrera = ref(props.scheduleDetail.carrera);

  watch(
    () => props.scheduleDetail,
    (newVal) => {
      data.value = { ...newVal };
      id_materia.value = data.value.id_materia;
      nombre_materia.value = data.value.nombre_materia;
      trimestre.value = data.value.trimestre;
      descripcion.value = data.value.descripcion;
      carrera.value = data.value.carrera;
    },
    { immediate: true }
  ); 

  const putSubject = computed(() => {
    let cookie = $cookies.get('auth')
    if (cookie !== null) {
      let token = cookie.token;
      storeSubject.updateSubject(
        token, 
        {
          nombre_materia: nombre_materia.value,
          trimestre: trimestre.value,
          descripcion: descripcion.value,
          carrera: carrera.value
        }, 
        id_materia.value
      )
    }
    changeStateMessageModal()
  });

//función para desplegar el modal 
let stateMessageModal = ref(false);
const changeStateMessageModal = () => (stateMessageModal.value = !stateMessageModal.value)

/*   const subjects = [
  {
    id_materia: 1,
    nombre_materia: "Frontend II",
    trimestre: "VI",
    descripcion: "Diseño de interfaces priorizando técnicas UX UI",
    carrera: "Ingeniería de computación",
    seccion: 'VI1'
  },
  {
    id_materia: 2,
    nombre_materia: "Bases de datos",
    trimestre: "III",
    descripcion: "Manejo de almacenamiento de datos de manera permanente y no volátil",
    carrera: "Ingeniería de computación",
    seccion: 'B1'
  }
] */
</script>

<template>

  <div class="container_modal" v-show="props.state">

    <div class="modal">

      <div class="modal_head">
        <div class="container_button">
          <button @click="changeState('edit')" class="modal_cerrar">cerrar X</button>
        </div>
        <h2 class="modal_title">{{ title_modal }}</h2>
      </div>

      <div class="modal_body">

        <!-- Parte de mostrar actividades -->

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_activities">Editar Materia</h3>

            <form v-on:submit.prevent="putSubject">

              <select name="Trimestre"  id="" class="select" v-model="trimestre" required>
                <option value="I" >I (1)</option>
                <option value="II" >II (2)</option>
                <option value="III" >III (3)</option>
                <option value="IV" >IV (4)</option>
                <option value="V" >V (5)</option>
                <option value="VI" >VI (6)</option>
                <option value="VII" >VII (7)</option>
                <option value="VIII" >VIII (8)</option>
                <option value="IX" >IX (9)</option>
              </select>

              <select name="Carrera" id="" class="select" v-model="carrera" required>
                <option value="Ingenieria de Computación" >Ingenieria de Computación</option>
                <option value="Ingenieria Industrial" >Ingenieria Industrial</option>
              </select>

              <input class="form-input text-input"  v-model="nombre_materia" placeholder="Nombre" name="nombre" type="text" id="nombre" required/>
              <textarea  class="formCreateEvent_textarea" placeholder="Descripción" v-model="descripcion" required></textarea>


              <input class="form-submit" type="submit" value="Actualizar" />

            </form>
          </div>
        </div>


        <!-- Parte de mostrar eventos -->

        <!-- <div class="modal_part">
          <div class="part_container">
            <div class="searcher">
              <input class="searcher_input" placeholder="Buscar..." name="buscador" type="buscador" v-model="buscador" id="buscador" />
              <span class="searcher_icon">
                <i class="fa-solid fa-magnifying-glass "></i>
              </span>
            </div> -->
            <!-- En caso de no tener nada -->
<!-- 
            <div class="container_details" v-if="getEvents.length === 0">
              <p class="part_p p--activity">No hay nada para hoy</p>
            </div> -->
<!-- 
            <div class="materiasContainer">
              <div class="title">
                <div class="title_container">
                  <span class="icon_container">  
                  <i class="fa-solid fa-calendar"></i>
                    <h3 class="part_title subject_title">Editar Profesores</h3>
                </span>
                </div>
              </div>
                <span v-for="subject in subjects" :key="subject.id_materia" class="subject_check"><input type='checkbox'>{{ subject.nombre_materia }} ({{ subject.seccion }})</span>
            </div>

          </div>
        </div> -->

      </div>

    </div>

  </div>

  <Modal_Message v-show="stateMessageModal" @closeModalMessage="changeStateMessageModal" :typeMessage="'subject'" />

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
    height: 579px; 
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
    height: 100%;
    overflow: hidden;
  }

   /* Contenedor de las secciones blancas modal */

  .modal_part{
    background-color: #FFF;
    border-radius: 7px;
    margin: 10px;
    height: 100%;
    overflow: auto;
  }


  .part_container{
    padding: 14px 18px;
    width: auto;
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
  
  .select{
  display: flex;
  //width: 300px;
  padding: 5px;
  color: #000;
  //font-size: 15px;
  line-height: normal;
  margin-bottom: 18px;
  outline: solid 1px #000;
  height: 40px;
  margin-left: 6px;//agregado
  width: 95%;
  border: 1px solid $color5;
  outline: none;
  font-size: 18px;
  font-weight: 300;
  font-family: Poppins;
  }

  .description{
    height: 150px;
    text-align: justify;
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


.formCreateEvent_textarea{
    resize: none;
    display: flex;
    width: 100%;
    height: 120px;
    min-height: 60px;
    padding: 10px;
    margin: 0 0 25px 0;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: none;
    border-top: 3px solid $color4;
    background: rgba(158, 158, 158, 0.30);
    outline: none;

    color: #000;
    font-family: "Inria Sans";
    font-size: 14px;
    font-style: normal;
  }

  .formCreateEvent_textarea::placeholder{
    color: #000;
    text-align: center;
    font-family: "Inria Sans";
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
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