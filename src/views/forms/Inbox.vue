<template>  
<!-- {{ contents }} -->
{{ wanr }}
      <div class="container bg-white" >
        <div class="card-header">
          <h3 class="card-title">Tickets</h3>
   
          <div class="card-tools">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" placeholder="Search Mail">
              <div class="input-group-append">
                <div class="btn btn-primary">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="card-body p-0" >
          <div class="container">
              <div class="btn-group "> 
                <div class="mailbox-controls">
                  <button type="button" class="btn btn-default btn-sm checkbox-toggle"  @click='checkall()'>
                    <i class="far fa-square"></i>
                  </button>
                  <!-- <button type="button" class="btn btn-default btn-sm">
                      <i class="far fa-trash-alt"></i>
                  </button> -->
           

                  <button type="button" class="btn btn-default btn-sm">
                    <i class="fas fa-sync-alt"></i>
                  </button>
        
          </div>
                            
                <button type="button" class="btn btn-default btn-sm m-2 rounded-pill"  @click="openTickets()">Open selected</button> 
                <div v-if="wanr">error</div> 
                <button type="button" class="btn btn-default btn-sm m-2 rounded-pill" @click="closeTickets()">Close selected</button>  
                <button type="button" class="btn btn-default btn-sm m-2 rounded-pill"  @click="holdTickets()">Hold selected</button>  
              </div>
              <div class="float-right m-2">  
                 <!-- <label for="">Assigned to</label> -->
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="userassigned">
                  <option value="All" selected>Assigned to All</option>
                  <option :value="user.userno" v-for="user in  $store.state.userlist" :key="user.id">{{ user.fname + " " + user.maname + " " + user.lname }}</option>
                </select>
              </div>

        
             
              <!-- <button type="button" class="btn btn-default btn-sm">
                <i class="far fa-trash-alt"></i>
              </button> -->
              <!-- <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-reply"></i>
              </button>
              <button type="button" class="btn btn-default btn-sm">
                <i class="fas fa-share"></i>
              </button> -->
            <!-- </div> -->

            <!-- <button type="button" class="btn btn-default btn-sm">
              <i class="fas fa-sync-alt"></i>
            </button> -->
            <!-- <div class="float-right">
              1-50/200
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button type="button" class="btn btn-default btn-sm">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div> -->

          </div>
          <Suspense>
          <!-- <template #default> -->
          <div class="table-responsive mailbox-messages  overflow-auto" style="height:20rem;" v-if="contents.length">
            <table class="table table-hover">
              <thead>
                <td></td>
                <td>Ticket Status</td>
                <td>Ticket no.</td>
                <td>Subject</td>
                <td>Requested by</td>
                <td>Date</td>
                <td>Assigned to</td>
              </thead>
              <tbody >
              <tr v-for="content in contents" :key="content.id">
                <td>
                  <div class="icheck-primary">
                    <input type="checkbox" :value="content.ticketno" id="check1" v-model="chckticket" :checked="isCheckAll"> 
                    <label for="check1"></label>
                  </div>
                </td>
                <!-- :to="{ name : 'Viewticket', params:{ ticketno : content.ticketno }}" <a href="#"><i class="fas fa-star text-warning"></i></a>-->
                <td class="mailbox-star">
                  <i v-if="content.status === 'Active'" class="fas fa-star text-success mr-1"></i>
                  <i v-if="content.status === 'Closed'" class="fas fa-star text-dark mr-1"></i>
                  <i v-if="content.status === 'Hold'" class="fas fa-star text-warning mr-1"></i>
                  {{ content.status }}</td>
                <td class="mailbox-name"><router-link :to="{ name : 'Viewticket', params: { id: content.ticketno }}" ><b>{{ content.ticketno }} </b></router-link></td>
                <td class="mailbox-subject" ><router-link :to="{ name : 'Viewticket', params: { id  : content.ticketno }}" ><b>{{ content.subject }}</b></router-link></td>
                <td class="mailbox-attachment">{{ content.userno }}</td>
                <td class="mailbox-date"> {{ moment(content.datecreated).format("ddd MMM DD, YYYY [at] HH:mm a") }}</td>
                <td class="mailbox-date"> {{ content.assignedto }}</td>
              </tr>
              </tbody>
            </table>

          </div>
          <div class="table-responsive mailbox-messages  overflow-auto"  style="height:20rem;" v-else>
            <div class="container text-center mt-5">
              <span class="bg-dark p-2 rounded-3 text-center">Loading, please wait</span>
            </div>
          </div>
          <!-- </template> -->
          <!-- <template #fallback>
               <p class="text-center">Loading, please wait.</p>
          </template> -->
          </Suspense>
        </div>

        

        <div class="card-footer p-0">
    
        </div>
      </div>

     
