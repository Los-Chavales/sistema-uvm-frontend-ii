<script setup>
  import { defineProps, ref,  onMounted, computed } from 'vue';
  import { subjectStore } from '@/stores/Dash_Stores/subject';
  import { sectionStore } from '@/stores/Dash_Stores/sections'


  onMounted(() => {
      sectionStoreU.getSections()
  })

  const sectionStoreU  = sectionStore();
    const getSection = computed(() => {
        return sectionStoreU.sections;
        
    })

    
    const section = computed(() => {
        return sectionStoreU.sections
    })
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
  
  const data = ref({
    subName : '',
    subDescription : '',
    trimestre: '',
    carrera:'',
  })
  
const store = subjectStore();

const sendSub = (dataS) => {
  console.log(data.value.trimestre)
  console.log(data.value.carrera)
  const token = $cookies.get('auth').token
  console.log(`token in professors => ${token}`)
  store.sendSubject(dataS, token)
  data.value.subName = '';
  data.value.subDescription= '';
  store.getSubject();


} 


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

        <!-- Parte de mostrar actividades -->

        <div class="modal_part">
          <div class="part_container">
            <h3 class="part_title title_activities" >Añadir Materia</h3>

            <form v-on:submit.prevent="login">
              <select name="" id="" class="select" v-model="data.trimestre">
                <!--<option  v-for="(element, index) in section" :value="element.nombre_seccion" :key="index" >{{element.nombre_seccion}}</option>-->
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
              <select name="" id="" class="select" v-model="data.carrera">
                <!--<option  v-for="(element, index) in section" :value="element.nombre_seccion" :key="index" >{{element.nombre_seccion}}</option>-->
                <option value="Ingenieria de Computacion" >Ingenieria de Computacion</option>
                <option value="Ingenieria Industrial" >Ingenieria Industrial</option>


              </select>
              <input class="form-input text-input" placeholder="Nombre" name="nombre" type="text" v-model="data.subName" id="nombre" />
              <input class="form-input description" placeholder="Descripción" name="apellido" type="text" v-model="data.subDescription" id="apellido" />
              

              <input class="form-submit" type="submit" value="Ingresar" @click="sendSub(data)" />

            </form>
          </div>
        </div>


      </div>

    </div>

  </div>

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
    width: auto;
    /*height: 579px;*/
    /*padding: 15px 30px 30px 30px;*/
    height:600px;
    padding: 15px 15px 25px 15px;
    border-radius: 15px;
    
  }

  .container_button{
    display: flex;
    flex-direction: row-reverse;
  }

  .modal_cerrar{
    /*background: none;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;*/
    background: none;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    text-decoration-line: underline;
    line-height: 20px;
   /*  margin-right: -12px; */
    margin: -5px -5px 1px 1px;
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
    margin-top: 14px;
    
  }

   /* Contenedor de las secciones blancas modal */

  .modal_part{
    background-color: #FFF;
    border-radius: 7px;
    margin: 10px;
    height: 100%;
    overflow: auto;
    overflow-y: hidden;//agregado
    padding-top: 2px;
    padding: 12px;
    
    
  }


  .part_container{
    padding: 20px 26px;
    width: auto;
    
  }

  /* información del contenido, titulos, parrafos... */

  .part_title{
    font-family: Poppins;
    /*font-size: 30px;
    font-style: normal;
    font-weight: 500;*/
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
  width: 300px;//
  padding: 13px;
  color: #000;
  font-size: 24px;//
  line-height: normal;
  border-radius: 10px;
  background: rgba( 158, 158, 158, 0.30);
  margin-bottom: 18px;
  border:0;
  border-top: 3px solid var(--Color4, #329D9C);
  outline: none;
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 23px;
    
  }
  
  .description{
    height: 150px;
    text-align: justify;
    /*width: 100%;*/
    
  }


  .select{
  display: flex;
  /*width: 300px;*/
  padding: 5px;
  color: #000;
  font-size: 15px;
  line-height: normal;
  margin-bottom: 18px;
  outline: solid 1px #000;
  height: 40px;
  margin-left: 6px;//agregado
  width: 95%;
  border: 1px solid $color5;
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
/*width: 300px;*/
width: 100%;
height: 60px;
flex-shrink: 0;
border:0;
border-radius: 10px;
color: #fff;
font-family:"poppins";
/*font-size: 24px;
font-weight: 600;*/
font-size: 32px;
font-weight: 600;
background-color: var(--Color4, #329D9C);;
text-align: center;
}


.text-input{
  height:48px;
  text-align: center;
 /* width: 100%;*/

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