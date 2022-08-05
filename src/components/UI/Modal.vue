<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal__wrapper" ref="modalWrapper">
      <label class="modal__label" for="city-name">Enter Location</label>
      <input class="modal__input" type="text" id="city-name" placeholder="Search by city name" v-model="city">
      <button @click="addCity" class="modal__button">Add</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from '../../firebase/firebaseInit'

export default {
  name: "Modal",
  props: ['APIkey', 'cities', 'userId'],
  data() {
    return {
      city: '',
    }
  },
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.modal) this.$emit('close-modal')
    },
    async addCity() {
      if (this.city === '') {
        alert('field cannot be empty')
      } else if (this.cities.some(res => res.city === this.city.toLowerCase()) && this.cities.some(res => res.city.userId === this.userId())) {
        alert(`${this.city[0].toUpperCase() + this.city.slice(1).toLowerCase()} already added`)
      } else {
        try {
          const res = await axios
              .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIkey}&units=metric`)
          const data = await res.data
          await db.collection('cities')
              .doc()
              .set({
                city: this.city.toLowerCase(),
                currentWeather: data,
                userId: this.userId
              })
              .then(this.$emit('close-modal'))
              .then(this.city = '')
        } catch {
          alert(`${this.city} doesn't exist`)
        }
      }
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
