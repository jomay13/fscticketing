<template>
<div class="modal fade" id="modalReply" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog">
    <div class="modal-content" v-if="content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ticket no: {{ content.ticketno }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="sendReply">
        <div class="card-body">
             <div class="form-group">
                <label for="">Status</label>
                <select class="form-select" v-model="status">
                  <option value="Active" v-if="content.status === 'Active'" selected>Active</option>
                  <option value="Active" v-else>Active</option>
                  <option value="Closed" v-if="content.status ==='Closed'" selected>Closed</option>
                  <option value="Closed" v-else>Closed</option>
                  <option value="Hold" v-if="content.status === 'Hold'" selected>Hold</option>
                  <option value="Hold" v-else>Hold</option>
                </select>
            </div> 

            <div class="form-group">
              <label for="">Subject</label>
              <input class="form-control" :value="content.subject" readonly/> 
            </div>
            
            <div class="form-group">
                <textarea v-model="body" id="compose-textarea" class="form-control" style="height: 100px; display: block;" placeholder="Enter your reply here.."></textarea>
            </div>

            <div class="form-group">
                <div class="btn btn-sm btn-default btn-file">
                    <i class="fas fa-paperclip"></i> Attachment
                    <input type="file" name="attachment">
                </div>
                  <!-- <p class="help-block">Max. 32MB</p> -->
            </div>
        </div>
          
        <div class="card-footer">
            <div class="float-right">
                <button type="button" class="btn btn-sm btn-dark mr-1"><i class="fas fa-pencil-alt"></i> Draft</button>
                <button type="submit" class="btn btn-sm btn-dark"><i class="far fa-envelope"></i> Send</button>
            </div>
                <button type="reset" class="btn btn-sm btn-default"><i class="fas fa-times"></i> Discard</button>
        </div>
        </form>
    </div>
     </div>
    </div>
 </div>
</template>

<script>
import axios from 'axios'
import router from 'vue-router';

export default {
name : "Reply",
props:['content'],

 data(){
   return{ 
     'ticketno':'',
     'refno':'',
     'subject':'',
     'userid':'',
     'body':'',
     'department':'',
     'status':''

   };
 },
 methods : {
   sendReply() {
     axios.post('https://localhost:44307/api/Reply',
     {
       ticketno: this.content.ticketno,
       refno: this.refno,
       subject: this.content.subject,
       userno:  localStorage.getItem('userno'),
       body: this.body,
       department: this.department,
       datecreated: this.getNow(),
       dateupdated: this.getNow(),  
     },{headers:{Authorization: 'Basic ' + localStorage.getItem('token'),}})
     .then((response) => {
       //window.location.reload();
       console.log(response);
          axios.put('https://localhost:44307/api/PostTicket/' + this.content.ticketno,
            {
              status: this.status,
            },{
              headers:{Authorization: 'Basic ' + localStorage.getItem('token'),}
            }).then((response) => {
              window.location.reload();
              console.log(response);
            });
     });
   },

   UpdateTicket() {
  
   },
   
  getNow: function() {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date +' '+ time;
    return dateTime;
  },
 },
};
</script>
