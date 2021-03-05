const axios = require('axios');

export default {
    namespaced: true,
    state: {
        jwt   : localStorage.getItem('jwt') || null ,

        userPhone : null,

        usersTable : {}
    },
    getters : {

        jwt : (state) =>{
            return state.jwt
        },

        getUserPhone: (state) => {
            return state.userPhone
        },

        getUsersTable : (state) => {
            return state.usersTable
        }
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
                    },timeout : 4000

                }).then(res => {
                    const JWT = res.data.data.token
                    console.log(JWT)

                    localStorage.setItem('jwt' , JWT)
                    context.commit('retriveToken' , JWT)
                    resolve(res)
                }).catch(err => {
                    if (err == 'Error: Network Error'){
                        reject(err)
                    }else{
                        context.commit('destroyToken')
                        reject(false)
                    }
                })
            })

        },

        destroyToken  : (context) => {
            localStorage.removeItem('jwt' )
            context.commit('destroyToken')
        },

        checkUserLogin : (context) => {

            return new Promise((resolve , reject ) =>{
                axios.post('http://kalament.ir/api/v1/user/getuserinfo' ,{},{
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        },timeout : 4000
                }
                ).then(res => {
                    console.log(res)
                    resolve(true)
                }).catch(err => {
                    console.log('-----------')
                    if (err == 'Error: Network Error'){
                        reject(err)
                    }else{
                        context.commit('destroyToken')
                        reject(false)
                    }

                })
            })
        },

        setUserPhone : (context , userPhone ) => {
            context.commit('setUserPhone' , userPhone)
        },

        retriveUsersTable : ( context ) => {


            return new Promise((resolve , reject ) => {
                axios.get('http://kalament.ir/api/v1/user/getusers' ,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    },timeout : 4000
                  },
                ).then(res => {
                    console.log(res)
                    context.commit('retriveUsersTable' , res)
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })

        }

    },
    mutations: {

        retriveToken  : (state , token ) => {
            state.jwt = token
        },


        destroyToken  : (state) => {
            state.jwt = null
        },


        setUserPhone  : (state , userPhone) => {
            state.userPhone = userPhone
        },


        retriveUsersTable  : (state , usersTable) => {
            state.userPhone = usersTable
        },


    }
}