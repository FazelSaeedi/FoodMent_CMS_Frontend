
export default {
    namespaced: true,
    state: {
        overlay   : false ,
        alerts : [

        ]
    },
    getters : {
        overlay : (state) =>{
            return state.overlay
        },

        getAlerts : (state) => {
            return state.alerts
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
        }
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
        }
    }
}