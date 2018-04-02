<template>
<div>
   <br>
   <h3 class="text-left">Welcome {{uname}}</h3><hr>
   <div class="card">
          <div class="card-body">
            <h5 class="card-title">Your current balance : ${{amount}}</h5>
            <p class="card-text">Next bill due on {{amountDate}}</p>
            <button type="button" class="btn btn-lg btn btn-info active">Pay Now</button>
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
        <button type="button" class="btn btn-sm btn-warning active">Request Maintenance</button>
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
