<template>
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#"><strong>PMR</strong></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active"><a class="nav-link"><router-link to="/user/Home">Home</router-link><span class="sr-only">(current)</span></a></li>
      <li class="nav-item" v-if="admin"><a class="nav-link" href="#">Landlords</a></li>
      <li class="nav-item" v-if="admin"><a class="nav-link" href="#">Tenants</a></li>
      <li class="nav-item" v-if="admin"><a class="nav-link" href="#">Payments</a></li>
    </ul>
    <div class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello {{username}}</a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
       <a v-on:click="getProfile(username)" class="dropdown-item">Profile</a>
       <router-link to="/" class="dropdown-item" >Logout</router-link>
    </div>
    </div>
  </div>
</nav>
    <router-view class="jumbotron"></router-view>
</div>
</template>

<script>
let username = ''
let admin = ''
let landlord = ''
let tenant = ''

export default {
  name: 'Home',
  data () {
  },
  methods:{
    getProfile(uname){
            this.$router.push({ path: '/user/Profile', query: {uname: uname}})
    }
  },
  created: function(){
      this.username = this.$route.query.user.username
  }
}
</script>
<style>
#navbarDropdownMenuLink{
  color: white;
}
.jumbotron{
  margin-top: 0.5%;
}
a.router-lin{
  color: white;
  text-decoration: none;
}
a:hover{
  color: white;
  text-decoration: none;
}
</style>
