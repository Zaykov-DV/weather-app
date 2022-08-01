import {createRouter, createWebHistory} from 'vue-router'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import AddCity from '../views/AddCity.vue'
import Weather from '../views/Weather.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from "../views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/',
            name: 'AddCity',
            component: AddCity,
            beforeEnter(to, from, next) {
                getCurrentUser ? next() : next('/login')
            },
            meta: {
                requiresAuth: true
            },
        },
        {
            path: '/weather/:city',
            name: 'Weather',
            component: Weather,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/:CatchAll(.*)',
            name: 'NotFound',
            component: NotFound,
        }
    ]
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user)
            },
            reject
        )
    })
}

router.beforeEach(async function (to, from, next) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next(true);
        } else {
            // alert('you dont have access')
            next({path: '/login'})
        }
    } else {
        next()
    }
})


export default router
