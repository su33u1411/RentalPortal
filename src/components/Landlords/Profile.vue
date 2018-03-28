<template>
<div class="ProfileSection" v-bind:style="opacity">
	<div class="row">
      <div class="col-10 personal-info text-left">
        <h3>Personal info</h3>
        <hr>
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-md-3 control-label">Username:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" v-model="uname" disabled>
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">First name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model="firstname">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Middle name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model="middlename">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Last name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model="lastname">
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">Password:</label>
            <div class="col-md-8">
              <input class="form-control" type="password" v-model="firstname" disabled>
            </div>
          </div>
          <br>
          <h6>Personal Address : </h6>
          <br>
          <div class="form-group">
            <label class="col-md-3 control-label">Address line 1:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" v-model="Paddress1">
            </div>
           </div>
            <div class="form-group">
            <label class="col-md-3 control-label">Address line 2:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" v-model="Paddress2">
            </div>
          </div>
           <div class="form-row">
            <div class="form-group">
              <label class="col control-label">City:</label>
              <div class="col">
              <input class="form-control" type="text" v-model="Pcity">
              </div>
            </div>
            <div class="form-group">
              <label class="col control-label">State:</label>
              <div class="col">
              <input class="form-control" type="text" v-model="Pstate">
              </div>
            </div>
            <div class="form-group">
              <label class="col control-label">Zip :</label>
              <div class="col-5">
              <input class="form-control" type="text" v-model="Pzip">
              </div>
            </div>
           </div>
           <br>
          <h6>Mailling Address : </h6>
          <br>
          <div class="form-group">
            <label class="col-md-3 control-label">Address line 1:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" v-model="Maddress1">
            </div>
           </div>
            <div class="form-group">
            <label class="col-md-3 control-label">Address line 2:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" v-model="Maddress2">
            </div>
          </div>
           <div class="form-row">
            <div class="form-group">
              <label class="col control-label">City:</label>
              <div class="col">
              <input class="form-control" type="text" v-model="Mcity">
              </div>
            </div>
            <div class="form-group">
              <label class="col control-label">State:</label>
              <div class="col">
              <input class="form-control" type="text" v-model="Mstate">
              </div>
            </div>
            <div class="form-group">
              <label class="col control-label">Zip :</label>
              <div class="col-5">
              <input class="form-control" type="text" v-model="Mzip">
              </div>
            </div>
           </div>
          <br>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model="email">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Home Phone:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model="hphone">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Cell Phone:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" v-model="cphone">
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-8">
              <input type="button" class="btn btn-primary active" value="Save Changes">
              <span></span>
              <input type="reset" class="btn btn-default active" value="Cancel">
            </div>
          </div>
        </form>
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
  name: 'Profile',
  data(){
    return {
         uname:'',
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
         hphone:'',
         loading:false,
         opacity:''
    }
  },
   components: {
    spinner
  },
  methods:{
     getProfile(){
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
       this.loading = false
       this.opacity = 'opacity: 1.0;'
      },error => {

    })
     }   
  },
  created: function(){
      this.uname = this.$localStorage.get('username')
      this.getProfile()
  }
}
</script>
<style>
.ProfileSection{
  margin: 30px;
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
