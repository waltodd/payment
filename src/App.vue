<template>
  <div id="app">
    <div class="container">
      <div id="overlay" v-if="Object.keys(payment).length === 0">
        <span class="loader"></span>
      </div>
      <div class="main">
        <!--STEP ONE-->
        <div class="form1" id="step1" v-if="currentStep === 1">
            <div class="header">
                <h3>{{ $t("title") }}</h3>
                <h5>{{ nameMerchant }}</h5>
                <p class="amount">{{ transactionAmount }} AOA</p>
                <span>{{ transactionRefrenceId }}</span>
            </div>
            <div class="payment-methods">
              <h5>{{ $t("description") }}</h5>
              <div class="payment-methods-container">
                <div
                  class="payment-methods-card"
                  v-for="(met, index) in paymentMethods"
                  :key="index"
                >
                 
                  <div class="radio-toolbar">
                    <input
                      @click="selectOnlyThis(met, index)"
                      type="radio"
                      :id="index"
                      name="radioFruit"
                      :value="index"
                    />
                    <label :for="index" v-if="met.processor === 'guita'">Guita</label>
                    <label :for="index" v-if="met.processor === 'unitel_money'">Unitel Money</label>
                    <div class="custom-checkbox" >
                       <img src="./assets/check.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
         
            <div class="footer" @click="goForward()">
              <div class="btn">{{ $t("next") }}</div>
            </div>
        </div>
        <!--STEP ONE-->
        <!--STEP TWO-->
        <div class="form2" id="step2" v-if="currentStep === 2">
          <div class="header">
            <h3>{{ $t("title") }}</h3>
            <h5>{{ nameMerchant }}</h5>
            <p class="amount">{{ transactionAmount }} AOA</p>
            <span>{{ transactionRefrenceId }}</span>
          </div>
          <div class="number">
            <div class="input-container">
              <img src="./assets/guitafull.jpg" alt="" />
              <p class="amount">{{ transactionAmount }} AOA</p>
              <input
                v-if="!authloader"
                class="input"
                type="text"
                v-mask="['### ### ###']"
                v-model.trim="cellphone"
                placeholder="222 129 045"
              />

              <span v-else class="loader-btn"></span>
            </div>
          </div>
          <div class="footer3" @click="authorization">
            <div class="btn3">{{ $t("next") }}</div>
          </div>
        </div>
        <!--STEP TWO-->
        <!--STEP THREE-->
        <div class="form3" id="step3" v-if="currentStep === 3">
          <div class="header">
            <h3>{{ $t("title") }}</h3>
            <h5>{{ nameMerchant }}</h5>
            <p class="amount">{{ transactionAmount }} AOA</p>
            <span>{{ transactionRefrenceId }}</span>
          </div>
          <div class="opt-container">
              <img src="./assets/guitafull.jpg" alt="" />
              <h4>{{ $t("otpTitle") }}</h4>
              <span>
                {{ $t("otpDescription") }} 
                <strong>{{ cellphone }}</strong>
              </span>
              <OtpTimer id="timer" :elapsed="timeElapsed" :limit="timeLimit" />
              <VOtpInput
                  v-if="!otpSent"
                  v-model="otp"
                  :value="otp"
                  ref="otpInput"
                  input-classes="otp-input"
                  :num-inputs="6"
                  :should-auto-focus="true"
                  separator=" "
                  :is-input-num="true"
                  :conditionalClass="[
                    'one',
                    'two',
                    'three',
                    'four',
                    'fifh',
                    'six',
                  ]"
                  :placeholder="['*', '*', '*', '*', '*', '*']"
                
                />

                <span v-else class="loader-btn"></span>
          </div>
          <div class="footer" >
            <div class="btn" @click="sendOtp" v-if="!otpSent">{{ $t("send") }}</div>
            <div class="btn-cancel"  v-else>{{ $t("cancel") }}</div>
          </div>
        </div>
        <!--STEP THREE-->
        <!--STEP FOUR-->
        <div class="form4" id="step4" v-if="currentStep === 4">
          <div class="header">
            <h3>{{ $t("title") }}</h3>
            <h5>{{ nameMerchant }}</h5>
            <p class="amount">{{ transactionAmount }} AOA</p>
            <span>{{ transactionRefrenceId }}</span>
          </div>
          <div class="countdown-container">
            <p class="warning">
              {{ $t("warning") }}
            </p>
            <CountDownTimer :elapsed="timeElapsed" :limit="timeLimit" />
          </div>
          <div class="footer-countdown">
              <p class="description">{{ $t("waiting") }}</p>
              <p class="amount">{{ transactionAmount }} AOA</p>
            </div>
        </div>
        <!--STEP FOUR-->
        <!--SUCCED-->
        <div class="complete" v-if="currentStep === 5">
          <h3>{{ $t("title") }}</h3>
          <img src="./assets/fail.png" alt="complete" />
          <span class="success-p">{{ transactionRefrenceId }}</span>
          <p>{{ $t("purchaseMsn") }}</p>
        </div>
        <!--SUCCED-->
      </div>
    </div>
  </div>
