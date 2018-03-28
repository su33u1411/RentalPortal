<template>
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#"><strong>PMR</strong></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active"><router-link to="/user/Tenant/Home" class="nav-link">Home</router-link><span class="sr-only">(current)</span></li>
      <li class="nav-item"><router-link to="/user/Tenant/Payments" class="nav-link">Payments</router-link></li>
      <li class="nav-item"><router-link to="/user/Tenant/Maintenance" class="nav-link">Maintenance</router-link></li>
      <li class="nav-item"><router-link to="/user/Tenant/Documents" class="nav-link">Documents</router-link></li>
      <li class="nav-item"><router-link to="/user/Tenant/Profile" class="nav-link">Profile</router-link></li>
      <li class="nav-item"><router-link to="/user/Tenant/Contact" class="nav-link">Contact</router-link></li>
    </ul>
    <div class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello , {{uname}}</a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
       <router-link to="/" class="dropdown-item" >Logout</router-link>
    </div>
    </div>
  </div>
</nav>
<router-view></router-view>
<footer class="bg-dark text-white mt-4 footer">
    <div class="container-fluid py-3">
        <div class="row text-left">
            <div class="col-4"><a>Appartment Name</a><br><a>717-743-7322</a><br><a>Visit Our Website · Help</a></div>
            <div class="col-4"><a>Payments</a><br><a>Maintenance</a><br><a>Documents</a><br><a>Profile</a><br><a>Contact</a><br><a>Help</a></div>
        </div>
        <div class="row">
            <div class="col-12 text-right small align-self-end">©2018 PMR,Inc.</div>
        </div>
    </div>
</footer>

</div>
</template>

<script>
import user from "../../stores/user"

export default {
  name: 'TNav',
  data () {
     return{
       uname:'',
     }
  },
created: function(){
      this.uname = this.$localStorage.get('username')
      if(this.uname===null){
         this.$router.push({ path: '/'})
      }
  }
}
</script>
<style>
.logout{
  margin-top:auto;
}
.nav-item{
  color: white;
}
.nav-link{
  color: white;
}
.navbar{
  height: 60px;
}
#navbarSupportedContent{
  background-color: rgb(66, 66, 66);
}
</style>
