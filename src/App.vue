<template>
    <div class="container">
     <div class="main">
      <!-- <FirstStep /> -->
      <!-- <SecondStep />
      <ThirdStep /> -->
      <FouthStep /> 
     </div>
    </div>
</template>

<script>
// import FirstStep from '../src/components/FirstStep.vue'
// import SecondStep from '../src/components/SecondStep.vue'
// import ThirdStep from '../src/components/ThirdStep.vue'
import FouthStep from '../src/components/FouthStep.vue'

export default {
  name: "App",
  components:{
    // FirstStep,
    // SecondStep,
    // ThirdStep,
    FouthStep
  }
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
  font-size: .8rem;
}
.main {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
