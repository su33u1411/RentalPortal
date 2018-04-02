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
  <div class="card">
    <div class="card-header text-left"><h5><strong>Payment History</strong></h5></div>
     <table class="table table-hover">
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
