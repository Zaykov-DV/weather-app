<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #313640;

  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>