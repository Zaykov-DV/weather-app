<template>
  <div class="add-city">
    <div class="add-city__container">
        <City v-for="(city, index) in cities" :key="index" :city="city" :edit="edit" :userId="userId"/>
      <div class="add-city__empty" v-if="cities.length === 0">
        <p class="add-city__text">{{ $t('main.noCities') }}</p>
        <button class="add-city__button" @click="$emit('add-city')">{{ $t('main.add') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import City from "@/components/City";
import {defineProps, defineEmits} from "vue";

defineProps({
  cities: Array,
  edit: Boolean,
  userId: String
})

defineEmits(['add-city'])

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


