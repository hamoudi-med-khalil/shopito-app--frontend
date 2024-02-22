import axios from 'axios';

const BACKEND = process.env.REACT_APP_BACKEND_URL

export const API_URL = `${BACKEND}/api/users/`




// Register Users

const register = async (userData) =>{
    const response = await axios.post(API_URL + '/register', userData )
    return response.data
}
// Loggin Users

const login = async (userData) =>{
    const response = await axios.post(API_URL + '/login', userData )
    return response.data
}
// Logout Users

const logout = async (userData) =>{
    const response = await axios.get(API_URL + '/logout')
    return response.data.message;
}
// Get login status Users

const getLoginStatus = async () =>{
    const response = await axios.get(API_URL + '/getloginstatus')
    return response.data;
}





const authService = {
    register, login, logout, getLoginStatus
}
export default authService