<template>
        <div class="form">
          <div class="header">
            <h3>Wiza Payments</h3>
            <h5>Ngueve Comercial</h5>
            <p class="amout">10.220,25 AOA</p>
            <span>234342</span>
          </div>
          <div class="payment-methods">
              <h5>Payment methods</h5>
              <div class="payment-methods-container">
                <div class="payment-methods-card">
                <img src="../assets/guita.png" alt="" /> 
                <CustomCheckbox/>
              </div>
              <div class="payment-methods-card">
                <img src="../assets/unitel-money.png" alt="" /> 
                <CustomCheckbox/>
              </div>
              </div>
            </div>
            <div class="footer">
              <div class="btn">Next</div>
            </div>
        </div>
</template>

<script>
import CustomCheckbox from './CustomCheckbox.vue'

export default {
  name: "FirstStep",
  components:{
    CustomCheckbox
  }
};
</script>

<style>

.form {
  width: 25rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.header {
    padding: 1rem 0;
}
.header span{
    font-size: 12px;
    color: #000;
}
.payment-methods {
   position: relative;
}
.payment-methods h5{
   text-align: left;
}
.payment-methods-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: .5rem;
    justify-content: center;
    align-items: center;
}

.payment-methods-card {
  height: 6vh;
  width: 16rem;
  background-color: #f5f5f5;
  padding: .5rem;
  justify-content: space-around;
    align-items: center;
    display: flex;
}
.payment-methods-card img{
  width: 8rem;
}
.footer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
}
.btn {
  padding: .5rem 8rem;
  text-align: center;
  color: #fff;
  background-color: #000;
  cursor: pointer;
}
</style>
