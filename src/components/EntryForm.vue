<template>
    <Card class="card">
        <template #content >
        <form action="">
            <span class="p-float-label">
                <InputText id="food" v-model="food" />
                <label for="food">Food/Drink</label>
            </span>
            
            <span class="p-float-label">
                <InputNumber id="calories" v-model="calories" />
                <label for="calories">Calories</label>
            </span>
            <span class="p-float-label">
                <InputText id="type" v-model="type" />
                <label for="type">Type</label>
            </span>

            <span class="p-float-label">
                <InputNumber id="hunger" v-model="hunger" :min="0" :max="3" />
                <label for="hunger">Hunger</label>
            </span>

            <Button label="Submit" id="submitButton" @click.prevent="handleSubmit" />
        </form>
    </template>
    </Card>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { ref } from 'vue'
import {useFoodLogStore} from  '../stores/foodlogStore'
import {useUserInfoStore} from '../stores/userInfoStore'

const foodStore = useFoodLogStore()
const userStore = useUserInfoStore()
const food = ref()
const calories = ref()
const type = ref()
const hunger = ref()

const handleSubmit = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date()
    const localTime = date.toLocaleTimeString('en-US', { timeZone: userTimezone });

    // foodStore.logEntry({name: food.value, calories: calories.value, type: type.value.toLowerCase(), hunger: hunger.value, time: localTime})
    
    if(!food.value || !calories.value || !type.value || !hunger.value) {
        console.log('no entry')
    } else{
    userStore.submitMeal({name: food.value, calories: calories.value, type: type.value.toLowerCase(), hunger: hunger.value,})

    }


}


</script>

<style scoped>
span {
    margin-top: 20px;
}

#submitButton {
    margin: 5px;
}

.card {
    margin-top: 10px;
}
</style>