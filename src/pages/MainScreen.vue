<template>
            <RouterLink to="/setup"><Button><i class="pi pi-cog"></i></Button></RouterLink>
  <div>
    {{ foodLogStore.currentDate }}
    <br>
    {{ remainingCals }} Remaining




  </div>
  <DailyEntries :dailyInputs="userInfoStore.dailyInputs" :lastEntry="lastEntry" :todaysWeight="todaysWeight" :startingWeight="userInfoStore.userInfo.starting_weight" />
  <EntryForm />
  <FoodTable :todaysMeals='lastEntry.meals' />
</template>

<script setup>
import { useFoodLogStore } from '../stores/foodlogStore';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { ref, onMounted, computed } from 'vue'
import FoodTable from '@/components/FoodTable.vue';
import EntryForm from '@/components/EntryForm.vue';
import DailyEntries from '@/components/DailyEntries.vue'
import Button from 'primevue/button';



const foodLogStore = useFoodLogStore()
const userInfoStore = useUserInfoStore()

const startingWeight = ref()
// startingWeight = userInfoStore.userInfo[0]

const remainingCals = computed(() => {
  return userInfoStore.userInfo.calorie_goal - todaysCals.value
})

const todaysCals = computed(() => {
  return userInfoStore.todaysMeals.reduce((sum, item) => sum + item.calories, 0);
})



const lastEntry = computed(() => {
  console.log(userInfoStore.currentDate)
  const todaysEntry = userInfoStore.dailyInputs.filter(entry => entry.date === userInfoStore.currentDate)

  if(userInfoStore.dailyInputs.length === 0) {
    
    return {}
  }
   if(todaysEntry.length === 1){
    return todaysEntry[0]
  }
  return {}
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