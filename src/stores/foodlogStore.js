import {defineStore} from 'pinia';
import {ref} from 'vue'
import useSupabase from '../lib/UseSupabase'

export const useFoodLogStore = defineStore("foodlog",() => {
    const {supabase} = useSupabase()
    const user = ref()
    const foodlog = ref([])
    const currentDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10)

    async function getUser() {

    const { data: { user } } = await supabase.auth.getUser()
    this.user = user



    }
    async function getFoodlog() {
        const { data } = await supabase.from('foodlog').select('*')
        this.foodlog = data

    }

    async function logEntry(entry) {
        entry.date = currentDate
        entry.user_id = this.user.id
        const { data, error } = await supabase
        .from("foodlog")
        .insert([entry])
        .select();
      if (data) {
        this.foodlog.push(data[0]);
      }
  
      if (error) {
        console.error(error);
      }


    }



    return {foodlog, currentDate, getFoodlog, getUser, logEntry}
})
