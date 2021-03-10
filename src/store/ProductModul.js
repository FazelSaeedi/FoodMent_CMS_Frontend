const axios = require('axios');

export default {
    namespaced: true,
    state: {

        products   : {},

    },
    getters : {

        getProducts : (state) => {
            return state.products
        },

    },
    actions: {

        retriveProducts : ( context ) => {

            return new Promise((resolve , reject ) =>{
                axios.get('http://kalament.ir/api/v1.0/product/getproducttable/1000' ,{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res.data.data.data)
                    resolve(res.data.data.data)
                    context.commit('retriveProducts' , res.data.data.data)
                }).catch(err => {
                    console.log(err.Status)
                    reject(err.response.status)
                })
            })

        },


        addProduct : (context , product) => {

            return new Promise((resolve , reject ) =>{
                axios.post('http://kalament.ir/api/v1.0/product/addproduct' ,{
                    name      : product.productname,
                    type      : product.typeid,
                    maingroup : product.maingroupid,
                    subgroup  : product.subgroupid,
                    code      : product.productcode
                },{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res)
                    resolve(res)
                    context.commit('addProduct' , res.data.data.data)
                }).catch(err => {
                    console.log(err.Status)
                    reject(err)
                })
            })

        },


        editProduct : (context , product) => {

            console.log(product)
            console.log('-------------------------------ss')
            return new Promise((resolve , reject ) =>{
                axios.post('http://kalament.ir/api/v1.0/product/editproduct' ,{
                    id        : product.productid,
                    name      : product.productname,
                    type      : product.type.id,
                    maingroup : product.maingroup.id,
                    subgroup  : product.subgroup.id,
                    code      : product.productcode
                },{
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }).then(res => {
                    console.log(res)
                    resolve(res)
                    context.commit('addProduct' , res.data.data.data)
                }).catch(err => {
                    console.log(err.Status)
                    reject(err)
                })
            })

        },


        deleteProduct : (context , productId) => {

            return  new Promise((resolve , reject ) =>{
                axios.post('https://www.kalament.ir/api/v1.0/product/deleteproduct' ,{
                    id    :   productId ,
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


        retriveProducts  : (state , products) => {
            state.products = products
        },


        addProduct : (state , product) =>{
            console.log(state + product)
        },


        editProduct : (state , product) =>{
            console.log(state + product)
        },


        deleteProduct : (state , productId) => {
            console.log(state + productId)
        }

    }
}