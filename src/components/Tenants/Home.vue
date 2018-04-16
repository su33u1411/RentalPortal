<template>
<div>
   <br>
   <h3 class="text-left">Welcome {{uname}}</h3><hr>
   <div class="card">
          <div class="card-body">
            <h5 class="card-title">Your current balance : ${{amount}}</h5>
            <p class="card-text">Next bill due on {{amountDate}}</p>
            <button type="button" class="btn btn-lg btn btn-info active"><router-link to="/user/Tenant/Payments" class="link">Pay Now</router-link></button>
            <button type="button" class="btn btn-lg btn-info active">Set Up Autopay</button>
            <br>
            <br>
            <table class="table table-hover">
              <tbody>
               <tr>
                 <td class="text-left"><h6>Rent <small>Due on 04/01/2018</small></h6></td>
                 <td class="text-right">$1,021.50</td>
               </tr>
               <tr>
                 <td class="text-left"><h6>Your Credits & Prepayments</h6></td>
                 <td class="text-right">$0.00</td>
               </tr>
               <tr>
                 <td class="text-left"><h6>Total Balance</h6></td>
                 <td class="text-right">$1,021.50</td>
               </tr>
              </tbody>
          </table>
        </div>
  </div>
  <div class="card text-left">
      <div class="card-header">Address</div>
      <div class="card-body">
       <p class="text-left">{{addressLine1}}<br>{{addressLine2}}<br>{{city}}<br>{{state}}-{{zip}}</p>
      </div>
  </div>
  <div class="card text-left">
      <div class="card-header">Maintenance Requests</div>
      <div class="card-body">
        <p class="card-text">You can request a new maintenance request.</p>
        <button type="button" class="btn btn-sm btn-warning active" data-toggle="modal" data-target=".bd-example-modal-lg">Request Maintenance</button>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content jumbotron">
            <h3>New Maintenance Request </h3>
            <small>When I first brought my cat home from the humane society she was a mangy, pitiful animal. It cost a lot to adopt her: forty dollars. And then I had to buy litter, a litterbox, food, and dishes for her to eat out of. Two days after she came home with me she got taken to the pound by the animal warden. There's a leash law for cats in Fort Collins. If they're not in your yard they have to be on a leash. Anyway, my cat is my best friend. I'm glad I got her. She sleeps under the covers with me when it's cold. Sometimes she meows a lot in the middle of the night and wakes me up, though. </small>
            <hr>
            <form id="CreatePropertyForm">
              <div class="form-row">
                  <div class="form-group col-6">
                    <label for="PAddress1">Address</label>
                    <input type="text" class="form-control" id="PAddress1" placeholder="1234 Main St" v-model="addressLine1" disabled>
                  </div>
                  <div class="form-group col-6">
                    <label for="PAddress2">Address 2</label>
                    <input type="text" class="form-control" id="PAddress2" placeholder="Apartment, studio, or floor" v-model="addressLine2" disabled>
                  </div>
                    <div class="form-group col-4">
                      <label for="PCity">City</label>
                      <input type="text" class="form-control" id="PCity" v-model="city" disabled>
                    </div>
                    <div class="form-group col-4">
                      <label for="PState">State</label>
                      <input type="text" class="form-control" id="PState" v-model="state" disabled>
                    </div>
                    <div class="form-group col-4">
                      <label for="PZip">Zip</label>
                      <input type="text" class="form-control" id="PZip" v-model="zip" disabled>
                    </div>
                    <div class="form-group col-4">
                      <label for="requestType">Maintenance Requests Type</label>
                      <select class="custom-select" id="requestType">
                        <option selected>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div class="form-group col-8"></div>
                    <div class="form-group col-4">
                      <label for="Comments">Comments</label>
                      <textarea type="text" class="form-control" id="Comments" placeholder="Comments" v-model="PName" rows="5" required></textarea>
                    </div>
                  <div class="form-group col-8"></div>
                  <button type="submit" class="btn btn-primary active">submit</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
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
       loading:false,
       opacity:'',
       amount:'',
       amountDate:'',
       addressLine1:'',
       addressLine2:'',
       city:'',
       state:'',
       zip:''
     }
  },
methods:{
    getTenatDetails(){
      this.loading = true
      this.opacity = 'opacity: 0.3;'
      let postdata = {'username':this.uname}
      let headers = {'Content-Type': 'application/json'}
      this.$http.post('https://paymyrent.herokuapp.com/api/v1/getTenantDetails', postdata, headers).then(response => {
          this.amount = response.data.monthlyPayment
          this.amountDate = response.data.monthlyPaymentDate
          this.addressLine1 = response.data.unitaddress.addressline1
          this.addressLine2 = response.data.unitaddress.addressline2
          this.city = response.data.unitaddress.city
          this.state = response.data.unitaddress.state
          this.zip = response.data.unitaddress.zipcode
      },error => {

    })
    this.loading = false
    this.opacity = 'opacity:1;height: 380px;'
  }
},
  components: {
    spinner
  },
  mounted:function(){
    
  },
created: function(){
      this.uname = this.$localStorage.get('username')
      if(this.uname===null){
         this.$router.push({ path: '/'})
      }
      else{
         this.getTenatDetails()
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
.card{
  margin:auto;
  margin-bottom: 1%;
}
</style>
