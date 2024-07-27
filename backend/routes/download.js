var express = require('express');
var router = express.Router();
const Activities_Controller = require('../controllers/activities_controllers');
const Events_Controller = require('../controllers/events_controllers')
const XlsxPopulate = require('xlsx-populate');

router.get("/:idAssigned/:idPeriod", function (req, res, next) {
  let header = ["Fecha", "Nombre", "Descripción", "Tipo de Evento"];
  let eventsList = [header]
  Activities_Controller.search_activities_Assigned(req.params.idAssigned, req.params.idPeriod) 
  .then((resultsActivities) => {
    console.log("results de la actividad")
    let activities = resultsActivities.message

    if(activities.length > 0) {
      for (let i = 0; i < activities.length; i++) {
        activities[i].Tipo_de_Evento = "Actividad"
      }
    }  

    Events_Controller.search_events_Assigned(req.params.idAssigned, req.params.idPeriod) 
    .then((resultsEvents) => {
      console.log("results de los eventos")
      let events = resultsEvents.message
      let arrAux = []

      if(activities.lengt !== 0 && events.lengt !== 0){
        arrAux = activities.concat(events)
      }else if(activities.lengt !== 0){
        arrAux = activities
      }else if(events.lengt !== 0){
        arrAux = events
      }

      arrAux = arrAux.sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha))

      if(arrAux.length > 0) {
        for (let i = 0; i < arrAux.length; i++) {
          let date = new Date(arrAux[i].Fecha) 
          date = date.toLocaleDateString('es-ES') 
          eventsList.push([
            date, 
            arrAux[i].Nombre, 
            arrAux[i].Descripcion,
            arrAux[i].Tipo_de_Evento 
          ])
        }
      } 

      //res.send(eventsList)

      XlsxPopulate.fromBlankAsync()
        .then(workbook => {
          
            workbook.sheet("Sheet1").cell("A1").value(eventsList);
    
           /*  res.send("Descarga exitosa")
            return workbook.toFileAsync("../planificacion.xlsx"); */
            return workbook.outputAsync();
        })
        .then(data => {
          // Set the output file name.
          res.attachment("planificacion.xlsx");

          // Send the workbook.
          res.send(data);
        })
        .catch(() => {
            res.send("Descarga fallida")
        });  

      })

    .catch((error) => {
      //console.log(error);
      if (!error.code || !error.message) return res.status(500).send(error);
      res.status(error.code).send(error.message);
    }) 
  })
  .catch((error) => {
    //console.log(error);
    if (!error.code || !error.message) return res.status(500).send(error);
    res.status(error.code).send(error.message);
  })

});

module.exports = router;