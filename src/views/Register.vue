<template>
  <div class="auth">
    <form class="auth__container">
      <p class="auth__link">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2 class="auth__title">Create Your Account</h2>
      <div class="auth__inputs">
        <div class="auth__input">
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <div class="auth__input">
          <input type="password" placeholder="Password" v-model="password">
        </div>
        <div class="auth__error" v-show="error">{{ this.errorMessage }}</div>
      </div>
      <button class="auth__button" @click.prevent="register">Sign Up</button>
    </form>
  </div>
</template>

<script>

import firebase from "firebase/app";
import 'firebase/auth'
import db from '../firebase/firebaseInit'

export default {
  name: "Register",
  data() {
    return {
      email: '',
      password: '',
      error: null,
      errorMessage: ''
    }
  },
  methods: {
    async register() {
      if (this.email !== '' && this.password !== '') {
        this.error = false;
        this.errorMessage = ''
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
        const result = await createUser;
        const dataBase = db.collection('users').doc(result.user.uid)
        await dataBase.set({
          email: this.email,
        })
        .then(() => {
          this.$router.push({name: 'MainPage'})
        })

      }
      this.error = true
      this.errorMessage = 'Please fill out all the fields!'
    }
  }
}
</script>