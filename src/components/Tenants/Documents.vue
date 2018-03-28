<template>
<div>
<div class="DocumentTable text-left">
<h5><strong>Documents :</strong></h5>
<hr>
<button type="submit" class="btn btn-sm btn-outline-primary" style="float:right;"><strong>Upload Document</strong></button>
<table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Document Name</th>
      <th scope="col">File</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Lease Document</td>
      <td><a href="#">sv0001.pdf</a></td>
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
.DocumentTable{
    margin-bottom: 100px;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
}
</style>
