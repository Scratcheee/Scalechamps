<template>
    <div>
        <!-- <BarChart /> -->
        
        {{ useri }}
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BarChart from '@/components/BarChart.vue'
import { useUserInfoStore } from '@/stores/userInfoStore';

const userInfoStore = useUserInfoStore()

console.log(userInfoStore.userInfo)

const useri = computed(() => {
    return userInfoStore.userInfo.calorie_goal
})



</script>

<style lang="scss" scoped>

</style>