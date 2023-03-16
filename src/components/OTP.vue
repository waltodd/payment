<template>
 
    <VOtpInput
      ref="otpInput"
      input-classes="otp-input"
      :num-inputs="6"
      :should-auto-focus="true"
      separator=" "
      :is-input-num="true"
      :conditionalClass="['one', 'two', 'three', 'four','fifh','six']"
      :placeholder="['*', '*', '*', '*', '*', '*']"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
      />
</template>
<script>
import VOtpInput from "vue3-otp-input";
export default {
  name: "OPT",
  components:{
    VOtpInput
  },
  data(){
    return {
      token:'123456'
    }
  }
};
</script>

<style>

.otp-input {
  
  padding: 1rem;
  width: 1rem;
  text-align: center;
  background-color: #f5f5f5;
  border: 0;
  border-bottom: 1px solid #ddd;
  font-size: 1.1rem;
  margin: 0rem .2rem;
  
}
.otp-input:focus {
  outline: none;
  
}
</style>
