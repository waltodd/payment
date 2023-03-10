<template>
  <div class="form">
    <div class="header">
      <h3>Wiza Payments</h3>
      <h5>Ngueve Comercial</h5>
      <p>10.220,25 AOA</p>
      <span>234342</span>
    </div>
    <div class="opt-container">
      <div class="input-container">
        <img src="../assets/guita.png" alt="" />
        <h4>OPT veririfcation</h4>
        <span>
          Enter the OTP sent to
          <strong>222 129 045</strong>
        </span>
        <p><strong>01:25</strong></p>
        <div class="opt-container">
          <OPT />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn-cancel">Cancel</div>
    </div>
  </div>
</template>

<script>
import OPT from "./OTP.vue";

export default {
  name: "ThirdStep",
  components: {
    OPT,
  },
};
</script>

<style>
.form {
  margin-top: 2rem;
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
.header span {
  font-size: 12px;
  color: #000;
}
.opt-container {
  padding: 0.5rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.opt {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  text-align: center;
}
.opt-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
.btn-cancel {
  width: 70%;
  padding: 1rem 0.5rem;
  text-align: center;
  color: red;
  cursor: pointer;
  border: 1px solid red;
}
</style>
