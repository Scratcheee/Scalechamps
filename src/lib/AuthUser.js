import {ref} from 'vue'

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null)

export default function useAuthUser() {
    //login with email and password
    const login = async ({email, password}) => {}

    //login with social provider
    const loginWithSocialProvider = (provider) => {};

    //logout
    const logout = async () => {}

    //check if user is logged in
    const isLoggedIn = () => {}

    //register
    const register = ({email, password, ...meta}) => {}

    //update email, password or meta data
    const update = async (data) => {}

    //send password recovery
    const sendPasswordRestEmail = async (email) => {}

    return {user, login, loginWithSocialProvider, logout, isLoggedIn, register, update, sendPasswordRestEmail}
}