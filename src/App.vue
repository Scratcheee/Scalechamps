<script setup>
import { useFoodLogStore } from './stores/foodlogStore';
import {useUserInfoStore} from './stores/userInfoStore'
import { ref, onMounted, computed } from 'vue'

const foodLogStore = useFoodLogStore()
const userInfoStore = useUserInfoStore()




  onMounted(() => {
    foodLogStore.getFoodlog()
    foodLogStore.getUser()
    userInfoStore.getUserInfo()
    userInfoStore.getDailyInputs()

  })

  const todaysMeals = computed(() => {
    return foodLogStore.foodlog.filter(obj => obj.date === foodLogStore.currentDate)
  })

  const todaysCals = computed(() => {
    return todaysMeals.value.reduce((sum, item) => sum + item.calories, 0);
  })
</script>
  
<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/setup">Setup</router-link> -->


  </div>
  <router-view></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
