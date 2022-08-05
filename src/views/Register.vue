<template>
  <div class="auth">
    <div class="auth__container">
      <p class="auth__link">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2 class="auth__title">Create Your Account</h2>
      <form class="auth__inputs" @submit.prevent="submitForm">
        <!--@TODO reusable form input components-->
        <div class="auth__input auth__input_register">
          <input type="text" placeholder="Username" v-model="formData.username">
          <span class="register__error" v-for="error in v$.username.$errors" :key="error.$uid">{{ error.$message }}</span>
        </div>
        <div class="auth__input auth__input_register">
          <input type="text" placeholder="Email" v-model="formData.email">
          <span class="register__error" v-for="error in v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>
        </div>
        <div class="auth__input auth__input_register">
          <input v-if="showPassword" type="text" class="input" v-model="formData.password"/>
          <input v-else type="password" placeholder="Password" v-model="formData.password">
          <div class="auth__icon" @click="toggleShow">
           <i v-if="showPassword" class="fa fa-solid fa-eye"></i>
            <i v-if="!showPassword" class="fa fa-solid fa-eye-slash"></i>
          </div>
          <span class="register__error" v-for="error in v$.password.$errors" :key="error.$uid">{{ error.$message }}</span>
        </div>
        <div class="auth__input auth__input_register">
          <input type="password" placeholder="Confirm password" v-model="formData.confirmPassword">
          <span class="register__error" v-for="error in v$.confirmPassword.$errors" :key="error.$uid">{{ error.$message }}</span>
        </div>
        <div class="auth__actions">
          <button class="auth__button" type="submit">Sign Up</button>
          <button class="auth__button" @click="signInWithGoogle">
            <i class="auth__button-icon fab fa-google"></i>
            Sign in with Google</button>
        </div>
      </form>
      <span class="auth__error">{{ errorMsg }}</span>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, computed} from 'vue'
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useRouter} from 'vue-router'
import useVuelidate from '@vuelidate/core'
import {minLength, required, sameAs, email, helpers} from '@vuelidate/validators'
import db from "../firebase/firebaseInit";

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMsg = ref('')
const showPassword = ref(false)
const router = useRouter()

const rules = computed(() => {
  return {
    username: {required, minLength: minLength(4)},
    email: {required, email},
    password: {required, minLength: helpers.withMessage('password must contain 6 symbols', minLength(6))},
    confirmPassword: {required, sameAs: sameAs(formData.password)},
  }
})

const v$ = useVuelidate(rules, formData)


const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    await register()
  } else {
    errorMsg.value = 'error, form not submittet'
  }
}

const toggleShow = () => {
  showPassword.value = !showPassword.value;
}

const register = async () => {
  const auth = await getAuth()
  const createUser = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
  const result = await createUser;
  const dataBase = db.collection('users').doc(result.user.uid)
  await dataBase.set({
    email: formData.email,
    username: formData.username
  })
      .then(() => {
        console.log('Successfully registered')
        router.push({name: 'AddCity'})
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMsg.value = 'Invalid email';
            break;
          case 'auth/user-not-found':
            errorMsg.value = 'No account with that email was found';
            break;
          case 'auth/wrong-password':
            errorMsg.value = 'Incorrect password';
            break;
          default:
            errorMsg.value = 'Email or password was incorrect';
            break;
        }
      })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)

      .then((result) => {
        console.log(result.user)
        router.push({name: 'AddCity'})
      })
      .catch((error) => {
        errorMsg.value = error
      })
}

</script>