<template>
<nav class="main-header navbar navbar-expand-md navbar-light navbar-white sticky-top">
    <div class="container-fluid">
      <a href="#" class="navbar-brand">
        <span class="brand-text font-weight-bold bg-dark border pl-2 pr-2 rounded-3">FSC-TICKETING</span>
      </a>

      <button class="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse order-3" id="navbarCollapse">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            
            <router-link to="/Inbox/All" class="nav-link">Home</router-link>
          </li>

          <li class="nav-item">
            <a href="#" class="nav-link">About</a>
          </li>

          
        </ul>
      </div>

      <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
        <div class="user-block">
          <img class="img-circle img-bordered-sm" >
          <span class="username">
            <router-link  to="/"  data-bs-toggle="modal" data-bs-target="#exampleModal" class="text-decoration-none text-secondary">{{ fullname }}</router-link >
          </span>
          <span class="description">
            <a v-on:click="beforeDestroy" href="" class="text-decoration-none">Logout</a>
          </span>
        </div>
      </ul>
    </div>
</nav>
    <!-- <Modal /> -->
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
    name : "Topnav",
    props:['fullname'],
    components : {
        Modal,
    },

    // data(){
    //   return{
        
    //   }
    // },
  methods:{
    beforeDestroy () {
      localStorage.removeItem('token');
      localStorage.removeItem('fname');
      localStorage.removeItem('userno');
      this.$router.push('/')
    }
  }
  
}

</script>

<style>

</style>
