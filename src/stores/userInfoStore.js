import {defineStore} from 'pinia';
import {ref} from 'vue'
import useSupabase from '../lib/UseSupabase'

export const useUserInfoStore = defineStore("userInfo",() => {
    const {supabase} = useSupabase()
    const userInfo = ref([])
    const dailyInputs = ref([])
    const currentDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10)

    async function getUserInfo() {
        const { data } = await supabase.from('userdata').select('*')
        this.userInfo = data[0]

    }

    async function getDailyInputs() {
        const {data} = await supabase.from('dailyinputs').select('*')
        this.dailyInputs = data
 
    }



    return {getUserInfo, getDailyInputs, userInfo, dailyInputs}
})
