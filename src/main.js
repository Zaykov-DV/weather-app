import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase/compat";
import 'firebase/auth'


firebase.auth().onAuthStateChanged(() => {
    createApp(App).use(router).mount('#app')
})