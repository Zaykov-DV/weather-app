import { createRouter, createWebHistory } from 'vue-router'
import AddCity from '../views/AddCity.vue'
import Weather from '../views/Weather.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import MainPage from '../views/MainPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/main/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: '/main/weather/:city',
        name: 'Weather',
        component: Weather
      },
      {
        path: '/main/',
        name: 'AddCity',
        component: AddCity
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
