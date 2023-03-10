<template>
  <div class="form">
    <div class="header">
      <h3>Wiza Payments</h3>
      <h5>Ngueve Comercial</h5>
      <p class="amout">10.220,25 AOA</p>
      <span>234342</span>
    </div>
    <div class="number">
      <div class="input-container">
        <img src="../assets/guita.png" alt="" />
        <p class="amout">10.220,25 AOA</p>
        <input class="input" type="text" placeholder="+244 222 129 045" />
      </div>
    </div>
    <div class="footer">
      <div class="btn">Next</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondStep",
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
.payment-methods {
  position: relative;
}
.payment-methods h5 {
  text-align: left;
}
.number {
  padding:.5rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: .5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.input-container img {
  width: 6rem;

}
.input {
  width: 70%;
  font-size: 1.1rem;
  line-height: 12px;
  background: #f5f5f5;
  border: 2px solid #f5f5f5;
  padding: 0.8rem 0.5rem;
  text-align: left;
  color: #000;
}
.input:focus {
  outline: none;
  border: 1px solid #212121;
}
.input::placeholder {
  color: #212121;
}
.footer {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
.btn {
  width: 70%;
  padding: 1rem .5rem;
  text-align: center;
  color: #fff;
  background-color: #000;
  cursor: pointer;
}
</style>
