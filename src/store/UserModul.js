export default {
    namespaced: true,
    state: {
        jwt   : localStorage.getItem('jwt') || null ,
    },
    getters : {
        jwt : (state) =>{
            return state.jwt
        },
    },
    actions: {

    },
    mutations: {
    }
}