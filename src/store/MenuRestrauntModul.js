const axios = require('axios');

export default {
    namespaced: true,
    state: {

        menuRestraun : {}

    },
    getters : {

       getMenuRestraunt (){
           return this.state.menuRestraun
       }

    },
    actions: {


        retriveMenuRestraunt : ( context , restrauntId) => {

            return new Promise((resolve , reject ) =>{
                axios.get('http://kalament.ir/api/v1/menu/getmenutable/'+restrauntId+'/1000' ,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res.data.data.data)
                    resolve(res.data.data.data)
                    context.commit('retriveMenuRestraunt' , res.data.data.data)
                }).catch(err => {
                    console.log(err.Status)
                    reject(err)
                })
            })

        },

    },
    mutations: {

        retriveMenuRestraunt : (state , restrauntId) => {
            console.log(state + restrauntId)
        }

    }
}