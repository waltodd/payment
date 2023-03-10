<template>
  <div class="form">
    <div class="header">
      <h3>Wiza Payments</h3>
      <h5>Ngueve Comercial</h5>
      <p class="amount">10.220,25 AOA</p>
      <span>234342</span>
    </div>
    <div class="countdown-container">
      <p class="warning">Do not refresh this page while waiting for payment confirmation</p>
      <CountDownTimer :elapsed="timeElapsed"
    :limit="timeLimit"  />

      <div>
        <p class="description">Waiting authorization</p>
        <p class="amount">10.220,25 AOA</p>
      </div>
    </div>
  </div>
</template>

<script>
import CountDownTimer from "./CountDownTimer.vue";

export default {
  name: "FouthStep",
  components: {
    CountDownTimer,
  },
  data() {
    return {
      timeElapsed: 0,
      timerInterval: undefined,
      timeLimit: 10,
    };
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        // Stop counting when there is no more time left
        if (++this.timeElapsed === this.timeLimit) {
          clearInterval(this.timerInterval);
        }
      }, 1000);
    },
  },
  // Start timer immediately
  mounted() {
    this.startTimer();
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
</style>
