<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal__wrapper" ref="modalWrapper">
      <label class="modal__label" for="city-name">{{ $t('modal.title') }}</label>
      <input class="modal__input" type="text" id="city-name" :placeholder="$t('modal.placeholder')" v-model="city">
      <button @click="addCity" class="modal__button">{{ $t('modal.button') }}</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import db from '../../firebase/firebaseInit'
import { ref, defineProps, defineEmits} from "vue";


const props = defineProps({
  cities: Object,
  userId: String,
  APIkey: String,
})

const emit = defineEmits(['close-modal'])

const city = ref('')
const modal = ref(null)

const closeModal = (e) => {
  if (e.target === modal.value) emit('close-modal')
}

const addCity = async () => {
  if (city.value === '') {
    alert('field cannot be empty')
  } else if (props.cities.some(res => res.city === city.value.toLowerCase()) && props.cities.some(res => res.city.userId === props.userId())) {
    alert(`${city.value[0].toUpperCase() + city.value.slice(1).toLowerCase()} already added`)
  } else {
    try {
      const res = await axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${props.APIkey}&units=metric`)
      const data = await res.data
      await db.collection('cities')
          .doc()
          .set({
            city: city.value.toLowerCase(),
            currentWeather: data,
            userId: props.userId
          })
          .then(emit('close-modal'))
          .then(city.value = '')
    } catch {
      alert(`${city.value} doesn't exist`)
    }
  }
}

</script>

<style lang="scss" scoped>
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__wrapper {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &__label {
    color: #fff;
  }

  &__input {
      color: #fff;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }

  &__button {
    background-color: #222325;
    color: #fff;
    padding: 6px 20px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}
</style>
