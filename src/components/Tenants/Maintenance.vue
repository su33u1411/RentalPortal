<template>
<div>
  <br>
  <div class="card text-left">
    <div class="card-header">
      <h5><strong>Maintenance Request History</strong></h5>
      <button type="submit" class="btn btn-sm btn-outline-primary" style="float:right;"><strong>Create New Request</strong></button>
    </div>
     <table class="table table-hover">
       <thead>
         <tr>
          <th scope="col">#</th>
          <th scope="col">Request Name</th>
          <th scope="col">Description</th>
          <th scope="col">Request Date</th>
          <th scope="col">Request Status</th>
         </tr>
        </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Test Name</td>
          <td>Hole in the Wall</td>
          <td>02/12/2018</td>
          <td>Closed</td>
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
