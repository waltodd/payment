<template>
  <div id="app">
    <div class="container">
      <div id="overlay" v-if="Object.keys(payment).length === 0">
        <span class="loader"></span>
      </div>
      <div class="main">
        <!--STEP ONE-->
        <div class="form1" id="step1" v-if="currentStep === 1">
          <div>
            <div class="header">
              <h3>{{ $t("title") }}</h3>
              <div>
                <h5>{{ nameMerchant }}</h5>
              </div>
              <div>
                <p class="amount">{{ transactionAmount }} AOA</p>
                <span>{{ transactionRefrenceId }}</span>
              </div>
            </div>
            <div class="payment-methods">
              <h5>{{ $t("description") }}</h5>
              <div class="payment-methods-container">
                <div
                  class="payment-methods-card"
                  v-for="(met, index) in paymentMethods"
                  :key="index"
                >
                  <!-- <img src="./assets/guita.png" alt="" /> -->
                  <p>{{ met.processor }}</p>
                  <!-- <div
                    class="checkbox-container"
                    :style="{ opacity: isChecked && index === 0 ? '1' : '.4' }"
                    @click="selectOnlyThis(met, index)"
                  >
                    <img src="./assets/check.svg" />
                  </div> -->
                  <input type="radio" id="contactChoice2" name="contact" value="phone" />

                </div>
              </div>
            </div>
          </div>
          <div class="footer" @click="goForward()" >
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
              <img src="./assets/guita.png" alt="" />
              <p class="amount">{{ transactionAmount }} AOA</p>
              <input v-if="!authloader"
                class="input"
                type="text"
                v-model.number="cellphone"
                placeholder="+244 222 129 045"
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
            <div class="input-container">
              <img src="./assets/guita.png" alt="" />
              <h4>{{ $t("otpTitle") }}</h4>
              <span>
                {{ $t("otpDescription") }}
                <strong>{{ cellphone }}</strong>
              </span>
              <OtpTimer :elapsed="timeElapsed" :limit="timeLimit" />
              <div class="opt-container">
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
                  @on-change="handleOnChange"
                  @on-complete="handleOnComplete"
                />

                <span v-else class="loader-btn"></span>
              </div>
            </div>
          </div>
          <div class="footer" v-if="!otpSent">
            <div class="btn" @click="sendOtp">{{ $t("send") }}</div>
          </div>
         
          <div class="footer" v-else>
            <div class="btn-cancel">{{ $t("cancel") }}</div>
          </div>
        </div>
        <!--STEP THREE-->
        <!--STEP FOUR-->
        <div class="form4" id="step3" v-if="currentStep === 4">
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

            <div class="footer-countdown">
              <p class="description">{{ $t("waiting") }}</p>
              <p class="amount">{{ transactionAmount }} AOA</p>
            </div>
          </div>
        </div>
        <!--STEP FOUR-->
        <!--SUCCED-->
        <div class="complete" v-if="currentStep === 5">
          <h3>{{ $t("title") }}</h3>
          <img src="./assets/complete.svg" alt="complete" />
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


export default {
  name: "App",
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
      desabledButton:true
    };
  },

  methods: {
    
    selectOnlyThis(item, index) {
      if (index === 0) {
        this.isChecked = !this.isChecked;
      }

      const { service, processor } = item;
      this.serviceMethod = service;
      this.proccessorMethod = processor;
    },
    goForward() {

      this.currentStep += 1;
    },

    //POST AUTHORIZATION

    async authorization() {
      if (this.cellphone.length > 0) {
        alert("Field requited");
      }
      this.authloader = true;
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
    },
    async sendOtp() {
      if (this.otp.length > 0) {
        alert("Field requited");
      }

      const optValue = this.$refs.otpInput.otp.join('')
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
      "https://api.wiza.ao/v1/hosts/payment-methods?id=73047cf6-2c1b-4ac1-b4fe-4cf69b2f1a36&nonce=6dc5f80bcd7b5ab0eb055f7a5d52a493e7e466f7045e9541906a9d96370cb911",
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
  border: 3px solid #000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader-btn {
  width: 20px;
  height: 20px;
  border: 3px solid #000;
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
  max-width: 400px;
  margin: auto;
}
.amount {
  font-weight: bold;
  font-size: 1.1rem;
}
.description {
  font-size: 1rem;
  color: #212121;
}
.warning {
  color: red;
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
  padding: 0.5rem 0;
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
.payment-methods-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.payment-methods-card {
  height: 6vh;
  width: 16rem;
  background-color: #f5f5f5;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
}
.payment-methods-card img {
  width: 8rem;
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
  padding: 1rem 0.5rem;
  text-align: center;
  color: #fff;
  background-color: #000;
  cursor: pointer;
}
/**
STEP TWO
*/
.form2 {
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
  padding: 0.5rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.input-container img {
  width: 6rem;
}
.input {
  width: 60%;
  font-size: 1.2rem;
  line-height: 12px;
  background: #f5f5f5;
  border: 2px solid #f5f5f5;
  padding: 0.8rem 0.5rem;
  text-align: left;
  color: #000;
  padding-left: 3rem;
}
.input:focus {
  outline: none;
}
.input::placeholder {
  color: #212121;
}
.footer3 {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
.btn3 {
  width: 70%;
  padding: 1rem 0.5rem;
  text-align: center;
  color: #fff;
  background-color: #000;
  cursor: pointer;
  align-items: center;
}

/**
STEP #3
*/
.form3 {
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

/**

STEP FOUR*/

.form4 {
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
.footer-countdown {
  width: 100%;
  padding-bottom: 2rem;
}
.complete {
  padding: 2rem 0;
  width: 25rem;
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #212121;
  border-radius: 50%;
}
.checkbox-container img {
  width: 0.8rem;
  height: 0.8rem;
  fill: #fff;
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
.success-p{
  padding: .5rem 0;
}
</style>
