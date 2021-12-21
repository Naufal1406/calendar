import axios from "axios"

const baseURL = process.env.SQISCHEDULE_DATABASE_URL;

const axiosInstance = axios.create({
    baseURL : baseURL
})

export default axiosInstance;