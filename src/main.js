import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";
import 'firebase/auth'


firebase.auth().onAuthStateChanged(() => {
    createApp(App).use(router).mount('#app')
})