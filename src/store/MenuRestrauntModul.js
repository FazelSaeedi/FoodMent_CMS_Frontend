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
                axios.get('http://kalament.ir/api/v1.0/menu/getmenutable/'+restrauntId+'/1000' ,{
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


        deleteMenuProduct : (context , menuProductId) => {

            return  new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/menu/deletemenuproduct' ,{
                    id    :   menuProductId ,
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

        retriveMenuRestraunt : (state , restrauntId) => {
            console.log(state + restrauntId)
        },


        deleteMenuProduct : (state , menuProductId) => {
            console.log(state + menuProductId)
        }

    }
}