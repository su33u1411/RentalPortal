<template>
<div>
<br>
<div class="card text-left">
<div class="card-header">
  <h5><strong>Units List</strong></h5>
  <button type="submit" class="btn btn-sm btn-outline-primary" style="float:right;"><strong>Add Unit</strong></button>
</div>
<div class="card-body">
<table class="table table-hover table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Unit Name</th>
      <th scope="col">Unit Address</th>
      <th scope="col">Current Tenant</th>
      <th scope="col">Monthly Payment</th>
      <th scope="col">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(row,index) in units" v-bind:key="index">
      <th scope="row">{{index+1}}</th>
      <td>{{row.unitname}}</td>
      <td>{{row.unitaddress.addressline1}},<br>{{row.unitaddress.addressline2}},<br>{{row.unitaddress.city}},<br>{{row.unitaddress.state}}-{{row.unitaddress.zipcode}}.</td>
      <td>{{row.currentTenent}}</td>
      <td>${{row.monthlyPayment}}</td>
      <td><button type="button" class="btn btn-link">Show Details</button></td>
    </tr>
  </tbody>
</table>
</div>
</div>
</div>
</template>
<script>
export default {
   name: 'FullDetails',
   data(){
       return{
        value:this.$route.query.data,
        units:''
       }
   },
methods:{
      getUnitsList(){
       let postdata = {'propertyID':this.value}
       let headers = {'Content-Type': 'application/json'}
       this.$http.post('https://paymyrent.herokuapp.com/api/v1/getUnits', postdata, headers).then(response => {
       this.units = response.body
      },error => {})
     },
     AddUnit(){

     }
  },
  created:function(){
      this.getUnitsList()
  }
}
</script>
<style>

</style>
