<template>
    <div >
      <form @submit.prevent="handleLogin">
        <h1 >Login</h1>
        <label>Email <input v-model="form.email" type="email" /></label>
        <label>Password <input v-model="form.password" type="password" /></label>
        <button>Login</button>
        <router-link to="/forgotPassword">Forgot Password?</router-link>
      </form>
      <div >
        <a @click.prevent="handleLogin('github')">Github</a>
      </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import useAuthUser from '@/lib/AuthUser';
import {useRouter} from 'vue-router'

//use necessary composables
const router = useRouter()
const {login, loginWithSocialProvider} = useAuthUser()

//keep up with form data
const form = ref({
    email: '',
    password: '',
})

//call proper login method from authuser composable

const handleLogin = async (provider) => {
    try {
        await login(form.value)
        router.push({name: 'MainScreen'})
    } catch(error) {
        alert(error.message)
    }
}

</script>