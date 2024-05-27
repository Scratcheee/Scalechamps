<template>
    <RouterLink to="/"><Button><i class="pi pi-home"></i></Button></RouterLink>

    <div>

        <div class="flex justify-center items-center mt-3 card">

            <div class="flex flex-col justify-center">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div class="field">
                        <label class="label">Date starting</label>
                        <div class="control">
                            <input v-model="startingDate" class="input" type="date" placeholder="Text input" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Sex</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="sex" required>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Current Weight</label>
                        <div class="control">
                            <input class="input" type="number" placeholder="Text input" v-model="currentWeight"
                                step="0.01" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Goal Weight</label>
                        <div class="control">
                            <input class="input" type="number" placeholder="Text input" v-model="goalWeight" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Height</label>
                        <div class="flex">
                            <div class="control">
                                <input class="input" type="number" placeholder="Feet" v-model="heightFt" required>
                            </div>
                            <div class="control">
                                <input class="input" type="number" placeholder="Inches" v-model="heightIn" required>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Age</label>
                        <div class="control">
                            <input class="input" type="number" placeholder="Text input" v-model="age" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Weight change per week</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="weeklyChange" required>
                                    <option>-1</option>
                                    <option>-0.5</option>
                                    <option>0</option>
                                    <option>0.5</option>
                                    <option>1</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Daily Activity Level</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="activity" required>
                                    <option :value=1.2>Sedentary</option>
                                    <option :value=1.375>Lightly Active</option>
                                    <option :value=1.55>Moderatly Active</option>
                                    <option :value=1.725>Very Active</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Workout Calories</label>
                        <div class="control">
                            <input class="input" type="number" placeholder="Text input" v-model="workout_cal" required>
                        </div>
                    </div>

                </div>
                <div class="control flex justify-center mt-10">
                    <button type="button" class="button bg-blue-300" @click="() => {
                                showBmr = true
                                handleSubmit()
                            }">Calculate</button>
                </div>
                <div class="control flex justify-center mt-10">
                    <button type="submit" text="Save" class="w-full" >save </button>
                </div>
                <!-- <div v-if="showBmr">
                    <div>Base Metabolism Rate: {{ Math.floor(calculateBMR(sex)) }} Calories</div>
                    <div>Daily Calories to eat: {{ Math.floor(calculateTotalCal(calculateBMR(sex))) }} Calories</div>
                </div> -->



            </div>


        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import {useUserInfoStore} from '../stores/userInfoStore'

const userStore = useUserInfoStore()

const startingDate = ref('')
const sex = ref('')
const currentWeight = ref('')
const goalWeight = ref('')
const heightIn = ref('')
const heightFt = ref('')
const weeklyChange = ref('')
const activity = ref('')
const age = ref('')
const workout_cal = ref('')

const calculateTotalCals = (sex) => {
    let bmr = 0
    if (sex === 'Male') {
        bmr =  (4.536 * currentWeight.value) + (15.88 * ((heightFt.value * 12) + heightIn.value)) - (5 * age.value) + 5
    } else if (sex === 'Female') {
        bmr = (4.536 * currentWeight.value) + (15.88 * ((heightFt.value * 12) + heightIn.value)) - (5 * age.value) - 161

    }
    return Math.floor(bmr * activity.value + (weeklyChange.value * 500)) 
}

const handleSubmit = () => {
    const totalCals = calculateTotalCals(sex.value)

    userStore.submitSettings({
        starting_date: startingDate.value,
        starting_weight: currentWeight.value,
        sex: sex.value,
        goal_weight: parseInt(goalWeight.value),
        height_in: parseInt((heightFt.value * 12) + heightIn.value),
        age: parseInt(age.value),
        weekly_change: parseFloat(weeklyChange.value),
        activity_level: activity.value,
        calorie_goal: totalCals,
        workout_cal: workout_cal.value
    })

}



</script>

<style scoped>
.card {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 12px;
    margin: 20px 0px 20px 0px;
}
</style>