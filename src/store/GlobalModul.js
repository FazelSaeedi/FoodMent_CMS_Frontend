
export default {
    namespaced: true,
    state: {
        overlay   : false ,
        alerts : [

        ],

        snackbars : [
        ]
    },
    getters : {
        overlay : (state) =>{
            return state.overlay
        },

        getAlerts : (state) => {
            return state.alerts
        },

        getSnackbar : (state) => {
            return state.snackbars
        }
    },
    actions: {
        swichOverlay  : (context) => {
            context.commit('swichOverlay')
        },

        setAlert : (context ,  { message , type }) =>{
            context.commit('setAlert' , { message , type } )
        },

        clearAlerts : (context) =>{
            context.commit('clearAlerts')
        },

        setSnackbar : (context ,  { message , color }) =>{
            context.commit('setSnackbar' , { message , color } )
        },
    },
    mutations: {
        swichOverlay  : (state) => {
            state.overlay = !state.overlay
        },

        setAlert : (state , { message , type }) =>{
            state.alerts.push({ message , type })
        },

        clearAlerts : (state) =>{
            state.alerts = []
        },

        setSnackbar : (state , { message , color }) =>{
            state.snackbars.push({ message , color })
        },
    }
}