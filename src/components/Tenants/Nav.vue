<template>
<div class="container-fluid">
  <div class="row" id="header">
  <nav class=" col navbar navbar-dark bg-dark">
     <a class="navbar-brand" href="#">PMR</a>
  </nav>
  </div>
  <div class="row" id="middleSection">
    <div class="col-2" id="Menu">
      <ul class="list-group">
        <li class="list-group-item"><router-link to="/user/Tenant/Home" class="link">Home</router-link></li>
        <li class="list-group-item"><router-link to="/user/Tenant/Payments" class="link">Payments</router-link></li>
        <li class="list-group-item"><router-link to="/user/Tenant/Maintenance" class="link">Maintenance</router-link></li>
        <li class="list-group-item"><router-link to="/user/Tenant/Documents" class="link">Documents</router-link></li>
        <li class="list-group-item"><router-link to="/user/Tenant/Profile" class="link">Profile</router-link></li>
        <li class="list-group-item"><router-link to="/user/Tenant/Contact" class="link">Contact</router-link></li>
        <li class="list-group-item"><router-link to="/" class="link">Logout</router-link></li>
      </ul>
   </div>
   <div class="col-8" id="Routerview">
      <router-view></router-view>
   </div>
  </div>
 <div class="row">
   <nav class="col navbar navbar-dark bg-dark" id="footer">
  <a class="navbar-brand" href="#">Fixed bottom</a>
  </nav>
 </div>
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
.link{
  color:white;
}
.link:hover{
  color: whitesmoke;
}
#Menu{
  background-color: rgb(66, 66, 66);
  max-height: 100%;
}
#Routerview{
  margin-bottom: 10%;
  margin-top: 2%;
  margin-left: 2%;
}
#footer{
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
