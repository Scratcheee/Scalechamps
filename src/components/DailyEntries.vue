<template>
    <Card>
        <template #content>
            <span class="p-float-label">
                <InputNumber id="number-input" v-model="todaysWeightEntry" />
                <label for="number-input">Todays Weight</label>
                <button @click="handleWeight">Submit</button>
            </span>
            <span class="selectButton">
            <SelectButton v-model="workout" :options="workoutOptions" optionLabel="name" aria-labelledby="basic" @click="handleWorkout" />
        </span>
        <span>Last Update: {{-(lastEntry.weight - (todaysWeight === 0 ? lastEntry.weight : todaysWeight))}}</span>
        <br>
        <span>Overall: {{ -(startingWeight - (todaysWeight === 0 ? lastEntry.weight : todaysWeight)) }}</span>
       


        </template>
    </Card>
</template>

<script setup>
import { ref, computed } from 'vue'
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card';
import SelectButton from 'primevue/selectbutton';
import {useUserInfoStore} from '../stores/userInfoStore'

const props = defineProps(['lastEntry', 'todaysWeight', 'startingWeight'])
const userStore = useUserInfoStore()
const todaysWeightEntry = ref()
const workout = ref()
const workoutOptions = ref([ {name: 'Half', value: 0.5}, {name: 'Full', value: 1}])

const handleWorkout = () => {

    if(workout.value === null){
        workout.value = {name: 'None', value: 0}

    }
    userStore.submitWorkout(workout.value.value)
}

const handleWeight = () => {
    if(!todaysWeightEntry.value){
        console.log('enter value')
        return
    }

    userStore.submitWeight(todaysWeightEntry.value)
}






</script>

<style  scoped>

.selectButton {
    margin: 5px;
}
</style>