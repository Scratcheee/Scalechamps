import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages/Home.vue'
import Setup from '../pages/Setup.vue'
import EmailConfirmation from '../pages/EmailConfirmation.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/setup',
        name: 'Setup',
        component: Setup
    },
    {
        path: '/email-confirmation',
        name: 'EmailConfirmation',
        component: EmailConfirmation
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router