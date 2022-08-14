<template>
  <div class="not-found">
    <div class="not-found__container">
      <img class="not-found__image" src="../assets/error-404.png" alt="error-404">
      <h3 class="not-found__title">{{ $t("notFound.text") }}</h3>
      <router-link class="not-found__router-link" :to="{ name: 'AddCity' }">{{ $t("notFound.route") }}</router-link>
    </div>
  </div>

</template>

<style lang="scss">
.not-found {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 16px;
    background: #313640;
    width: 100%;
    min-height: 100vh;
    color: #fff;
  }

  &__router-link {
    margin-top: 10px;
    color: #5dbaf6;
    text-decoration: none;
  }

  &__image {
    width: 200px;
    margin-bottom: 20px;
  }
}
</style>