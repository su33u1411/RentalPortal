<template>
<div class="container">
 <div class="PropertiesTable text-left">
 <h5 class="label"><strong>Properties List:</strong><span><hr><a href="#" class="btn btn-sm btn-outline-primary" id="addProperty"><strong>add property</strong></a></span></h5>
<table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Property Name</th>
      <th scope="col">Property Address</th>
      <th scope="col">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(row,index) in properties" v-bind:key="index">
      <th scope="row">{{index+1}}</th>
      <td>{{row.propertyname}}</td>
      <td>{{row.propertyaddress.addressline1}},<br>{{row.propertyaddress.addressline2}},<br>{{row.propertyaddress.city}},<br>{{row.propertyaddress.state}}-{{row.propertyaddress.zipcode}}.</td>
      <td><button type="button" class="btn btn-link" v-on:click="getUnitDetails(row.propertyID)">Show Details</button></td>
    </tr>
  </tbody>
</table>
</div>
<div id="spinner" v-if="loading">
    <spinner id="spinner-tem"></spinner>
</div>
</div>
</template>
<script>
import user from "../../stores/user"
import spinner from 'vue-loading-spinner/src/components/CubeShadow.vue'

export default {
  name: 'THome',
  data () {
     return{
       uname:'',
       properties:''
     }
  },
  components: {
    spinner
  },
methods:{
  getPropetiesList(){
      this.loading = true
      this.opacity = 'opacity: 0.3;'
      let postdata = {'username':this.uname}
      let headers = {'Content-Type': 'application/json'}
      this.$http.post('https://paymyrent.herokuapp.com/api/v1/getUserdetails', postdata, headers).then(response => {
       this.firstname = response.body.firstname
       this.middlename = response.body.middlename
       this.lastname = response.body.lastname
       this.Paddress1 = response.body.physicaladdress.addressline1
       this.Paddress2 = response.body.physicaladdress.addressline2
       this.Pcity = response.body.physicaladdress.city
       this.Pstate = response.body.physicaladdress.state
       this.Pzip = response.body.physicaladdress.zipcode
       this.Maddress1 = response.body.maillingaddress.addressline1
       this.Maddress2 = response.body.maillingaddress.addressline1
       this.Mcity = response.body.maillingaddress.city
       this.Mstate = response.body.maillingaddress.state
       this.Mzip = response.body.maillingaddress.zipcode
       this.email = response.body.email
       this.cphone = response.body.mobilephone
       this.hphone = response.body.homephone
       this.properties = response.body.Properties
       this.loading = false
       this.opacity = 'opacity: 1.0;'
      },error => {})
     },
     getUnitDetails(propertyID){
        this.$router.push({ path: '/user/Landlord/Fulldetails',query:{data:propertyID}})
     } 
},
created: function(){
      this.uname = this.$localStorage.get('username')
      if(this.uname===null){
         this.$router.push({ path: '/'})
      }else{
        this.getPropetiesList()
      }
  }
}
</script>
<style>
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
.PropertiesTable{
    margin-bottom: 100px;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
}
#addProperty{
  float: right;
}
</style>
