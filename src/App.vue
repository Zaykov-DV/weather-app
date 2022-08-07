<template>
  <main class="main">
    <div class="main__container">
      <Navigation v-if="!authPage"
                  v-on:add-city="toggleModal"
                  v-on:edit-cities="toggleEdit"
                  :auth="auth"
                  :addCityActive="addCityActive"
                  :userId="userId"
                  :isDay="isDay"
                  :isNight="isNight"/>
      <Modal v-show="modalOpen"
             v-on:close-modal="toggleModal"
             :cities="citiesFilter"
             :userId="userId"
             :APIkey="APIkey"/>
      <router-view v-if="!loading"
                   :cities="citiesFilter"
                   :edit="edit"
                   :APIkey="APIkey"
                   :isDay="isDay"
                   :isNight="isNight"
                   :userId="userId"
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
import Loading from "@/components/UI/Loading";
import firebase from "firebase/compat";
import 'firebase/auth'
// import AddCity from "./views/AddCity";
import {getAuth} from "firebase/auth";

export default {
  name: 'App',
  components: {
    // AddCity,
    Loading, Navigation, Modal
  },
  data() {
    return {
      APIkey: '215522eb8b33fb9868dcd0b9043f15c8',
      cities: [],
      citiesFilter: [],
      modalOpen: false,
      edit: false,
      addCityActive: true,
      isDay: null,
      isNight: null,
      loading: true,
      userId: '',
      isLoggedIn: false,
      auth: null,
      authPage: false
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
    checkAuthRoute() {
      this.authPage = this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'NotFound'
    },
    getUserId(data) {
      this.userId = data;
    },
    getCityWeather() {
      let firebaseDB = db.collection('cities')
      this.auth = getAuth();
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.isLoggedIn = true
          // User logged in already or has just logged in.
          console.log('User logged in or has just logged out.')
          console.log(user.uid);
          this.userId = user.uid
          this.$emit('getUserId', user.uid)
        } else {
          this.isLoggedIn = false
          // User not logged in or has just logged out.
          console.log('User not logged in or has just logged out.')
        }
      });

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
              })
                  .then(() => {
                    this.cities.push(doc.doc.data())
                  })
                  .then(() => {
                    this.citiesFilter = this.cities.filter((city) => {
                      return city.userId === this.userId
                    })
                  })
                  .then(() => {
                    this.loading = false
                  })
            } catch (error) {
              console.log(error)
            }
          } else if (doc.type === 'removed') {
            this.citiesFilter = this.citiesFilter.filter(city => city.id !== doc.doc.id)
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
      this.checkAuthRoute()
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