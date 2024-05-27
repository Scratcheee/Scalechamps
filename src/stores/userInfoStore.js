import { defineStore } from "pinia";
import { ref } from "vue";
import useSupabase from "../lib/UseSupabase";

export const useUserInfoStore = defineStore("userInfo", () => {
  const { supabase } = useSupabase();
  const userInfo = ref([]);
  const user = ref()
  const dailyInputs = ref([]);
  const todaysId = ref(false);
  const todaysMeals = ref([]);
  const currentDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .slice(0, 10);

  const defEntry = ref({
    weight: 0,
    workout: 0,
    calorie_count: 0,
    meals: null,
    date: currentDate,
  });

  async function getUserInfo() {
    const { data } = await supabase.from("userdata").select("*");
    this.userInfo = data[0];
  }

  async function getUser() {

    const { data: { user } } = await supabase.auth.getUser()
    this.user = user
    console.log(this.user)



    }

  async function getDailyInputs() {
    const { data } = await supabase.from("dailyinputs").select("*");
    this.dailyInputs = data;
    let todays = this.dailyInputs.filter((entry) => entry.date == currentDate);
    if (todays.length === 1) {
      this.todaysId = todays[0].id;
      this.todaysMeals = todays[0].meals;
    }
    console.log(this.todaysMeals);
  }

  async function submitSettings(entry) {
    console.log(entry);
    console.log(this.userInfo);

    if (!this.userInfo) {
      // create new entry
      console.log("new entry");
      entry.user_id = this.user.id
      const { data, error } = await supabase
      .from("userdata")
      .insert(entry)
      .select();
    if (data) {
      this.userInfo = data[0];
    }

    if (error) {
      console.error(error);
    }
    } else {
      //update entry
      const { data, error } = await supabase
      .from("userdata")
      .update({
        starting_date: entry.starting_date,
        starting_weight: entry.starting_weight,
        goal_weight: entry.goal_weight,
        height_in: entry.height_in,
        age: entry.age,
        weekly_change: entry.weekly_change,
        activity_level: entry.activity_level,
        calorie_goal: entry.calorie_goal,
        sex: entry.sex,
        workout_cal: entry.workout_cal,
      })
      .eq("user_id", this.userInfo.user_id)
      .select();
    }
  }

  async function submitMeal(entry) {
    console.log(entry.name);

    if (!this.todaysId) {
      //create new entry
      this.todaysMeals = [];
      this.todaysMeals.push(entry);
      defEntry.value.meals = this.todaysMeals;
      defEntry.value.user_id = userInfo.value.user_id;
      const { data, error } = await supabase
        .from("dailyinputs")
        .insert(defEntry.value)
        .select();
      if (data) {
        this.todaysId = data[0].id;
      }

      if (error) {
        console.error(error);
      }
    } else {
      // update entry
      this.todaysMeals.push(entry);
      const { data, error } = await supabase
        .from("dailyinputs")
        .update({ meals: this.todaysMeals })
        .eq("id", this.todaysId)
        .select();
    }
  }

  async function submitWorkout(entry) {
    if (!this.todaysId) {
      //create new entry
      defEntry.value.workout = entry;
      defEntry.value.user_id = userInfo.value.user_id;

      //create new entry
      const { data, error } = await supabase
        .from("dailyinputs")
        .insert(defEntry.value)
        .select();
      if (data) {
        this.todaysId = data[0].id;
      }

      if (error) {
        console.error(error);
      }
    } else {
      // update entry
      const { data, error } = await supabase
        .from("dailyinputs")
        .update({ workout: entry })
        .eq("id", this.todaysId)
        .select();
    }
  }

  async function submitWeight(entry) {
    console.log(this.todaysId);
    if (!this.todaysId) {
      defEntry.value.weight = entry;
      defEntry.value.user_id = userInfo.value.user_id;

      //create new entry
      const { data, error } = await supabase
        .from("dailyinputs")
        .insert(defEntry.value)
        .select();
      if (data) {
        this.todaysId = data[0].id;
      }

      if (error) {
        console.error(error);
      }
    } else {
      //update entry
      const { data, error } = await supabase
        .from("dailyinputs")
        .update({ weight: entry })
        .eq("id", this.todaysId)
        .select();
    }
  }

  return {
    getUserInfo,
    getDailyInputs,
    userInfo,
    currentDate,
    dailyInputs,
    todaysId,
    todaysMeals,
    submitWeight,
    submitWorkout,
    submitMeal,
    submitSettings,
    getUser,
  };
});
