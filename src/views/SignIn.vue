<template>
    <h1>Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signIn">Submit</button></p>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
    import { useRouter } from 'vue-router'

const router = useRouter()
    const email = ref('')
    const password = ref('')
    const signIn = () => {
        signInWithEmailAndPassword(getAuth(),email.value, password.value)
        .then((data) => {
            console.log('successfully logged in!')
            router.push('/feed')
        })
        .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
              errMsg.value = 'Invalid email'
              break
          case 'auth/user-not-found':
              errMsg.value = 'No account with that email was found'
              break
          case 'auth/wrong-password':
              errMsg.value = 'Incorrect password'
              break
          default:
              errMsg.value = 'Email or password was incorrect'
              break
        }
      });
    }
  </script>
<style scoped>

</style>