</template>
<script>
import moment from 'moment'
import axios from "axios";
import route from 'vue-router'
import vue from 'vue'
export default{
name : "Inbox",
props:["status"],
data(){
    return{
      isCheckAll:false,
      'fullname':'',
      'department':'',
      'userassigned':'All',
      'chckticket':[],
      'dat':[],
      contents: [],
      userinfo:[],
      'route':'',
      'wanr':''
    }
  },

  methods:{

    checkall(){
      if( this.isCheckAll == false){
        this.isCheckAll = true
      }else{
        this.isCheckAll = false
      }

    },
    
    holdTickets(){
    
      // this.$route.push('/Inbox/All')
      this.dat = this.chckticket
      this.dat.forEach(function(item)  {
           axios.put('https://localhost:44307/api/PostTicket/' + item,
            {
              status: "Hold",
            },{
              headers:{Authorization: 'Basic ' + localStorage.getItem('token'),}
            }).then((response) => {          
              window.location.reload();
              console.log(response);
            });  
      });
    },
    closeTickets(){
      // this.$route.push('/Inbox/All')
      this.dat = this.chckticket
      this.dat.forEach(function(item)  {
           axios.put('https://localhost:44307/api/PostTicket/' + item,
            {
              status: "Closed",
            },{
              headers:{Authorization: 'Basic ' + localStorage.getItem('token'),}
            }).then((response) => {
              window.location.reload();  
              console.log(response);
            });  
      });
    },
    openTickets(){

      this.dat = this.chckticket
      this.dat.forEach(function(item)  {
           axios.put('https://localhost:44307/api/PostTicket/' + item,
            {
              status: "Active",
            },{
              headers:{Authorization: 'Basic ' + localStorage.getItem('token'),}
            }).then((response) => {
              window.location.reload();
              console.log(response);
            });  
      });
    }
  },
  
created(){
  this.moment = moment; 
},
  mounted(){
    // GET USING FETCH

      // fetch("https://localhost:44307/api/PostTicket")
      // .then(res => res.json())
      // .then(data => this.userinfo = data);

    const tokenkuno = localStorage.getItem('token');
    if (tokenkuno == null) {
      this.$router.push('/');
    }else{

      this.fullname = localStorage.getItem('fullname');
      this.department = localStorage.getItem('department');

      fetch("https://localhost:44307/api/PostTicket?status=" + this.$route.params.status,{
        headers : {
              Authorization: 'Basic ' + tokenkuno,
        }
      })
      // fetch("https://localhost:44307/api/PostTicket")
      .then(res => res.json())
      .then(data => this.contents = data);

      this.$store.dispatch('getUserlist')
      //  fetch("https://localhost:44307/api/GetUserInfo?userno=" + content.userno,{
      //   headers : {
      //         Authorization: 'Basic ' + tokenkuno,
      //   }
      // })
      // .then(res => res.json())
      // .then(data => this.userinfo = data);
    }
    // GET USING AXIOS
    // axios
    // .get("https://localhost:44307/api/PostTicket/?status=" + this.$route.params.status)
    // .then((response) => (this.contents = response.data))
  },


  // watch: {
  //   '$route.params.status' (to, from){
  //     this.fetch();
  //   }
  // },
} 

</script>

<style>

</style>