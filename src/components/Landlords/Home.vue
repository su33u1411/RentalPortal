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
            <form id="CreatePropertyForm">
              <div class="form-row">
                <div class="form-group col-6">
                  <label for="PName">Proptery Name</label>
                  <input type="text" class="form-control" id="PName" placeholder="Proptery Name" v-model="PName" required>
                </div>
                <div class="form-group col-6">
                  <label for="PType">Proptery Type</label>
                  <input type="text" class="form-control" id="PType" placeholder="Proptery Type" v-model="PType" required>
                </div>
                  <div class="form-group col-6">
                    <label for="PAddress1">Address</label>
                    <input type="text" class="form-control" id="PAddress1" placeholder="1234 Main St" v-model="PAddress1" required>
                  </div>
                  <div class="form-group col-6">
                    <label for="PAddress2">Address 2</label>
                    <input type="text" class="form-control" id="PAddress2" placeholder="Apartment, studio, or floor" v-model="PAddress2" required>
                  </div>
                    <div class="form-group col-4">
                      <label for="PCity">City</label>
                      <input type="text" class="form-control" id="PCity" v-model="PCity" required>
                    </div>
                    <div class="form-group col-4">
                      <label for="PState">State</label>
                      <input type="text" class="form-control" id="PState" v-model="PState" required>
                    </div>
                    <div class="form-group col-4">
                      <label for="PZip">Zip</label>
                      <input type="text" class="form-control" id="PZip" v-model="PZip" required>
                    </div>
                  <div class="form-group col-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="gridCheck">
                      <label class="form-check-label" for="gridCheck">I would like to add new property</label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary active" v-on:click="addProperty(PName,PType,PAddress1,PAddress2,PCity,PState,PZip)">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
    <table class="table table-striped table-bordered" id="Propertieslist">
       <!-- <thead>
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
        </tbody> -->
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
       properties:'',
       PName:'',
       PType:'',
       PAddress1:'',
       PAddress2:'',
       PCity:'',
       PState:'',
       PZip:'',
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
       this.properties = response.body.Properties
       this.loading = false
       this.opacity = 'opacity: 1.0;'
      },error => {})
     },
      addProperty(PName,PType,PAddress1,PAddress2,PCity,PState,PZip){
      this.loading = true
      this.opacity = 'opacity: 0.3;'
      let postdata = {
          "propertyname": PName,
          "propertytype": PType,
          "numberofunits": "0",
          "propertylandlord": this.uname,
          "propertyaddress":{
            "addressline1":PAddress1,
            "addressline2":PAddress2,
            "city":PCity,
            "state":PState,
            "zipcode":PZip
            }
        }
      let headers = {'Content-Type': 'application/json'}
      this.$http.post('https://paymyrent.herokuapp.com/api/v1/addProperty', postdata, headers).then(response => {
       if(response.data.status=="Success"){
       this.loading = false
       this.opacity = 'opacity: 1.0;'
       }
       else{
       this.loading = false
       this.opacity = 'opacity: 1.0;'
       }
      },error => {
       this.loading = false
       this.opacity = 'opacity: 1.0;'
      })
     },
     getUnitDetails(propertyID){
        this.$router.push({ path: '/user/Landlord/Unitdetails',query:{data:propertyID}})
     } 
},
created: function(){
      this.uname = this.$localStorage.get('username')
      if(this.uname===null){
         this.$router.push({ path: '/'})
      }
      else{
      this.getPropetiesList()
      $(document).ready(function() {
        $('#Propertieslist').DataTable( {
        data:this.properties,
        columns: [{ title: "Name" },{ title: "Position" },{ title: "Office" }]
        });
      });
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
