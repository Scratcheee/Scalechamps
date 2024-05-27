
<template>
    <div class="card">
        <Menubar :model="items" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import Menubar from 'primevue/menubar';
import useAuthUser from '@/lib/AuthUser';


const {logout} = useAuthUser()



const items = ref([
    {
        label: 'Home',
      
    },
    {
        label: 'Setup',
    },
    
    {
        label: 'Logout',
        command: () => {logout()}
    }
]);
</script>
