const axios = require('axios');

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

        retriveToken :  (context , credentials) => {

            return new Promise((resolve , reject ) =>{
                axios.post('http://kalament.ir/api/v1/user/login' ,{
                    phone: credentials.phone,
                    password: credentials.password
                },{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                    }

                }).then(res => {
                    const JWT = res.data.data.token
                    console.log(JWT)

                    localStorage.setItem('jwt' , JWT)
                    context.commit('retriveToken' , JWT)
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })

        },

        destroyToken  : (context) => {
            localStorage.removeItem('jwt' )
            context.commit('destroyToken')
        },
    },
    mutations: {

        retriveToken  : (state , token ) => {
            state.jwt = token
        },

        destroyToken  : (state) => {
            state.jwt = null
        },

    }
}