<template>
<div class="container-fluid">

    <div class="row" v-bind:style="fitler" id="Content">
       
        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active"><img class="d-block w-100 images" src="../assets/House.jpg" alt="First slide">
                          <div class="carousel-caption d-none d-md-block text-left">
                              <h5>Easy Management</h5>
                              <p>Login and pay ur Rent</p>
                          </div>
                        </div>
                        <div class="carousel-item"><img class="d-block w-100 images" src="../assets/House.jpg" alt="First slide"></div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
            </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 logincard card">
        <div class="alert alert-danger" role="alert" v-if="error">
        <strong>{{msg}}</strong>
        </div>
        <form>
            <div class="form-group">
                <label for="username" class="bmd-label-floating"></label>
                <input class="form-control" type="text" placeholder="username" id="username" v-model="username">
            </div>
            <div class="form-group">
                <label for="password" class="bmd-label-floating"></label>
                <input class="form-control" type="password" placeholder="password" id="password" v-model="password">
            </div>
            <button type="button" class="btn btn-lg btn-block Loginbutton" v-on:click="login(username,password)">Login</button>
            <div class="forgotpassword"><a href="">Forgot Password?</a></div> 
        </form>
        </div>
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
      fitler:'',
      loading:false
    }
  },
   components: {
    spinner
  },
  methods:{
    login (username,password) {
      this.loading = true
      this.fitler = 'filter:blur(5px);'
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
              this.fitler = ''
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
body{
    background: #232526;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#Content{
    margin-right: 5%;
    margin-left: 5%;
}
.images{
    filter: brightness(50%);
}
.logincard{
    background-color: #ecf3f3;
    height: 485px;
    box-shadow: 0 8px 6px -6px black;
    padding-top:100px;
}
.Loginbutton{
    margin-top: 10%;
    color: white;
    background-color: #3498db;
}
.row{
    margin-top:10%;
}
.forgotpassword{
     margin-top: 5%;
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
