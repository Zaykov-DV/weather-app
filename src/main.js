import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase/compat";
import 'firebase/auth'
import { createI18n } from 'vue-i18n'
import messages from './assets/i18n/index.js'


const i18n = createI18n({
    locale: 'en', // set locale
    fallbackLocale: 'ru', // set fallback locale
    messages, // set locale messages
})

firebase.auth().onAuthStateChanged(() => {
    createApp(App).use(i18n).use(router).mount('#app')
})