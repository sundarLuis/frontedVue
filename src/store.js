import Vue from "vue"
import Vuex from "vuex"
import { async } from "q";
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    postCategories:[],
    putCategories:[],
    deleteCategories:[]
  },
  mutations: {
    fillCategories(state, res) {
      state.categories = res;
    },
    PostCategories(state,res){
       state.postCategories = res
    },
    PutCategories(state,res){
      state.putCategories = res
   },
   DeleteCategories(state,res){
    state.deleteCategories = res
 }
  },
  actions: {
    getCategory: async function (context) {
      await axios.get('http://localhost/LARAVEL/api_sundar/public/api/category').then((response) => {
      const res = response.data  
      context.commit('fillCategories', res);
      });
    },
    postCategory: async function ( context,params) {
      const getParams = {name_category:params} 
      await axios.post('http://localhost/LARAVEL/api_sundar/public/api/category', getParams).then((response) => {
      const res = response.data
      context.commit('PostCategories',res);
      });
    },
    putCategory: async function ( context, params) {
      await axios.put(`http://localhost/LARAVEL/api_sundar/public/api/category/${params.id}` , {name_category:params.name} ).then((response) => {
      const res = response.data
      context.commit('PutCategories',res);
      });
    },
    deleteCategory: async function ( context, params) {
      await axios.delete(`http://localhost/LARAVEL/api_sundar/public/api/category/${params.id}`).then((response) => {
      const res = response.data
      context.commit('DeleteCategories',res);
      });
    }

  }
})
