<template>
<div class="container">
    <div class="row" v-bind:style="fitler" id="Content">
        <div class="col-8">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active"><img class="d-block w-100 images" src="https://xoxotest.s3.amazonaws.com/Screen%20Shot%202018-12-20%20at%202.26.47%20PM.png" alt="First slide">
                          <div class="carousel-caption d-none d-md-block text-left">
                              <h5>Easy Management</h5>
                              <small>When I first brought my cat home from the humane society she was a mangy, pitiful animal. It cost a lot to adopt her: forty dollars. And then I had to buy litter, a litterbox, food, and dishes for her to eat out of. Two days after she came home with me she got taken to the pound by the animal warden. There's a leash law for cats in Fort Collins. If they're not in your yard they have to be on a leash. Anyway, my cat is my best friend. I'm glad I got her. She sleeps under the covers with me when it's cold. Sometimes she meows a lot in the middle of the night and wakes me up, though. </small>
                          </div>
                        </div>
                        <div class="carousel-item"><img class="d-block w-100 images" src="../assets/relations.jpg" alt="Second slide"></div>
                        <div class="carousel-item"><img class="d-block w-100 images" src="../assets/analytics.jpg" alt="Thrid slide"></div>
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
        <div class="col-4 card">
        <div class="logincard">
        <div class="alert alert-danger" role="alert" v-if="error">
        <strong>{{msg}}</strong>
        </div>
        <form class="text-left">
            <div class="form-group">
                <label for="username">Username</label>
                <input class="form-control" type="text" placeholder="Enter your username" id="username" v-model="username">
                <small class="form-text text-muted">Username cannot be empty</small>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input class="form-control" type="password" placeholder="Password goes here" id="password" v-model="password">
                <small class="form-text text-muted">Password cannot be empty</small>
            </div>
            <button type="button" class="btn btn-lg btn-block Loginbutton" v-on:click="login(username,password)">Login</button>
            <div class="forgotpassword"><a href="">Forgot Password?</a></div> 
        </form>
        </div>
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
    background-image: url("../assets/background.jpg");
}
#Content{
    margin-top:auto;
}
.images{
    height: 500px;
    filter: brightness(50%);
}
.logincard{
    height: 500px;
    padding-top: 25%;
}
.container{
     margin-top: 10%;
}
.Loginbutton{
    margin-top: 10%;
    color: white;
    background-color: #3498db;
}
#Content{
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
