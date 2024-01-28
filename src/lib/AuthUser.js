import {ref} from 'vue'
import useSupabase from './UseSupabase'

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null)

export default function useAuthUser() {

    const {supabase} = useSupabase()
   
    //login with email and password
    const login = async ({email, password}) => {
        console.log('logging in')
        const {user, error} = await supabase.auth.signInWithPassword({email, password})
        if(error) throw error
        console.log(user)
        return user
    }

    //login with social provider
    const loginWithSocialProvider = (provider) => {};

    //logout
    const logout = async () => {}

    //check if user is logged in
    const isLoggedIn = () => {
        return !!user.value
    }

    //register
    const register = ({email, password, ...meta}) => {}

    //update email, password or meta data
    const update = async (data) => {
        
    }

    //send password recovery
    const sendPasswordRestEmail = async (email) => {}

    return {user, login, loginWithSocialProvider, logout, isLoggedIn, register, update, sendPasswordRestEmail}
}