import Vue from 'vue'
import VueRouter from 'vue-router'
import Authenticate from "@/views/Fraims/AuthenticateFraim";


Vue.use(VueRouter)

const routes = [

    {
      path: '/',
      redirect : '/auth'
    },
    {
      path: '/auth',
      name: 'AuthFraim',
      component: Authenticate,
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
