import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    name:"User",
    userno :"",

    userlist:[],
  },
  mutations: {
    // getUserlisr(state, payload){
    //  state.userno = payload
    // }

    getUserlist(state, payload){
      state.userlist = payload
    }
  },
  actions: {
  //  storename(state, payload){
  //     const name = payload
  //     state.commit('storedata', payload)
  //   }

    getUserlist(state){
      axios.get('https://localhost:44307/api/Register',{headers:{Authorization: 'Basic ' + localStorage.getItem('token')}})
      .then((response) => (
        // payload = response.data
        state.commit('getUserlist',response.data)
      )); 
    }
  },
  getters:{

  },
  modules: {
  } 
})
;