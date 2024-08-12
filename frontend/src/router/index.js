import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PathNotFound from '@/views/PathNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireLogin: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        requireLogin: false,
      }
    },
    {
      path: '/calendario',
      name: 'CalendarioPublico',
      component: () => import('../views/EventsViewPublic.vue')
    },
    {
      path: '/admin-dsh/calendario',
      name: 'Calendario',
      component: () => import('../views/EventsView.vue'),
      meta: {
        requireLogin: true,
        rol_teacher: false,
        rol_director: true,
      }
    },
    {
      path: '/admin-dsh/fechas',
      name: 'Fechas',
      component: () => import('../views/DashViews/Handle_Dates.vue'),
      meta: {
        requireLogin: true,
        rol_teacher: false,
        rol_director: true,
      }
    },
    {
      path: '/admin-dsh/planificaciones',
      name: 'Planificaciones',
      component: () => import('../views/PlanningView.vue'),
      meta: {
        requireLogin: true,
        rol_teacher: true,
        rol_director: false,
      }
    },
    {
      path: '/admin-dsh',
      name: 'Admin-Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        requireLogin: true,
        rol_teacher: false,
        rol_director: false,
      }
    },
    {
      path: '/admin-dsh/profesores',
      name: 'Admin-Dashboard-profesores',
      component: () => import('../views/DashViews/Hadle_Profesor.vue'),
      meta: {
        requireLogin: true,
        rol_teacher: false,
        rol_director: true,
      }
    },
    {
      path: '/admin-dsh/materias',
      name: 'Admin-Dashboard-Materias',
      component: () => import('../views/DashViews/Handle_Subject.vue'),
      meta: {
        requireLogin: true,
        rol_teacher: false,
        rol_director: true,
      }
    },
    {
      path: '/admin-dsh/secciones',
      name: 'Admin-Dashboard-Secciones',
      component: () => import('../views/DashViews/Handle_section.vue'),
      meta: {
        requireLogin: true,
        rol_teacher: false,
        rol_director: true,
      }
    },
    {
      path: '/admin-dsh/horarios',
      name: 'Admin-Dashboard-Horarios',
      component: () => import('../views/DashViews/Handle_Horario.vue'),
      meta: {
        requireLogin: true,
        rol_teacher: false,
        rol_director: true,
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: PathNotFound,
      meta: {
        requireLogin: false,
      }
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
  if (cookie !== null) {
    console.log("cookie en las rutas")
    console.log(cookie)
    auth.login = true;
    auth.rol = cookie.rol_usuario
  } else {
    console.log("no hay cookies")
  }

  const needAuth = to.meta.requireLogin //Necesita autorización
  const needTeacher = to.meta.rol_teacher //Necesita el rol de profesor
  const needDirector = to.meta.rol_director //Necesita el rol de director

  console.log(auth)

  if (needAuth && !auth.login) {
    next('/login')
  } else if (needTeacher) {
    if (auth.rol === "profesor") {
      console.log("profesor")
      next()
    } else {
      next('/login')
    }
  } else if (needDirector) {
    if (auth.rol === "director") {
      console.log("director")
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }

})


export default router
