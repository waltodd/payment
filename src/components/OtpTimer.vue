<template>
  <div class="cdt-container">
    <p><strong>{{ timeLeftString }}</strong></p>
  </div>
</template>

<script>
export default {
  name: "OtpTimer",
  props:{
    elapsed:{
      type:Number,
      required: true
    },
    limit:{
      type:Number,
      required: true
    }
  },
  computed:{
    // e.g. timeLeft of 100 -> '01:40'
    timeLeftString() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      return `${this.padToTwo(minutes)}:${this.padToTwo(seconds)}`;
    },
    timeLeft() {
      return this.limit - this.elapsed;
    },
    strokeDasharray() {
      const radius = 45;
      const total = 2 * Math.PI * radius;
      const timeFraction = this.timeLeft / this.limit;
      const adjTimeFraction = timeFraction - (1 - timeFraction) / this.limit;
      const elapsedDash = Math.floor(adjTimeFraction * total);
      return `${elapsedDash} ${total}`;
    },
  },
  methods:{
    padToTwo(num){
       //e.g 4->04
       return String(num).padStart(2, '0');
    }
  }
};
</script>

<style>
.cdt-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
