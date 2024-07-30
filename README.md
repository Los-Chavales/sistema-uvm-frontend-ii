# Sistema-Uvm-Frontend-II: UVM Planification System

Este Sistema de organización y planificación académica es un proyecto de la materia Frontend II a cargo del Profesor Roberto Di Michele. Tiene las características de ser una gran herramienta para estudiantes, docentes y directores de la universidad; cada rol en específico tendrá la oportunidad de crear, editar, eliminar o descargar una planificación u observar el calendario correspondiente a las actividades o eventos que se deseen observar siendo el caso de los estudiantes.

Cada rol en específico tiene las opciones de: 

***DIRECTOR***
* Gestionar Profesores: Añadir profesor, Asignar a una sección y Materia, Desasignar, ver los detalles del profesor, Editar datos del profesor y eliminarlo.

* Gestionar Materias: Añadir materia, Editar, Ver detalles y Eliminar.

* Gestionar Eventos y Periodos Académicos: Añadir, Editar, Eliminar y observar los Eventos disponibles.

* Calendario con Actividades y Eventos disponibles en el cronograma.

* Gestionar Secciones: Añadir, Editar, Eliminar y ver detalles.

* Gestionar Horarios: Añadir, Editar, Eliminar y observar detalles.

***PROFESORES***

* Observar el Periódo Académico de la materia que imparten y descargar planificación.

* Gestionar Eventos y Actividades: Añadir, Editar, Eliminar y Ver detalles.

***ESTUDIANTES***

* Visualizar los Eventos y Actividades de cada Materia.


## Instrucciones

Para instalar y probar este proyecto, tenga en cuenta lo siguiente:

### Requisitos

*	Un navegador web
*	Node.js con npm
*	Conexión a internet (para acceder al servidor de la API REST)
* Archivos .env con los secretos para conectarse a la API dentro de las carpetas client y server:

  La estrutura del .env dirigido a la carpeta frontend es la siguiente:

VITE_API_BASE=http://localhost:4000

  La estrutura del .env dirigido a la carpeta backend es la siguiente:

DB_HOST = localhost
DB_USER = root
DB_PASSWORD = 
DB_DATABASE = sistema_planificacion
JWT_SECRET=secretJWT_token

### Instalación

Una vez descargada y descomprimida la carpeta del repositorio, o tenerlo clonado, abra una terminal en la ruta de dicha carpeta, abra su editor de codigo de preferencia y ejecute los siguientes comando para instalar las dependencias necesarias para su funcionamiento:

1. Abrir dos terminales y siguiente a eso ejecutar los siguientes comandos en cada terminal:

```
cd frontend
```
```
cd backend
```
2. Ejecute el siguiente comando para instalar las dependencias necesarias para frontend y backend de nuestro programa

```
npm install
```

3. Ejecutar la página en ambas terminales como desarrollo con:

**frontend**
```
npm run dev
```

**backend**
```
npm run start
```


4. Ir a la ruta con el puerto asignado para ver la página, esta ruta se puede ver por consola


## Construido con:

* [Figma](https://www.figma.com/design/qNLnOta88I6EU2xzP40hPQ/FRONTEND-II?node-id=0-1&t=NiCSXkUu2UZITPET-1) - Para el prototipado web
* [Node.js](https://nodejs.org/en) - Dependencias
* [Vue.js](https://vuejs.org/) - framework JavaScript progresivo utilizado para construir interfaces de usuario.


## Autores

* **José Simón García Castellanos** - *(C.I: 30.786.086)* - [DarthNeo03](https://github.com/DarthNeo03)
* **Moisés Alfonso Terán Rivas** - *(C.I: 30.601.063)* - [teranMoises](https://github.com/teranMoises)
* **Paola Valentina Marcano Salas** - *(C.I: 30.975.611)* - [PaolaMarcano](https://github.com/PaolaMarcano)
* **Crisangelly Del Valle Hernández Fernández** - *(C.I: 30.954.251)* - [Crisangelly](https://github.com/Crisangelly)

## Desarrollado para:

Universidad Valle del Momboy

Prof. Ing. Roberto Di Michele
