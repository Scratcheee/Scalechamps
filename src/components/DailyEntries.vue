<template>
    <Card>
        <template #content>
            <span class="p-float-label">
                <InputNumber id="number-input" v-model="todaysWeightEntry" />
                <label for="number-input">Todays Weight</label>
            </span>
            <span class="selectButton">
            <SelectButton v-model="workout" :options="workoutOptions" aria-labelledby="basic" />
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

const props = defineProps(['lastEntry', 'todaysWeight', 'startingWeight'])

const todaysWeightEntry = ref()
const workout = ref()
const workoutOptions = ref(['Half', 'Full'])






</script>

<style  scoped>

.selectButton {
    margin: 5px;
}
</style>