<template>
    <div class="container">
              <div class="card-header">
                <h3 class="card-title">Create new ticket</h3>
              </div>

            <form @submit.prevent="sendTicket">

              <!-- /.card-header -->

              <div class="card-body">
                
                <div class="form-group">
                  <label for="">Assigned to :</label>
                  <select class="form-select" v-model="assignedto" required>
                    <option :value="userlist.userno"  v-for="userlist in userslist" :key="userlist.id" >{{ userlist.fname }} {{ userlist.lname }}</option>
                  </select>
                </div> 


                <div class="form-group">
                  <label for="">Subject :</label>
                  <input v-model="subject" class="form-control" placeholder="Subject" required>
                </div>

                <div class="form-group">

                  <textarea v-model="body" id="compose-textarea" class="form-control" style="height: 100px; display: block;" placeholder="Body" required>

                  </textarea>
                </div>

                <div class="form-group">
                  <div class="btn btn-default btn-file">
                    <i class="fas fa-paperclip"></i>
                    <input type="file" name="attachment">
                  </div>
                  <!--<p class="help-block">Max. 32MB</p>-->
                </div>
                <div class="container">
                  <img src="" alt="">
                </div>
              </div>

              <!--/.card-body-->

              <div class= "card-footer">
                <div class="float-right">
                  <button type="button" class="btn btn-sm btn-dark mr-2"><i class="fas fa-pencil-alt"></i> Draft</button>
                  <button type="submit" class="btn btn-sm btn-dark"><i class="far fa-envelope"></i> Send</button>
                </div>
                <button type="reset" class="btn btn-sm btn-default"><i class="fas fa-times"></i> Discard</button>
              </div>

              </form>

              <!-- /.card-footer -->

            </div>
</template>

<script>
import axios from 'axios'
import router from 'vue-router';

export default {
 data(){
   return{
     'assignedto':'',
     'ticketno':'',
     'refno':'',
     'subject':'',
     'userno':'',
     'body':'',
     'department':'',
     'status':'Active',

      userslist: []
   };
 },


 mounted(){
   
      axios.get('https://localhost:44307/api/Register',{
        headers:{
          Authorization: 'Basic ' + localStorage.getItem('token')
        }
      })
      .then((response) => (this.userslist = response.data));  
     },


 methods : {
   sendTicket() {
     //const usernmae = this.assignedto
     axios.post('https://localhost:44307/api/PostTicket',
     {
       assignedto: this.assignedto,
       ticketno: this.randomNumber(),
       refno: this.refno,
       subject: this.subject,
       userno: localStorage.getItem('userno'),
       body: this.body,
       department: localStorage.getItem('department'),
       datecreated: this.getNow(),
       status: this.status,
     },
     {
       headers:{Authorization: 'Basic ' + localStorage.getItem('token')}
     }
     
     ).then((response) => {
       this.$router.push('/Inbox/All')
       console.log(response);
     });  
   },

  getNow: function() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date +' '+ time;
    return dateTime;
  },


  randomNumber: function () {
      return Math.floor(Math.random() * (100000 - 1 + 1)) + 1
    }
   
 },
};
</script>




















































