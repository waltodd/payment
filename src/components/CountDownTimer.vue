<template>
  <div class="cdt-container">
    <p>{{ timeLeftString }}</p>
    <div class="root">
      <img src="../assets/logo.jpg" />
    <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="circle">
        <circle class="time-elapsed-path" cx="50" cy="50" r="45" />
        <path
          class="time-left-path"
          v-if="timeLeft >0"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          :style="{ strokeDasharray }"
        ></path>
      </g>
    </svg>
  </div>
  </div>
</template>

<script>
export default {
  name: "CountDownTimer",
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
.cdt-container p{
  font-size: 12px;
}
/* Sets the container's height and width */
.root {
  height: 5rem;
  width: 5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.root img {
  position: absolute;
  width: 3rem;
  border-radius: 50%;
}
/* Removes SVG styling that would hide the time label */
.circle {
  fill: none;
  stroke: none;
}

/* The SVG path that displays the timer's progress */
.time-elapsed-path {
  stroke-width: 2px;
  stroke: #f5f5f5
}
.time-left-path {
  /* Same thickness as the original ring */
  stroke-width: 2px;

  /* Rounds the path endings  */
  stroke-linecap: round;

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;

  /* Colors the ring */
  stroke: #8b4494;
}
.svg {
  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(1);
}
</style>
