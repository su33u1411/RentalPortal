<template>
<div>
<div class="PaymentSection form-row text-center">
    <div class="col-12">
      <h4>Please choose any following payment option.</h4>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-lg btn-outline-primary"><strong>Bank Account</strong></button>
      <button type="submit" class="btn btn-lg btn-outline-primary"><strong>Credit Card</strong></button>
    </div>
 </div>

<div class="PaymentsTable text-left">
<h5 class="label"><strong>Payment History:</strong></h5>
<table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Payment For</th>
      <th scope="col">Payment Method</th>
      <th scope="col">Amount</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Rent</td>
      <td>Credit Card</td>
      <td>$1,021.50</td>
      <td>02/02/2018</td>
    </tr>
  </tbody>
</table>
</div>  


</div> 
</template>
<script>
export default {
  name: 'TPayments',
  data () {
     return{
       uname:''
     }
  },
   created: function(){
      this.uname = this.$localStorage.get('username')
      if(this.uname===null){
         this.$router.push({ path: '/'})
      }else{
         
      }
  }
}
</script>
<style>
.PaymentSection{
  margin: 30px;
  padding: 30px;
}
.PaymentsTable{
    margin-bottom: 100px;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
}
.label{
    margin-bottom: 20px;
}
</style>
