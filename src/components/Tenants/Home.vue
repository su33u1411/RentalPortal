<template>
<div class="container">
<div class="row" v-if="Home">
      <div class="col-6 text-left board">
      <h3>Your current balance</h3>
      <h3>${{amount}}</h3>
      <p>Next bill due on {{amountDate}}</p>
      <br>
      <button type="button" class="btn btn-lg btn-block btn btn-secondary active">Pay Now</button>
      <button type="button" class="btn btn-lg btn-block btn-info active">Set Up Autopay</button>
        <ul class="list-group list-group-flush mgroup">
          <li class="list-group-item items"><h6 class="text-left">Rent <small>Due on 04/01/2018</small></h6><h6 class="value">$1,021.50</h6></li>
          <li class="list-group-item items"><h6 class="text-left">Your Credits & Prepayments</h6><h6 class="value">$0.00</h6></li>
          <li class="list-group-item items"><h6 class="text-left">Total Balance</h6><h6 id="TotalBalance">$1,021.50</h6></li>
        </ul>
    </div>
  <div class="col-5">
    <div class="list-group mgroup2">
      <a class="list-group-item Sitems list-group-item-action flex-column align-items-start">
        <h5 class="text-left">Notification :</h5>
        <small>nothing to show</small>
      </a>
      <a class="list-group-item Sitems list-group-item-action flex-column align-items-start">
        <h5 class="text-left">Address :</h5>
        <p class="text-left">{{addressLine1}}<br>{{addressLine2}}<br>{{city}}<br>{{state}}-{{zip}}</p>
      </a>
      <a class="list-group-item Sitems list-group-item-action flex-column align-items-start">
        <h5 class="text-left">Maintenance Requests :</h5>
        <button type="button" class="btn btn-sm btn-block btn-success active">Request Maintenance</button>
      </a>
      <a class="list-group-item Sitems list-group-item-action flex-column align-items-start">
        <h5 class="text-left">Qucik Documents :</h5>
        <ul class="list-group text-left">
          <li class="list-group-item"><a href="#">Rent Recipt : (02/03/2018)</a></li>
          <li class="list-group-item"><a href="#">Lease Document</a></li>
        </ul>
      </a>
    </div>
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
       Home:true,
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
  hideHome(){
    this.Home = false
  },
  showHome(){
    this.Home = true
  },
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
#TotalBalance{
   padding-left: 200px;
}
.value{
  padding-left: 110px;
}
.logout{
  margin-top:auto;
}
.Sitems{
  padding: 20px;
  border-width: thin;
}
.mgroup2{
  margin-top: 30px;
}
.items{
  height: 65px;
  border-width: thin;
}
.mgroup{
  margin-top: 25px;
}
.board{
  margin: 30px;
  border:lightgray;
  border-style:solid;
  border-width: thin;
  border-radius: 10px;
  padding: 30px;
}
</style>
