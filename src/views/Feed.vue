<template>
    <div>
        feed
    </div>
</template>

<script setup>
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useRouter} from 'vue-router'
import {onBeforeUnmount} from 'vue'

const router = useRouter()
const authListener = onAuthStateChanged(getAuth(), function(user) {
    if(!user) {
        //not logged in
        alert('you must be logged in')
        router.push('/')
    }
})

onBeforeUnmount(() => {
    //clear up listener
    authListener()
})
</script>

<style scoped>

</style>