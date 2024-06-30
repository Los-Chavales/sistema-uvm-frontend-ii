import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/calendar',
      name: 'Calendario',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/admin-dsh',
      name: 'Admin-Dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/admin-dsh/profesores',
      name: 'Admin-Dashboard-profesores',
      component: () => import('../views/DashViews/Hadle_Profesor.vue')
    }
  ]
})

export default router
