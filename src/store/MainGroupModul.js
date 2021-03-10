const axios = require('axios');

export default {
    namespaced: true,
    state: {

        mainGroups   : {},

    },
    getters : {

        getmainGroups : (state) => {
            return state.mainGroups
        },

    },
    actions: {

        retrivemainGroups : (context ) => {

            return new Promise((resolve , reject ) =>{
                axios.get('http://kalament.ir/api/v1.0/category/getmaingrouptable/1000' ,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res.data.data.data)
                    resolve(res.data.data.data)
                    context.commit('retrivemainGroups' , res.data.data.data)
                }).catch(err => {
                    console.log(err.Status)
                    reject(err.response.status)
                })
            })

        },


        deletemainGroup: ( context , mainGroup ) => {
            return  new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/deletemaingroup' ,{
                    id    :   mainGroup.id ,
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


        editmainGroup : (context , mainGroup ) => {

            return new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/editmaingroup' ,{
                    id    :   mainGroup.id ,
                    name  :   mainGroup.name,
                    code  :   mainGroup.code
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


        addmainGroup : (context , mainGroup) => {

            return new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/category/addmaingroup' ,{
                    name  :   mainGroup.name,
                    code  :   mainGroup.code
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


        retrivemainGroups  : (state , mainGroups) => {
            state.mainGroups = mainGroups
        },


        //todo : implement delete mainGroup into store
        deletemainGroup : (state , mainGroup) => {
            console.log(state + mainGroup)
        },


        //todo : implement edit mainGroup into store
        editmainGroup : (state , mainGroup) => {
            console.log(state + mainGroup)
        },


        //todo : implement add mainGroup into store
        addmainGroup : (state , mainGroup) => {
            console.log(state + mainGroup)
        },
    }
}