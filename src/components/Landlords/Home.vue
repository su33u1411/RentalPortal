<template>
<div>
  <br>
   <h3 class="text-left">Welcome {{uname}}</h3><hr>
    <div class="col-12 card text-left">
    <div class="card-header">
      <h5><strong>Properties List</strong></h5>
      <button type="submit" class="btn btn-sm btn-outline-primary" style="float:right;" data-toggle="modal" data-target=".bd-example-modal-lg"><strong>Add Property</strong></button>
      <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content jumbotron">
            <h3>Create property</h3>
            <small>When I first brought my cat home from the humane society she was a mangy, pitiful animal. It cost a lot to adopt her: forty dollars. And then I had to buy litter, a litterbox, food, and dishes for her to eat out of. Two days after she came home with me she got taken to the pound by the animal warden. There's a leash law for cats in Fort Collins. If they're not in your yard they have to be on a leash. Anyway, my cat is my best friend. I'm glad I got her. She sleeps under the covers with me when it's cold. Sometimes she meows a lot in the middle of the night and wakes me up, though. </small>
            <hr>
            <form>
              <div class="form-row">
                <div class="form-group col-6">
                  <label for="inputEmail4">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                </div>
                <div class="form-group col-6">
                  <label for="inputEmail4">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                </div>
                  <div class="form-group col-6">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                  </div>
                  <div class="form-group col-6">
                    <label for="inputAddress2">Address 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
                  </div>
                    <div class="form-group col-4">
                      <label for="inputCity">City</label>
                      <input type="text" class="form-control" id="inputCity">
                    </div>
                    <div class="form-group col-4">
                      <label for="inputState">State</label>
                      <input type="text" class="form-control" id="inputState">
                    </div>
                    <div class="form-group col-4">
                      <label for="inputZip">Zip</label>
                      <input type="text" class="form-control" id="inputZip">
                    </div>
                  <div class="form-group col-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="gridCheck">
                      <label class="form-check-label" for="gridCheck">I would like to add new property</label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary active">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
            <td><button type="button" v-on:click="getUnitDetails(row.propertyID)" class="btn btn-outline-dark">View Details</button></td>
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
        this.$router.push({ path: '/user/Landlord/Unitdetails',query:{data:propertyID}})
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
