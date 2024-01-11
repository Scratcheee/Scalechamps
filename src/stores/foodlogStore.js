import {defineStore} from 'pinia';
import {ref} from 'vue'
import {supabase} from '../lib/UseSupabase'

export const useFoodLogStore = defineStore("foodlog",() => {
    const foodlog = ref(['testing', 'hello'])
    const currentDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10)

    async function getFoodlog() {
        const { data } = await supabase.from('testfoodlog').select('*')
        this.foodlog = data
        // console.log(this.foodlog)
    }



    return {foodlog, currentDate, getFoodlog}
})
