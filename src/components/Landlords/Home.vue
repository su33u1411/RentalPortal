<template>
<div>
  <br>
   <h3 class="text-left">Welcome {{uname}}</h3><hr>
    <div class="card text-left">
    <div class="card-header">
      <h5><strong>Properties List</strong></h5>
      <button type="submit" class="btn btn-sm btn-outline-primary" style="float:right;"><strong>Add Property</strong></button>
    </div>
    <div class="card-body">
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
            <td><small></small>{{row.propertyaddress.addressline1}},<br>{{row.propertyaddress.addressline2}},<br>{{row.propertyaddress.city}},<br>{{row.propertyaddress.state}}-{{row.propertyaddress.zipcode}}.</td>
            <td><button type="button" v-on:click="getUnitDetails(row.propertyID)" class="btn btn-outline-dark active btn-sm"><span class="material-icons">dashboard</span>View Details</button></td>
          </tr>
        </tbody>
    </table>
    </div>
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
#addProperty{
  float: right;
}
</style>
