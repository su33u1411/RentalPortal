<template>
 <div>
  <br>
  <div class="card text-left">
          <div class="card-header"><h5><strong>Payment Options</strong></h5></div>
          <div class="card-body">
            <p class="card-text">Please choose any following payment option.</p>
            <button type="submit" class="btn btn-sm btn-outline-primary active"><strong>Bank Account</strong></button>
            <button type="submit" class="btn btn-sm btn-outline-primary active"><strong>Credit Card</strong></button>
          </div>
  </div>
  <br>
  <div class="card text-left">
    <div class="card-header"><h5><strong>Payment History</strong></h5></div>
    <div class="card-body">
     <table class="table table-striped table-bordered" id="PaymentsHistory">
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
        <tr>
          <th scope="row">2</th>
          <td>Expense</td>
          <td>Credit Card</td>
          <td>$1,021.50</td>
          <td>02/02/2018</td>
        </tr>
      </tbody>
    </table>
    </div>
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
  mounted:function(){
    $(document).ready(function() {
      $('#PaymentsHistory').DataTable();
    });
  },
   created: function(){
      this.uname = this.$localStorage.get('username')
      if(this.uname===null){
         this.$router.push({ path: '/'})
      }
   }
}
</script>
<style>
#PaymentsHistory{
  width: 100%;
}
</style>
