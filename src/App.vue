<script setup>
import { useFoodLogStore } from './stores/foodlogStore';
import { ref, onMounted, computed } from 'vue'
import { supabase } from './lib/UseSupabase'

const foodLogStore = useFoodLogStore()


  const foodlog = ref([])

  async function getFoodlog() {
    const { data } = await supabase.from('testfoodlog').select('*')
    foodlog.value = data
  }

  onMounted(() => {
    foodLogStore.getFoodlog()
  })

  const todaysMeals = computed(() => {
    console.log(foodLogStore.foodlog)
    return foodLogStore.foodlog.filter(obj => obj.date === foodLogStore.currentDate)
  })
</script>
  
<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/setup">Setup</router-link> -->
    {{ foodLogStore.currentDate }}
    <!-- {{ foodLogStore.foodlog }} -->
    <div>
        <table class="table rounded-xl my-6 ">
        <thead class="">
          <tr>
            <th>Name</th>
            <th>calories</th>
            <th>Type</th>
            <th>hunger</th>
            <th>date</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in todaysMeals" :key="index">
            <td>{{ entry.name }}</td>
            <td>{{ entry.calories }}</td>
            <td>{{ entry.type }}</td>
            <td>{{ entry.hunger }}</td>
            <td>{{ entry.date }}</td>


          </tr>
        </tbody>
      </table>
    </div>

  </div>
  <!-- <router-view></router-view> -->
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
