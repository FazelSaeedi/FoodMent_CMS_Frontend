
export default {
    namespaced: true,
    state: {
        overlay   : false ,
    },
    getters : {
        overlay : (state) =>{
            return state.overlay
        },
    },
    actions: {
        swichOverlay  : (context) => {
            context.commit('swichOverlay')
        },
    },
    mutations: {
        swichOverlay  : (state) => {
            state.overlay = !state.overlay
        },
    }
}