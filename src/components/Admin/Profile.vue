<template>
<div>
          <h3 class="text-left">Profile Details</h3>
          <hr>
          <form>
                  <div class="form-row">
                          <div class="col">
                                  <input type="text" class="form-control" placeholder="First name" v-model="firstname">
                          </div>
                          <div class="col">
                                  <input type="text" class="form-control" placeholder="Middle name" v-model="firstname">
                          </div>
                          <div class="col">
                                  <input type="text" class="form-control" placeholder="Last name" v-model="firstname">
                          </div>
                  </div>
                  <br>
                  <header class="text-left">Physical Details :</header>
                 <div class="form-row">
                          <div class="col-6">
                                  <input type="text" class="form-control" placeholder="Address Line 1" v-model="firstname">
                          </div>
                  </div>
                 <br>
                <div class="form-row">
                          <div class="col-6">
                                  <input type="text" class="form-control" placeholder="Address Line 2" v-model="firstname">
                          </div>
                  </div>
                  <br>
                 <div class="form-row">
                          <div class="col-2">
                                  <input type="text" class="form-control" placeholder="City" v-model="firstname">
                          </div>
                          <div class="col-2">
                                  <select id="inputState" class="form-control">
                                          <option selected>Choose...</option>
                                          <option>...</option>
                                          </select>
                         </div>
                         <div class="col-2">
                                  <input type="text" class="form-control" placeholder="Zip" v-model="firstname">
                          </div>
                  </div>
                  <br>
                  <header class="text-left">Mailing Details :</header>
                 <div class="form-row">
                          <div class="col-6">
                                  <input type="text" class="form-control" placeholder="Address Line 1" v-model="firstname">
                          </div>
                  </div>
                 <br>
                <div class="form-row">
                          <div class="col-6">
                                  <input type="text" class="form-control" placeholder="Address Line 2" v-model="firstname">
                          </div>
                  </div>
                  <br>
                 <div class="form-row">
                          <div class="col-2">
                                  <input type="text" class="form-control" placeholder="City" v-model="firstname">
                          </div>
                          <div class="col-2">
                                  <select id="inputState" class="form-control">
                                          <option selected>Choose...</option>
                                          <option>...</option>
                                          </select>
                         </div>
                         <div class="col-2">
                                  <input type="text" class="form-control" placeholder="Zip" v-model="firstname">
                          </div>
                  </div>
                  <br>
                 <header class="text-left">Contact Details :</header>
                 <div class="form-row">
                          <div class="col-3">
                                  <input type="text" class="form-control" placeholder="Cell Phone" v-model="firstname">
                          </div>
                  </div>
                  <br>
                  <div class="form-row">
                          <div class="col-3">
                                  <input type="text" class="form-control" placeholder="Mobile Phone" v-model="firstname">
                          </div>
                  </div>
                  <br>
                  <div class="form-row">
                          <div class="col-3">
                                  <input type="text" class="form-control" placeholder="Email" v-model="firstname">
                          </div>
                  </div>
                 <br>
                 <button type="button" class="btn btn-success btn-lg btn-block">Update Profile</button>
        </form>
</div>
</template>
<script>
export default {
  name: 'Profile',
  data(){
    return {
         firstname: '', 
         lastname: '', 
         middlename: '', 
         Paddress1: '', 
         Paddress2: '',  
         Pcity: '', 
         Pstate: '', 
         Pzip: '',
         Maddress1: '', 
         Maddress2: '',  
         Mcity: '', 
         Mstate: '', 
         Mzip: '',
         email:'',
         cphone:'',
         hphone:''
    }
  },
  methods:{
     getProfile(uname){
      let postdata = {'username':uname}
      let headers = {'Content-Type': 'application/json'}
      this.$http.post('https://paymyrent.herokuapp.com/api/v1/getUserdetails', postdata, headers).then(response => {
       this.firstname = response.body.firstname
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
      },error => {

    })
     }   
  },
  created: function(){
             this.getProfile(this.$route.query.uname)
     }  
}
</script>
<style>

</style>
