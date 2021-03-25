const axios = require('axios');

export default {
    namespaced: true,
    state: {

        types   : {},

    },
    getters : {

        getTypes : (state) => {
            return state.types
        },

    },
    actions: {

        retriveTypes : (context ) => {

            return new Promise((resolve , reject ) =>{
                axios.get('https://kalament.ir/api/v1.0/category/gettypestable/1000' ,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res.data.data.data)
                    resolve(res.data.data.data)
                    context.commit('retriveTypes' , res.data.data.data)
                }).catch(err => {
                    console.log(err.Status)
                    reject(err.response.status)
                })
            })

        },


        deleteType: ( context , type ) => {
            return  new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/deletetype' ,{
                    id    :   type.id ,
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


        editType : (context , type ) => {

            return new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/edittype' ,{
                    id    :   type.id ,
                    name  :   type.name,
                    code  :   type.code
                },{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                    .then(res => {
                    console.log(res)
                    resolve(res)
                })
                    .catch(err => {
                    console.log(err.response)
                    reject(err)
                })
            })
        },


        addType : (context , type) => {

            return new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/addtype' ,{
                    name  :   type.name,
                    code  :   type.code
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
        }
    },
    mutations: {


        retriveTypes  : (state , types) => {
            state.types = types
        },


        //todo : implement delete type into store
        deleteType : (state , type) => {
            console.log(state + type)
        },


        //todo : implement edit type into store
        editType : (state , type) => {
            console.log(state + type)
        },


        //todo : implement add type into store
        addType : (state , type) => {
            console.log(state + type)
        },
    }
}