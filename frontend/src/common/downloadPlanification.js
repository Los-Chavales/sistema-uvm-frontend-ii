import * as XLSX from 'xlsx/xlsx.mjs';
import { toRaw } from 'vue';
import { useEventsStore } from '@/stores/events';
import { useActivitiesStore } from '@/stores/activities';


const storeEvents = useEventsStore()
const storeActivities = useActivitiesStore();

storeEvents.searchAllEvents();

function downloadPlanification(){ 
  console.log("algo")
/*   let dataEvents = toRaw(storeEvents.getEventsDownload)
  let dataActivities = toRaw(storeActivities.getActivitiesDownload)
  
  const workbook = XLSX.utils.book_new(); //Iniciar un nuevo archivo
  const worksheetEvents = XLSX.utils.json_to_sheet(dataEvents);  //Llevarse el array
  XLSX.utils.book_append_sheet(workbook, worksheetEvents, "eventos"); //Crear hoja

  if(dataActivities.length > 0){
    const worksheetActivities = XLSX.utils.json_to_sheet(dataActivities);  //Llevarse el array
    XLSX.utils.book_append_sheet(workbook, worksheetActivities, "actividades"); //Crear hoja
  }


  XLSX.writeFile(workbook, "planificacion.xlsx");  */
} 
 
export {downloadPlanification}