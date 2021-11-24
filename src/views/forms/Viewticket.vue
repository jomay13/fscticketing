<template>
<div class="container">
  <div class="card-header"  v-if="content">
    <h3 class="card-title">Ticket no : {{ content.ticketno }}</h3>

    <div class="card-tools">
      <a href="#" class="btn btn-tool" title="Previous"><i class="fas fa-chevron-left"></i></a>
      <a href="#" class="btn btn-tool" title="Next"><i class="fas fa-chevron-right"></i></a>
    </div>
  </div>

<Suspense>
  <div class="cotainer overflow-auto" style="height:28rem;" v-if="content">
    <div class="card-body p-3" >
      <ul class="order-1 order-md-1 navbar-nav navbar-no-expand ml-auto  mb-2">
        <div class="container border-bottom">
          <div class="user-block">
            <img class="img-circle img-bordered-sm" >
              <span class="username">
                <!-- <span class="text-decoration-none text-secondary">Ralph Recio</span> -->
                <router-link  to="#" class="text-decoration-none text-dark">User : {{ content.userno }}</router-link><br>
                <span class="text-decoration-none text-secondary text-sm">Subject : {{ content.subject }}</span><br>
                <!-- <span class="text-decoration-none text-secondary text-sm">From : {{ content.department }}</span><br> -->
              </span>
          </div>
            <span class="mailbox-read-time float-right"  v-if="content"> {{ content.datecreated }}</span>
            <span class="mailbox-read-time float-right mr-2"  v-if="content"> {{ content.status }}</span>

        </div>
      </ul>
      <div class="mailbox-read-message" style="font-size:12pt;">
        <div style="height:200px;max-height:200px" readonly>
        <!-- <textarea class="form-control" style="height:200px;max-height:200px" readonly> -->
              {{ content.body }}
        <!-- </textarea>    -->
        </div>
      </div>
    </div>
    <!-- /.card-footer -->
    <div class="card-footer">
    <div class="float-right">
        <button type="button" class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#modalReply"><i class="fas fa-reply"></i> Reply</button>
        <button type="button" class="btn btn-sm btn-dark ml-2"><i class="fas fa-share"></i> Forward</button>
    </div>
    </div>
    <!-- /.card-footer -->

    <!-- THIS OF REPLIES -->
    <div class="container border-1 border-top p-3"  > 
      <div class="card-body p-3"  v-for="contentReply in contentReplies" :key="contentReply.id">
          <ul class="order-1 order-md-1 navbar-nav navbar-no-expand ml-auto  mb-2">
            <div class="container border-bottom">
              <div class="user-block">
                <img class="img-circle img-bordered-sm" >
                  <span class="username">
                    <!-- <span class="text-decoration-none text-secondary">Ralph Recio</span> -->
                    <router-link  to="#" class="text-decoration-none text-dark">User : {{ contentReply.userno }}</router-link><br>
                    <span class="text-decoration-none text-secondary text-sm">Subject : {{ contentReply.subject }}</span><br>
                    <!-- <span class="text-decoration-none text-secondary text-sm">From : {{ content.department }}</span><br> -->
                  </span>
              </div>
                <span class="mailbox-read-time float-right"  v-if="content"> {{ contentReply.datecreated }}</span>
                <span class="mailbox-read-time float-right mr-2"  v-if="content"> {{ content.status }}</span>

            </div>
          </ul>
        <div class="mailbox-read-message" style="font-size:12pt;">
          <div style="height:200px;max-height:200px" readonly>
          <!-- <textarea class="form-control" style="height:200px;max-height:200px" readonly> -->
                {{ contentReply.body }}
          <!-- </textarea>    -->
          </div>
        </div>

        <div class="float-right">
            <button type="button" class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#modalReply"><i class="fas fa-reply"></i> Reply</button>
            <button type="button" class="btn btn-sm btn-dark ml-2"><i class="fas fa-share"></i> Forward</button>
        </div>
      </div>
      <div class="card-footer" >
      
      </div>
    </div>
  </div> 
              
    <div class="container" style="height:28rem;"  v-else>
      <div class="card-body p-3" >
        <div class="container text-center mt-5">
        <span class="bg-dark p-2 rounded-3 text-center" > Loading, please wait..</span>
        </div>

      </div>
    </div>
  </Suspense>
</div>

<Reply v-bind:content="content" />
</template>
<script>
import router from 'vue-router'
import axios from "axios"

import Reply from '@/views/forms/Reply.vue'
export default {
  name:"Viewticket",
  props:['id'],
  //props:['ticketno'],
  components : {
    Reply
  },

  data(){
    return{
      content:null,
      contentReplies:null
    }
  },

  mounted(){

    const tokenkuno = localStorage.getItem('token');
    if (tokenkuno == null) {
      this.$router.push('/');
    }else{

      
    //TO GET THE LIST OF USERS
    // fetch("https://localhost:44307/api/GetUserInfo/" + this.id,
    //   {headers:{Authorization: 'Basic ' + tokenkuno,}})
    //   .then(res => res.json())
    //   .then(data => {this.content = data})
    //   .catch((err) => {console.log("Anu!"+err.message)})

    //TO GET THE LIST OF POSTED TICKETS
    fetch("https://localhost:44307/api/PostTicket/" + this.id,
      {headers:{Authorization: 'Basic ' + tokenkuno,}})
      .then(res => res.json())
      .then(data => {this.content = data})
      .catch((err) => {console.log("Anu!"+err.message)})

    //TO GET THE LIST OF REPLIES ON POSTED TICKETS
    fetch("https://localhost:44307/api/Reply/" + this.id,
        {headers:{Authorization: 'Basic ' + tokenkuno,}})
        .then(res => res.json())
        .then(data => this.contentReplies = data)
        .catch((err) => {console.log("Anu!"+err.message)})
    }
  }
}
</script>
