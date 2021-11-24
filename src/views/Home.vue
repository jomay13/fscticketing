<template>
<Topnav v-bind:fullname="fullname" />
<section class="content-header border-bottom text-white" style="background-image: url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Welcome! {{ fname }} </h1>
    
            <ol class="breadcrumb text-white">
              <li class="breadcrumb-item">Home</li>
              <li class="breadcrumb-item">Inbox</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
<section class="content p-2" style="height:70%">
<div class="row">
  <div class="col-md-2 p-2  border-end">
    <router-link to="/Compose"  class="btn btn-sm btn-dark btn-block mb-3 rounded-4  "><i class="fas fa-plus-square mr-2"></i>Create ticket</router-link>
    <div class="card">
      <div class="card-body p-0">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item active">
            <router-link to="/Inbox/All" class="nav-link">
              <i class="fas fa-list mr-2"></i>All tickets
                <!-- <span class="badge bg-primary float-right">12</span> -->
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/Inbox/Active" class="nav-link">
              <i class="fas fa-inbox mr-2"></i>Active tickets
                <!-- <span class="badge bg-primary float-right">12</span> -->
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Inbox/Closed" class="nav-link">
              <i class="far fa-envelope mr-2"></i>Closed tickets
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Inbox/Hold" class="nav-link">
              <i class="far fa-file-alt mr-2"></i>Hold tickets
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="col-md-10 p-2">
    <router-view :key="$route.fullPath"/>
  </div>
</div>
</section>
</template>

<script>
// @ is an alias to /src
import Topnav from '@/components/Topnav.vue'

export default {
  name:"Home",
  components:{
    Topnav
  },
  data(){
  return{
    'fullname' : localStorage.getItem('fullname'),
    'fname' : localStorage.getItem('fname')
    }
  }
}
</script>


<style>

body{
  font-family: 'Segoe UI';
  font-size: 10pt;
}

</style>
