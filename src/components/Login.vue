<template>
<div class="container">
    <div class="card"  v-bind:style="opacity">
        <div class="alert alert-danger" role="alert" v-if="error">
            <strong>{{msg}}</strong>
        </div>
        <form class="login-form">
            <div class="form-group row">
                <label for="username" class="col-3 col-form-label">Username</label>
                <div class="col-9">
                    <input class="form-control" type="text" placeholder="username" id="username" v-model="username">
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-3 col-form-label">Password</label>
                <div class="col-9">
                    <input class="form-control" type="password" placeholder="password" id="password" v-model="password">
                </div>
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="rememberme">
                <label class="form-check-label" for="rememberme">Remember me</label>
            </div>
            <button type="button" class="btn btn-primary btn-lg btn-block active" v-on:click="login(username,password)">Login</button>
            <div class="forgotpassword"><a href="">Forgot Password?</a></div> 
        </form>
    </div>
    <div id="spinner" v-if="loading">
    <spinner id="spinner-tem"></spinner>
    </div>
</div>
</template>

<script>
import user from "../stores/user"
import spinner from 'vue-loading-spinner/src/components/CubeShadow.vue'

export default {
  name: 'Login',
  data () {
    return {
      username:'',
      password:'',
      error:false,
      msg:'',
      loading:false,
      opacity:''
    }
  },
   components: {
    spinner
  },
  methods:{
    login (username,password) {
      this.loading = true
      this.opacity = 'opacity: 0.3;'
      let postdata = {'username':username,'password':password}
      let headers = {'Content-Type': 'application/json'}
      this.$http.post('https://paymyrent.herokuapp.com/api/v1/login', postdata, headers).then(response => {
          this.$localStorage.set('username', response.data.username)
          if(response.body.accountType === 'admin'){
            this.$router.push({ name: 'ANav'})
          }
          if(response.body.accountType === 'landlord'){
            this.$router.push({ name: 'LNav'})
          }
          if(response.body.accountType === 'tenant'){
                this.$router.push({name: 'TNav'})
          }
      },error => {
              this.loading = false
              this.opacity = 'opacity:1;height: 380px;'
              this.username = ''
              this.password = ''
              this.error = true
              this.msg = 'Invalid username or password'
    })
    }
  },
  created:function(){
      this.$localStorage.remove('username')
  }
}
</script>

<style>
.card{
     margin:auto;
     margin-top: 15%;
     background-color:whitesmoke;
     height: 300px;
     width: 500px;
     border-radius: 10px;
     position: relative;
}
.login-form{
    padding-top: 10%;
    padding-right: 5%;
    padding-left: 5%;
}
.btn{
      margin-top: 5%;
}

.forgotpassword{
     margin-top: 2%;
     font-size: smaller;
}
a{
  color:black;
  text-decoration: none;
}
a:hover{
  color:black;
}
#spinner{
    margin: auto;
    position: absolute;
    width: 500px;
    height: 300px;
    top: 21.8%;
    margin-left: 305px;
}
#spinner-tem{
    margin: auto;
    margin-top: 25%;
}
</style>
