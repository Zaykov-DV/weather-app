<template>
  <main class="main">
    <div class="main__container">
      <Navigation :addCityActive="addCityActive"
                  :authPage="authPage"
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
      <Loading v-if="loading"/>
      <Footer v-if="!authPage"
              :addCityActive="addCityActive"
              v-on:add-city="toggleModal"
              v-on:edit-cities="toggleEdit"/>
    </div>
  </main>
</template>

<script setup>
import Navigation from "@/components/Navigation";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";
import Footer from "./components/Footer";

import axios from 'axios'
import db from './firebase/firebaseInit'
import firebase from "firebase/compat";
import 'firebase/auth'
import { getAuth } from "firebase/auth";

import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from "vue-router";

const APIkey = ref('215522eb8b33fb9868dcd0b9043f15c8')
const cities = ref([])
const citiesFilter = ref([])
const modalOpen = ref(false)
const edit = ref(false)
const addCityActive = ref(true)
const isDay = ref(null)
const isNight = ref(null)
const loading = ref(true)
const userId = ref('')
const isLoggedIn = ref(false)
const auth = ref(null)
const authPage = ref(false)

const route = useRoute()

onMounted(() => {
  getCityWeather()
})

watchEffect(() => {
  addCityActive.value = route.name === 'AddCity';
  authPage.value = route.name === 'Login' || route.name === 'Register' || route.name === 'NotFound'
})

const toggleModal = () => {
  modalOpen.value = !modalOpen.value
}

const toggleEdit = () => {
  edit.value = !edit.value
}

const getUserId = (data) => {
  userId.value = data;
}

const dayTime = () => {
  isDay.value = !isDay.value
}

const nightTime = () => {
  isNight.value = !isNight.value
}
const resetDays = () => {
  isDay.value = false;
  isNight.value = false;
}

const getCityWeather = () => {
  let firebaseDB = db.collection('cities')
  auth.value = getAuth();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn.value = true
      // User logged in already or has just logged in.
      console.log('User logged in or has just logged out.')
      userId.value = user.uid
      getUserId(user.uid)
    } else {
      isLoggedIn.value = false
      // User not logged in or has just logged out.
      console.log('User not logged in or has just logged out.')
    }
  });

  firebaseDB.onSnapshot(snap => {
    if (snap.docs.length === 0) loading.value = false
    snap.docChanges().forEach(async (doc) => {
      if (doc.type === 'added') {
        try {
          // получаем города из апи в firebase
          const response = await axios
              .get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&appid=${APIkey.value}&units=metric`)
          // пушим из апи в firebase store
          const data = response.data
          loading.value = true
          await firebaseDB.doc(doc.doc.id).update({
            currentWeather: data,
            id: doc.doc.id
          })
              .then(() => {
                cities.value.push(doc.doc.data())
              })
              .then(() => {
                citiesFilter.value = cities.value.filter((city) => {
                  return city.userId === userId.value
                })
              })
              .then(() => {
                loading.value = false
              })
        } catch (error) {
          console.log(error)
        }
      } else if (doc.type === 'removed') {
        citiesFilter.value = citiesFilter.value.filter(city => city.id !== doc.doc.id)
      }
    })
  })
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