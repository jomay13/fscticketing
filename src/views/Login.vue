<template>
<div class="login-page">

       <div class="container"></div>
<div class="login-box">
    <div class="card">
            <div class="card-body login-card-body">
             
                <div class="container text-center"><h4 class="brand-text font-weight-bold bg-dark border pl-2 pr-2 rounded-3">FSC-TICKETING</h4></div>
                <p v-if="errmsg" class="login-box-msg"><i class="fas fa-key mr-2"></i>Authentication failed.</p>
                <p v-else class="login-box-msg"><i class="fas fa-key mr-2"></i>Sigin in now</p>
                <form @submit.prevent="handleSubmit">

                    
                    <div class="input-group mb-3">
                        <input v-model="username" type="text" class="form-control" placeholder="Username">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"> 

                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <input  v-model="password"  type="password" class="form-control" placeholder="email">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"> 
                                    
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember" class="mr-1">
                                <label for="remember">
                                    Remember
                                </label>
                            </div>
                        </div>
                        <div class="col-4"> 
                            <button type="submit" class="btn btn-sm btn-primary btn-block"><i class="fas fa-sign-in-alt mr-2"></i>Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
    </div>
</div>
</div>
</template>

<script>
import axios from 'axios'
export default{
name : "Login",

data(){
    return{
        'uname':'',
        'password':'',
        'errmsg':'',
        userinfo:null
    };
},

mounted(){
    const tokenkuno = localStorage.getItem('token');
    if (tokenkuno != null) {
      this.$router.push('/Inbox/All');
    }else{
    }
},

methods: {
async handleSubmit(){ 
   const username = this.username;
   const password = this.password;
 

   const encoded = window.btoa(username + ":" + password );  
    
  //const encoded = "UmFscGg6UmFscGg=";
    await axios.get("https://localhost:44307/api/login",{
            headers:{
                Authorization: 'Basic ' + encoded,
            }
        }).then((response) =>{
            this.userinfo = response.data 

            localStorage.setItem('token',encoded);
            localStorage.setItem('userno', this.userinfo.userno);
            localStorage.setItem('fname', this.userinfo.fname);
            localStorage.setItem('fullname', this.userinfo.lname + ", " + this.userinfo.fname + " " + this.userinfo.maname);
            localStorage.setItem('Department', this.userinfo.department);

            this.$router.push('/Inbox/All')

            this.$store.dispatch('storename', this.userinfo.userno)
            console.log(response);

            }
        ).catch(error => this.errmsg = "Invalid credential");
      }   
   }  
}

</script>

<style>
    .login-page{
        align-items: center;
        display: flex;
        background: #ecf0f1;
        /* background-image: url('https://image.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg');
        background-repeat: no-repeat;
       */
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        height:100vh;
        -webkit-justify-content:center;
        -ms-flex-pack:center;
        justify-content: center;
    }
    .login-box{
        width: 22rem;
    }

    .input-group{
        position: relative;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-align-items:stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        width:100%
    }
    .input-group-append, .input-group-prepend{
        display: flex;
    }

    .login-box-msg{
        margin: 0;
        padding:20px 20px;
        text-align: center;
    }
</style>