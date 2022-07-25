<template>
  <main className="main">
    <div className="main__container">
      <router-view/>
    </div>
  </main>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.main {
  height: 100vh;

  &__container {
    height: 100%;
  }
}

</style>
