import axios from 'axios';

// =========== FETCH API SERVER
// const BACKEND_SERVER = "https://marn-api-login-register.onrender.com/"
const API_URL_REGISTER = 'https://marn-api-login-register.onrender.com/api/users/'
const API_URL_LOGIN = 'https://marn-api-login-register.onrender.com/api/users/login'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL_REGISTER, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL_LOGIN, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    register,
    login,
    logout
}

export default authService;