<template>
    <div class="checkbox-container" :style="{opacity: isChecked ? '1' :'.4' }" @click="this.isChecked = !this.isChecked">
        <img src="../assets/check.svg" />
    </div>
</template>
<script>
export default {
  name: "CustomCheckbox",
  data(){
    return {
      isChecked: false
    }
  }
};
</script>

<style>
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
.checkbox-container img{
  width: .8rem;
  height: .8rem;
  fill: #fff;
}
</style>