import axios from "axios"
const API_URL_BASE = import.meta.env.VITE_API_BASE
/* import * as XLSX from 'xlsx/xlsx.mjs';
import { toRaw } from 'vue';
import { useEventsStore } from '@/stores/events';
import { useActivitiesStore } from '@/stores/activities';


const storeEvents = useEventsStore()
const storeActivities = useActivitiesStore();

storeEvents.searchAllEvents(); */

/*  function downloadPlanification(){ 

 let dataEvents = toRaw(storeEvents.getEventsDownload)
  let dataActivities = toRaw(storeActivities.getActivitiesDownload)
  
  const workbook = XLSX.utils.book_new(); //Iniciar un nuevo archivo
  const worksheetEvents = XLSX.utils.json_to_sheet(dataEvents);  //Llevarse el array
  XLSX.utils.book_append_sheet(workbook, worksheetEvents, "eventos"); //Crear hoja

  if(dataActivities.length > 0){
    const worksheetActivities = XLSX.utils.json_to_sheet(dataActivities);  //Llevarse el array
    XLSX.utils.book_append_sheet(workbook, worksheetActivities, "actividades"); //Crear hoja
  }


  XLSX.writeFile(workbook, "planificacion.xlsx"); 
}  */


const downloadPlanification = async() =>{
  return await axios.get(`${API_URL_BASE}/descargar/1/1`, {
    responseType: Blob,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    console.log(response)
    let data = new Blob([response.data], {type: 'application / vnd. MS Excel'});
    let csvURL = window.URL.createObjectURL(data);
    let generateLink = document.createElement('a');
    generateLink.href = csvURL;
    generateLink.setAttribute('download', `${new Date().getTime()}.xlsx`);
    generateLink.click();
  })
  .catch(err => {
    console.log("fallo")
  });
}
 
export {downloadPlanification}