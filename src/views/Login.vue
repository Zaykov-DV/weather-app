<template>
  <div class="auth">
    <div class="auth__container">
      <p class="auth__link">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h2 class="auth__title">Login to WeatherApp</h2>
      <form class="auth__inputs" >
        <div class="auth__input">
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <div class="auth__input">
          <input v-if="showPassword" type="text" placeholder="Password" v-model="password">
          <input v-else type="password" placeholder="Password" v-model="password">
          <div class="auth__icon" @click="toggleShow">
            <i v-if="showPassword" class="fa fa-solid fa-eye"></i>
            <i v-if="!showPassword" class="fa fa-solid fa-eye-slash"></i>
          </div>
        </div>
        <div class="auth__actions">
          <button class="auth__button" @click.prevent="signIn">Sign In</button>
          <button class="auth__button" @click="signInWithGoogle">
            <i class="auth__button-icon fab fa-google"></i>
            Sign in with Google
          </button>
        </div>
      </form>
      <span v-show="errorMessage !== ''">{{errorMessage}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const showPassword = ref(false)

const toggleShow = () => {
  showPassword.value = !showPassword.value;
}

const signIn = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        router.push({name: 'AddCity'});
        console.log('login')
        errorMessage.value = ''
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage.value = 'Invalid email';
            break;
          case 'auth/user-not-found':
            errorMessage.value = 'No account with that email was found';
            break;
          case 'auth/wrong-password':
            errorMessage.value = 'Incorrect password';
            break;
          default:
            errorMessage.value = 'Email or password was incorrect';
            break;
        }
      })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user)
        router.push({name: 'AddCity'});
      })
      .catch((error) => {
        errorMessage.value = error
      })
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

    &_register {
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 16px;
    }

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

  &__icon {
    position: absolute;
    right: 8px;
  }

  &__button {
    background-color: #fff;
    color: #222325;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    &:first-child {
      flex: 1;
      margin-right: 16px;
    }
  }

  &__button-icon {
    margin-right: 4px;
  }

  &__error {
    color: #ff7777;
    text-align: center;
    margin-bottom: 20px;
  }

  &__actions {
    display: flex;
    align-items: center;
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