</template>

<script>
import CountDownTimer from "../src/components/CountDownTimer.vue";
import OtpTimer from "../src/components/OtpTimer.vue";
import VOtpInput from "vue3-otp-input";
import {mask} from 'vue-the-mask'
export default {
  name: "App",
  directives: {mask},
  components: {
    OtpTimer,
    VOtpInput,
    CountDownTimer,
  },
  data() {
    return {
      payment: [],
      currentStep: 1,
      timeElapsed: 0,
      timerInterval: undefined,
      timeLimit: 240,
      isChecked: false,
      transactionAmount: "",
      transactionRefrenceId: "",
      nameMerchant: "",
      paymentMethods: [],
      transactionId: "",
      cellphone: "",
      serviceMethod: "",
      proccessorMethod: "",
      locationAuthorization: "",
      locationConfirmation: "",
      parentID: "",
      otpCode: "",
      otp: "",
      otpSent: false,
      authloader: false,
      selectMet: false,
    };
  },

  methods: {
    selectOnlyThis(item) {
      if (!item) {
        alert("select method");
      }
      console.log(item);
      const { service, processor } = item;
      this.serviceMethod = service;
      this.proccessorMethod = processor;
    },
    goForward() {
      if (this.proccessorMethod === "") {
        alert("Select a method");
      } else {
        this.currentStep += 1;
        // console.log("Passed");
      }
      // console.log("Passed");
    },

    //POST AUTHORIZATION

    async authorization() {
      if (!this.cellphone) {
        alert("Field requited");
      }
      this.authloader = true;

      this.cellphone = this.cellphone.replace(/\s/g, '');

      console.log(this.cellphone)

      if (this.proccessorMethod === "guita") {
        const response = await fetch(
          "https://api.wiza.ao/v1/hosts/transactions",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.transactionId,
              type: "authorization",
              service: this.serviceMethod,
              processor: this.proccessorMethod,
              customer: this.cellphone,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const data = await response.json();
        const location = await response.headers.get("Location");

        this.locationAuthorization = location;

        // console.log(this.locationAuthorization);

        const res = await fetch(
          `https://api.wiza.ao/${this.locationAuthorization}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // const data = await response.json();
        const data = await res.json();

        const { id } = data;
        this.parentID = id;
        // console.log(id);

         this.currentStep += 1;
      } else {
        alert("No need auth and confi.");
        const response = await fetch(
          "https://api.wiza.ao/v1/hosts/transactions",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: this.transactionId,
              type: "paymnet",
              service: this.serviceMethod,
              processor: this.proccessorMethod,
              amount: this.transactionAmount,
              customer: this.cellphone,
              currency: "aoa",
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const data = await response.json();
        const location = await response.headers.get("Location");

        this.locationAuthorization = location;

        console.log(this.locationAuthorization);
      }
    },
    async sendOtp() {
      if (this.otp.length > 0) {
        alert("Field requited");
      }

      const optValue = this.$refs.otpInput.otp.join("");
      this.otpCode = optValue;
      console.log(this.otpCode);

      this.otpSent = true;
      const response = await fetch(
        "https://api.wiza.ao/v1/hosts/transactions",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: this.transactionId,
            type: "confirmation",
            service: this.serviceMethod,
            processor: this.proccessorMethod,
            otp: this.otpCode,
            parent_transaction_id: this.parentID,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const data = await response.json();
      const locationConfirm = await response.headers.get("Location");

      console.log(locationConfirm);
      this.locationConfirmation = locationConfirm;

      this.currentStep += 1;
      const res = await fetch(
        `https://api.wiza.ao/${this.locationConfirmation}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // const data = await response.json();

      const resultDATA = await res.json();
      console.log(resultDATA);

      const resp = await fetch(
        `https://api.wiza.ao/v1/hosts/jungleworks/${this.transactionId}/complete`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      // const data = await response.json();

      const finalResult = await resp.json();
      console.log(finalResult);

      this.currentStep += 1;
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        // Stop counting when there is no more time left
        if (++this.timeElapsed === this.timeLimit) {
          clearInterval(this.timerInterval);
        }
      }, 1000);
    },
  },
  mounted() {
    fetch(
      "https://api.wiza.ao/v1/hosts/payment-methods?id=49b82bb5-66cd-45dd-95f3-383e2d6e0e45&nonce=299f64598358bc6ba485016e6d527d1bc9fe148ebadc5250de7277c165c50382",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          ContentType: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        const data = response;

        this.payment = data;

        //get  transaction and amount and Id
        const {
          transaction: { amount, reference_id, id },
        } = data;
        this.transactionAmount = amount;
        this.transactionRefrenceId = reference_id;
        this.transactionId = id;
        // console.log(id)

        //get  merchant name
        const {
          merchant: { name },
        } = data;
        this.nameMerchant = name;

        //get payment merthods
        const { payment_methods } = data;
        this.paymentMethods = payment_methods;
        // console.log(payment_methods)
      })
      .catch((error) => {
        return console.log(error);
      });

    this.startTimer();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap");

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  background-color: #f5f5f5;
}
#app {
  width: 100%;
  height: 100%;
  background: hsla(211, 66%, 87%, 1);

  background: linear-gradient(
    90deg,
    hsla(211, 66%, 87%, 1) 0%,
    hsla(348, 67%, 88%, 1) 50%,
    hsla(272, 26%, 72%, 1) 100%
  );

  background: -moz-linear-gradient(
    90deg,
    hsla(211, 66%, 87%, 1) 0%,
    hsla(348, 67%, 88%, 1) 50%,
    hsla(272, 26%, 72%, 1) 100%
  );

  background: -webkit-linear-gradient(
    90deg,
    hsla(211, 66%, 87%, 1) 0%,
    hsla(348, 67%, 88%, 1) 50%,
    hsla(272, 26%, 72%, 1) 100%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#C9DEF4", endColorstr="#F5CCD4", GradientType=1 );
}
#overlay {
  position: fixed; /* Sit on top of the page content */
  display: flex; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5; /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
  justify-content: center;
  align-items: center;
}
.loader {
  width: 48px;
  height: 48px;
  border: 3px solid #282A3A;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader-btn {
  width: 20px;
  height: 20px;
  border: 3px solid #282A3A;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.container {
  width: 90%;
  max-width: 350px;
  margin: auto;
}
.amount {
  font-weight: 500;
  font-size: 1rem;
}
.description {
  font-size: 1rem;
  color: #282A3A;
}
.warning {
  color: #e30000;
  font-size: 0.8rem;
  padding: 0rem 0.5rem;
}
.main {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*
STEP ONE
**/

.form1 {
  border-radius: 4px;
  width: 25rem;
  height: 23rem;
  background-color: #fff;
  display: grid;
  grid-template-rows: .5fr 2fr .5fr;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.header {
  padding: 0.5rem 0;
}
.header p{ 
  margin:0;
}
.header h3{ 
  margin:.5rem;
}
.header h5{ 
  margin:.2rem;
}
.header span {
  font-size: 12px;
  color: #282A3A;
  margin:0;
}
.payment-methods {
  position: relative;
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.payment-methods h5 {
  text-align: left;
  padding-right: 3rem;
  margin: .5rem 0;
}
.payment-methods-container {
  width: 70%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: .5rem;
  justify-content: center;
  align-items: center;

}

.payment-methods-card {
  width: 90%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  cursor: pointer;

}

.radio-toolbar {
  margin: 0;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  justify-content: space-between;
}

.radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;

}

.radio-toolbar label {
  display: inline-block;
  text-align: left;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 4px;
  height: 2vh;
  width: 8rem;
  cursor: pointer;
}


.radio-toolbar input[type="radio"]:checked + label +div{
  background-color: #28c937; 
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  opacity: 1;
}   
.custom-checkbox{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  opacity: .4;
  background-color: #282A3A;
  margin-right: 1rem;
}

.custom-checkbox img{
  width: .8rem;
  height: .8rem;
  padding: .5rem;
}

.footer {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top:.5rem;
}
.btn {
  padding: .8rem 3rem;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  background-color: #282A3A;
  cursor: pointer;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
/**
STEP TWO
*/
.form2 {
  border-radius: 4px;
  height: 23rem;
  background-color: #fff;
  display: grid;
  grid-template-rows: .5fr 1.5fr .8fr;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 25rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.header {
  padding: .5rem 0;
}
.header span {
  font-size: 12px;
  color: #282A3A;
}
.payment-methods {
  position: relative;
}
.payment-methods h5 {
  text-align: left;
}
.number {
  padding: 0.5rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  justify-content: center;
  align-items: center;
}
.input-container img {
  width: 7rem;
  margin: 0;
}

.input-container p {
  text-align: center;
  margin: .2rem 0;
}

.input-container .input {
  margin: .2rem 0;
}
.input {
  width: 70%;
  font-size: 1.2rem;
  line-height: 12px;
  border: none;
  background: #f5f5f5;
  padding: 0.5rem 0.5rem;
  text-align: left;
  color: #282A3A;
  padding-left: 1rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

}
.input:focus {
  outline: none;
}
.input::placeholder {
  color: #212121;
  width: 60%;
}
.footer3 {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0rem 0;
}
.btn3 {
  padding: .8rem 3rem;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  background-color: #282A3A;
  cursor: pointer;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

/**
STEP #3
*/
.form3 {
  width: 25rem;
  height: 23rem;
  position: relative;
  background-color: #fff;
  display: grid;
  grid-gap: 0rem;
  grid-template-rows: 1fr 1.5fr .5fr;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
}
.header {
  padding: .3rem 0;
  margin: -1rem 0;
}
.header span {
  font-size: 12px;
  color: #282A3A;
  margin: 0;
}
.header p {
  margin: 0;
}
.opt-container {
  padding: 0rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
}
.opt-container img{
  width: 7rem;
  margin: 0;
}
.opt-container h4{
  margin: 0;
  font-weight: 500;
  font-size: 14px;
}
.opt-container span{
  margin: 0;
  font-size: 13px;
}
.opt-container #timer{
  margin: .2rem;
  height: 1rem;
  font-size: 12px;
  font-weight: 300;
}
.otp-input{
  width: 1rem;
  height: .6rem;
}
.footer {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: .8rem;
}
.btn-cancel {

  color: #e30000;
  cursor: pointer;
  border: 1px solid #e30000;
  padding: .8rem 3rem;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

/**

STEP FOUR*/

.form4 {
  width: 25rem;
  height: 23rem;
  position: relative;
  background-color: #fff;
  display: grid;
  grid-gap: 0rem;
  grid-template-rows: 1fr 1.5fr .5fr;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
}
.header {
  padding: 1rem 0; 
  margin: 0;
}
.header span {
  font-size: 12px;
  color: #282A3A;
}
.countdown-container p{
  margin: 0;
}
.footer-countdown {
  width: 100%;
  padding-bottom: 2rem;
}
.footer-countdown p{
  margin: .2rem;
}
.complete {
  padding: 2rem 0;
  width: 25rem;
  height: 15rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.complete img {
  width: 7rem;
}

.checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}
input[type="radio"] {
  height: 5rem;
  width: 2rem;
  background: #e8e8e8;

  /* The outline will be the outer circle */
  outline: none;
}
/**
OTP
*/

.otp-input {
  padding: 1rem;
  width: 1rem;
  text-align: center;
  background-color: #f5f5f5;
  border: 0;
  border-bottom: 1px solid #ddd;
  font-size: 1.1rem;
  margin: 0rem 0.2rem;
}
.otp-input:focus {
  outline: none;
}
.success-p {
  padding: 0.5rem 0;
}

[type="radio"]:checked::before,
[type="checkbox"]:checked::before {
  content: "";
  width: 2rem;
  height: 2rem;
  background-color: #282A3A;
  position: absolute;
  top: 2px;
  left: 2px;
}
</style>
