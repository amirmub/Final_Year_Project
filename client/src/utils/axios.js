import axios from "axios"

const axiosInstance = axios.create({
    baseURL : "https://final-year-project-vyai.onrender.com/api/v1"
})

export default axiosInstance