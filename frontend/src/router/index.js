import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireLogin : false,
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requireLogin : false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('../views/Login.vue'),
      meta: {
        requireLogin : false,
      }
    },
    {
      path: '/calendario',
      name: 'Calendario',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/planificaciones',
      name: 'Planificaciones',
      component: () => import('../views/PlanningView.vue')
    },
    {
      path: '/admin-dsh',
      name: 'Admin-Dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/admin-dsh/profesores',
      name: 'Admin-Dashboard-profesores',
      component: () => import('../views/DashViews/Hadle_Profesor.vue'),
    },
    {
      path: '/admin-dsh/materias',
      name: 'Admin-Dashboard-Materias',
      component: () => import('../views/DashViews/Handle_Subject.vue'),
      meta: {
        requireLogin : true,
        rol_teacher : false,
        rol_director : true,
      }
    },
    {
      path: '/admin-dsh/secciones',
      name: 'Admin-Dashboard-Secciones',
      component: () => import('../views/DashViews/Handle_section.vue')
    },
  ]
})

//Controlar a donde va el usuario
router.beforeEach((to, from, next) => {
  const auth = {
    login: false,
    rol: ""
  } 

  let cookie = $cookies.get('auth')
  if(cookie !== null){
    console.log("cookie en las rutas")
    console.log(cookie)
    auth.login = true;
    auth.rol = cookie.rol_usuario
  } else {
    console.log("no hay cookies")
  }

  const needAuth = to.meta.requireLogin //Necesita autorización
  const needTeacher =  to.meta.rol_teacher //Necesita el rol de profesor
  const needDirector =  to.meta.rol_director //Necesita el rol de director

  console.log(auth)
  
  if(needAuth && !auth.login){
    next('login')
  } else if(needTeacher){
    if(auth.rol === "profesor"){
      console.log("profesor")
      next()
    }else{
      next('login')
    }
  }else if(needDirector){
    if(auth.rol === "director"){
      console.log("director")
      next()
    }else{
      next('login')
    }
  } else {
    next()
  }

}) 


export default router
