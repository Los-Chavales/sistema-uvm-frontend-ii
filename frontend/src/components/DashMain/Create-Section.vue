<script setup>
  import { defineProps, ref,  onMounted, computed } from 'vue';
  import { sectionStore } from '@/stores/Dash_Stores/sections';
  import Modal_Message from '../modals/Modal_Message.vue';

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
  const store = sectionStore();

  const subjects = [
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
]

const data = ref({
  nombre_seccion:'',
  modalidad:'',
})


const sendSub = (dataS) => {
  console.log(data.value.nombre_seccion)
  console.log(data.value.modalidad)
  const token = $cookies.get('auth').token
  console.log(`token in professors => ${token}`)
  store.sendSection(dataS, token)
  data.value.nombre_seccion = '';
  data.value.modalidad= '';
  store.getSections();
  changeStateMessageModal()
} 

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
        <h2 class="modal_title">{{ title_modal }}</h2>
      </div>

      <div class="modal_body">

        <!-- Parte de mostrar actividades -->

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_activities">Añadir Sección</h3>

            <form @submit.prevent="sendSub(data)">


              <select name="Modalidad" v-model="data.modalidad" id="" class="select">

                <option value="semi-presencial">Semi-presencial</option>
                <option value="virtual">Virtual</option>

              </select>
              <input class="form-input text-input" placeholder="Nombre" name="nombre" type="text" v-model="data.nombre_seccion" id="nombre" />


              <input class="form-submit" type="submit" value="Añadir" />

            </form>
          </div>
        </div>


        <!-- Parte de mostrar eventos -->

     <!--    <div class="modal_part">
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

     <!--        <div class="materiasContainer">
              <div class="title">
                <div class="title_container">
                  <span class="icon_container">  
                  <i class="fa-solid fa-calendar"></i>
                    <h3 class="part_title subject_title">Asignar materias</h3>
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

      
  <Modal_Message 
    v-show="stateMessageModal" 
    @closeModalMessage="changeStateMessageModal"
    :typeMessage="'section'" 
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
    //height: 579px; 
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
    font-size: 35px;
    font-style: normal;
    font-weight: 600;
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