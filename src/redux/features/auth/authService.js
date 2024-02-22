import axios from 'axios';

const BACKEND = process.env.REACT_APP_BACKEND_URL

export const API_URL = `${BACKEND}/api/users/`




// Register Users

const register = async (userData) =>{
    const response = await axios.post(API_URL + '/register', userData )
    return response.data
}




const authService = {
    register
}
export default authService