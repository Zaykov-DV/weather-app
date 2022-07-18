<template>
  <div class="add-city">
    <div class="add-city__container">
        <City v-for="(city, index) in cities" :key="index" :city="city" :edit="edit"/>
      <div class="add-city__empty" v-if="cities.length === 0">
        <p class="add-city__text">No cities added, add a new one?</p>
        <button class="add-city__button" @click="addCity()">Add city</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import City from "@/components/City";

export default {
  name: 'AddCity',
  components: {City},
  props: ['cities', 'edit'],
  methods: {
    addCity() {
      this.$emit('add-city')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-city {
  &__container {
    display: grid;
    grid-auto-rows: 250px;
    gap: 2px;
    padding: 80px 16px;
    background: #313640;
    width: 100%;
    min-height: 100vh;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__text {
    color: #fff;
    margin-bottom: 10px;
  }

  &__button {
    background-color: #fff ;
    color: #222325;
    padding: 6px 20px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

@media screen and (min-width: 420px) {
  .add-city__container {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>


