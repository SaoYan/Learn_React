import Axios from "axios";

const apiKey = "AIzaSyCaM8agT0NZM6arA0v_WGqPURUeEf1n28U";

export const dataClient = Axios.create({
    baseURL: "https://burger-builder-a1b08.firebaseio.com"
});

export const refreshTokenClient = Axios.create({
    baseURL: `https://securetoken.googleapis.com/v1/token?key=${apiKey}`
});

export const resetPasswordClient = Axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`
});

export const signInClient = Axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
});

export const signUpClient = Axios.create({
    baseURL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
});

export default Axios;