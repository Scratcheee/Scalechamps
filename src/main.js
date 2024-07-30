import './assets/main.css'
import 'primevue/resources/themes/lara-dark-amber/theme.css'
import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'
import App from './App.vue'
import Home from './pages/Home.vue'
import useAuthUser from './lib/AuthUser'
// import Setup from './pages/Setup.vue'

const app = createApp(App)


const routes = [
    {
        path: '/',
        name: 'MainScreen',
        meta: {
            requiresAuth: true,
        },
        component: () => import('./pages/MainScreen.vue')
    },
    {
        path: '/setup',
        name: 'Setup',
        meta: {
            requiresAuth: true,
        },
        component: () => import('./pages/Setup.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./pages/Register.vue')
    },
    {
        name: 'EmailConfirmation',
        path: '/email-confirmation',
        component: () => import('./pages/EmailConfirmation.vue')

    },
    {
        name: 'ForgotPassword',
        path: '/forgot-password',
        component: () => import('./pages/ForgotPassword.vue')

    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('./pages/Login.vue')
    },
    {
        name: 'Data',
        path: '/data',
        component: () => import('./pages/Data.vue')

    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
        // here we check it the user is logged in
    // if they aren't and the route requries auth we redirect to the login page
    const {isLoggedIn} = useAuthUser();
    if(!isLoggedIn() && to.meta.requiresAuth) {
        return {name: 'Login'}
    }
})

app.use(createPinia())
app.use(PrimeVue);
app.use( router)

app.mount('#app')
