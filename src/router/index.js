import Vue from 'vue'
import VueRouter from 'vue-router'
import Authenticate from "@/views/Fraims/AuthenticateFraim";
import CMSFraim from "@/views/Fraims/CMSFraim";
import TypeFraim from "@/views/Fraims/CMSFraims/TypeFraim";



Vue.use(VueRouter)

const routes = [

    {
      path: '/',
      redirect : '/auth'
    },
    {
      path: '/auth',
      name: 'Authenticate',
      component: Authenticate,
    },
    {
        path: '/Panel',
        name: 'Panel',
        component: CMSFraim,
        redirect: '/Panel/type',
        children : [
            {
                path: 'type',
                name: 'type',
                component: TypeFraim
            }
        ]

    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
