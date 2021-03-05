const axios = require('axios');

export default {
    namespaced: true,
    state: {

        restraunts : {}

    },
    getters : {

        getRestraunts: (state) => {
            return state.restraunts
        },

    },
    actions: {

        retriveRestraunts : ( context ) => {

            return new Promise((resolve , reject ) =>{
                axios.get('http://kalament.ir/api/v1/restraunt/getrestraunttable/1000' ,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res.data.data.data)
                    resolve(res.data.data.data)
                    context.commit('retriveRestraunts' , res.data.data.data)
                }).catch(err => {
                    console.log(err.Status)
                    reject(err.response.status)
                })
            })

        },



        deleteRestraunt : (context , restrauntId) => {

            return  new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1/restraunt/deleterestraunt' ,{
                    id    :   restrauntId ,
                },{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res)
                    resolve(res)
                }).catch(err => {
                    console.log(err.response)
                    reject(err)
                })
            })
        },

    },
    mutations: {

        retriveRestraunts  : (state , restraunts) => {
            state.restraunts = restraunts
        },


        deleteRestraunt : (state , restrauntId) => {
            console.log(state + restrauntId)
        }

    }
}

