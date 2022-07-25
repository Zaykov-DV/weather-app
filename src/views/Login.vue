<template>
  <div class="auth">
    <form class="auth__container">
      <p class="auth__link">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h2 class="auth__title">Login to WeatherApp</h2>
      <div class="auth__inputs">
        <div class="auth__input">
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <div class="auth__input">
          <input type="password" placeholder="Password" v-model="password">
        </div>
        <div class="auth__error" v-show="error">{{ this.errorMessage }}</div>
      </div>
      <button class="auth__button" @click.prevent="signIn">Sign In</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import 'firebase/auth'

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      error: null,
      errorMessage: '',
      userId: '',
    }
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({name: 'MainPage'});
            console.log('login')
            this.error = false;
            this.errorMessage = ''
          })
          .catch((err) => {
            this.error = true;
            this.errorMessage = err.message
          })
    },
  }
}
</script>

<style lang="scss">
.auth {

  &__container {
    background: #313640;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
  }

  &__link {
    color: #fff;
    margin-bottom: 30px;

    .router-link {
      color: #5dbaf6;
      text-decoration: none;
    }
  }

  &__title {
    color: #fff;
    margin-bottom: 20px;
  }

  &__inputs {
    width: 80%;
  }

  &__input {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;

    input {
      width: 100%;
      border: none;
      background-color: #f2f7f6;
      padding: 4px 4px 4px 30px;
      height: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

      &:focus {
        outline: none;
      }
    }
  }

  &__button {
    background-color: #fff;
    color: #222325;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &__error {
    color: #ff7777;
    text-align: center;
    margin-bottom: 20px;
  }
}


.forgot-password {
  text-decoration: none;
  color: #000;
  cursor: pointer;
  font-size: 14px;
  margin: 16px 0 32px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease all;

  &:hover {
    border-color: #303030;
  }
}

</style>