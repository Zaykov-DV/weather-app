<template>
  <main class="main">
    <div class="main__container">
      <Navigation v-on:add-city="toggleModal"
                  v-on:edit-cities="toggleEdit"
                  :addCityActive="addCityActive"
                  :isDay="isDay"
                  :isNight="isNight"/>
      <Modal v-show="modalOpen"
             v-on:close-modal="toggleModal"
             :cities="cities"
             :APIkey="APIkey"/>
      <router-view v-if="loading === false"
                   :cities="cities"
                   :edit="edit"
                   :APIkey="APIkey"
                   :isDay="isDay"
                   :isNight="isNight"
                   v-on:is-day="dayTime"
                   v-on:is-night="nightTime"
                   v-on:resetDays="resetDays"
                   v-on:add-city="toggleModal"
      />
      <Loading v-if="loading"></Loading>
    </div>

  </main>
</template>

<script>
import axios from 'axios'
import db from './firebase/firebaseInit'
import Navigation from "@/components/Navigation";
import Modal from "@/components/UI/Modal";
import Loading from "./components/UI/Loading";

export default {
  name: 'App',
  components: {Loading, Navigation, Modal},
  data() {
    return {
      APIkey: '215522eb8b33fb9868dcd0b9043f15c8',
      cities: [],
      modalOpen: false,
      edit: false,
      addCityActive: false,
      isDay: null,
      isNight: null,
      loading: true
    }
  },
  created() {
    this.getCityWeather()
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen
    },
    toggleEdit() {
      this.edit = !this.edit
    },
    checkRoute() {
      this.addCityActive = this.$route.name === 'AddCity';
    },
    getCityWeather() {
      let firebaseDB = db.collection('cities');

      firebaseDB.onSnapshot(snap => {
        if (snap.docs.length === 0) this.loading = false
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === 'added') {
            try {
              // получаем города из апи в firebase
              const response = await axios
                  .get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&appid=${this.APIkey}&units=metric`)
              // пушим из апи в firebase store
              const data = response.data
              this.loading = true
              await firebaseDB.doc(doc.doc.id).update({
                currentWeather: data,
                id: doc.doc.id
              }).then(() => {
                this.cities.push(doc.doc.data())
                this.loading = false
              })
            } catch (error) {
              console.log(error)
            }
          } else if (doc.type === 'removed') {
            this.cities = this.cities.filter(city => city.id !== doc.doc.id)
          }
        })
      })
    },
    dayTime() {
      this.isDay = !this.isDay
    },
    nightTime() {
      this.isNight = !this.isNight
    },
    resetDays() {
      this.isDay = false;
      this.isNight = false;
    }
  },
  watch: {
    $route() {
      this.checkRoute()
    }
  }
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
