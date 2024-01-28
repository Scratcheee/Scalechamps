<template>
  <div>
    {{ foodLogStore.currentDate }}
    <br>
    {{ remainingCals }} Remaining




  </div>
  <DailyEntries :dailyInputs="userInfoStore.dailyInputs" :lastEntry="lastEntry" :todaysWeight="todaysWeight" :startingWeight="userInfoStore.userInfo.starting_weight" />
  <EntryForm />
  <FoodTable :todaysMeals='todaysMeals' />
</template>

<script setup>
import { useFoodLogStore } from '../stores/foodlogStore';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { ref, onMounted, computed } from 'vue'
import FoodTable from '@/components/FoodTable.vue';
import EntryForm from '@/components/EntryForm.vue';
import DailyEntries from '@/components/DailyEntries.vue'


const foodLogStore = useFoodLogStore()
const userInfoStore = useUserInfoStore()

const startingWeight = ref()
// startingWeight = userInfoStore.userInfo[0]

const remainingCals = computed(() => {
  return userInfoStore.userInfo.calorie_goal - todaysCals.value
})
const todaysMeals = computed(() => {
  return foodLogStore.foodlog.filter(obj => obj.date === foodLogStore.currentDate)
})
const todaysCals = computed(() => {
  return todaysMeals.value.reduce((sum, item) => sum + item.calories, 0);
})



const lastEntry = computed(() => {
  if (userInfoStore.dailyInputs.length === 0) {
    return 0
  } else {
    const mostRecent = userInfoStore.dailyInputs.filter(entry => entry.date !== foodLogStore.currentDate).reduce((mostRecent, current) => {
      const mostRecentDate = new Date(mostRecent.date)
      const currentDate = new Date(current.date)

      return currentDate > mostRecentDate ? current : mostRecent
    })
    return mostRecent
  }
})

const todaysWeight = computed(() => {
  const today = userInfoStore.dailyInputs.filter(entry => entry.date === foodLogStore.currentDate)
  if(today.length === 0) {
    return 0
  } else {
 
    return today[0].weight
  }
  
})

</script>

<style lang="scss" scoped></style>