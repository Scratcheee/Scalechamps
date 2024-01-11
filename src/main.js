import './assets/main.css'

import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import Home from './pages/Home.vue'
// import Setup from './pages/Setup.vue'

const app = createApp(App)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/setup',
        name: 'Setup',
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
        name: 'Login',
        path: '/login',
        component: () => import('./pages/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(createPinia())
app.use( router)

app.mount('#app')
