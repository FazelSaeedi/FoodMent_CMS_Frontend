const axios = require('axios');

export default {
    namespaced: true,
    state: {

        subGroups   : {},

    },
    getters : {

        getsubGroups : (state) => {
            return state.subGroups
        },

    },
    actions: {

        retrivesubGroups : (context ) => {

            return new Promise((resolve , reject ) =>{
                axios.get('http://kalament.ir/api/v1.0/category/getsubgrouptable/1000' ,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res.data.data.data)
                    resolve(res.data.data.data)
                    context.commit('retrivesubGroups' , res.data.data.data)
                }).catch(err => {
                    console.log(err.Status)
                    reject(err.response.status)
                })
            })

        },


        deletesubGroup: ( context , subGroup ) => {
            return  new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/deletesubgroup' ,{
                    id    :   subGroup.id ,
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


        editsubGroup : (context , subGroup ) => {

            return new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/editsubgroup' ,{
                    id    :   subGroup.id ,
                    name  :   subGroup.name,
                    code  :   subGroup.code
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


        addsubGroup : (context , subGroup) => {

            return new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/addsubgroup' ,{
                    name  :   subGroup.name,
                    code  :   subGroup.code
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


        retrivesubGroups  : (state , subGroups) => {
            state.subGroups = subGroups
        },


        //todo : implement delete subGroup into store
        deletesubGroup : (state , subGroup) => {
            console.log(state + subGroup)
        },


        //todo : implement edit subGroup into store
        editsubGroup : (state , subGroup) => {
            console.log(state + subGroup)
        },


        //todo : implement add subGroup into store
        addsubGroup : (state , subGroup) => {
            console.log(state + subGroup)
        },
    }
}