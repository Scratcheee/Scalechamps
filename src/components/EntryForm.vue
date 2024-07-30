<template>
    <Card class="card">
        <template #content >
            <Message severity="success" v-if="entrySuccess">Meal logged</Message>
            <Message severity="error" v-if="entryFail">Meal not logged</Message>

        <form action="">
            <span class="p-float-label">
                <InputText id="food" v-model="food" />
                <label for="food">Food/Drink</label>
            </span>
            
            <span class="p-float-label">
                <InputNumber id="calories" v-model="calories" />
                <label for="calories">Calories</label>
            </span>
            <span class="">
                <label for="type">Type</label>
                <SelectButton v-model="typeValue" :options="typeOptions" aria-labelledby="basic" />
            </span>
            <span class="">
                <label for="type">Hunger</label>
                <SelectButton v-model="hungerValue" :options="hungerOptions" aria-labelledby="basic" />
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
import SelectButton from 'primevue/selectbutton';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { ref } from 'vue'
import {useFoodLogStore} from  '../stores/foodlogStore'
import {useUserInfoStore} from '../stores/userInfoStore'
import Message from 'primevue/message';

const foodStore = useFoodLogStore()
const userStore = useUserInfoStore()
const food = ref()
const calories = ref()
const type = ref()
const hunger = ref()
const typeValue = ref();
const typeOptions = ref(['Meal', 'Snack', 'Drink']);
const hungerValue = ref();
const hungerOptions = ref([0,1,2,3]);
const entryFail = ref(false)
const entrySuccess = ref(false)


const handleSubmit = () => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date()
    const localTime = date.toLocaleTimeString('en-US', { timeZone: userTimezone });

    // foodStore.logEntry({name: food.value, calories: calories.value, type: type.value.toLowerCase(), hunger: hunger.value, time: localTime})
    
    if(!food.value || calories.value === null || calories.value < 0 || !typeValue.value || hungerValue.value === null) {
        console.log('no entry')
        // entryFail.value = true
    } else{

    userStore.submitMeal({name: food.value.toLowerCase(), calories: calories.value, type: typeValue.value.toLowerCase(), hunger: hungerValue.value,})

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