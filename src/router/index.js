import Vue from 'vue'
import VueRouter from 'vue-router'
import Authenticate from "@/views/Fraims/AuthenticateFraim";
import CMSFraim from "@/views/Fraims/CMSFraim";
import TypeFraim from "@/views/Fraims/CMSFraims/TypeFraim";
import MainGroupFraim from "@/views/Fraims/CMSFraims/MainGroupFraim";
import SubGroupFraim from "@/views/Fraims/CMSFraims/SubGroupFraim";
import ProductFraim from "@/views/Fraims/CMSFraims/ProductFraim";
import RestrauntFraim from "@/views/Fraims/CMSFraims/RestrauntFraim";
import MenuRestraunt from "@/views/Fraims/CMSFraims/MenuRestraunt";
//import NewMenuRestraunt from "@/views/Fraims/CMSFraims/NewMenuRestraunt";

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
            },
            {
                path: 'mainGroup',
                name: 'MainGroupFraim',
                component: MainGroupFraim
            },
            {
                path: 'subGroup',
                name: 'SubGroupFraim',
                component: SubGroupFraim
            },
            {
                path: 'product',
                name: 'ProductFraim',
                component: ProductFraim
            },
            {
                path: 'restraunt',
                name: 'RestrauntFraim',
                component: RestrauntFraim
            },
            {
                path: 'restraunt/menu/:id',
                name: 'MenuRestraunt',
                component: MenuRestraunt
            }

        ]

    },
]

const router = new VueRouter({
  mode: 'history',
  base: '/dist/',
  routes
})

export default router
