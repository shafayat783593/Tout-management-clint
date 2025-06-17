import axios from "axios";
import UseAuth from "./UseAuth";

const axiosInstance = axios.create({
    baseURL: "https://tour-management-server-ashen.vercel.app/",
})




function UseAxiosSecure() {
    const { logOut, user } = UseAuth()
    // intercept requests
    const token = user?.accessToken
    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config
    })
    axiosInstance.interceptors.response.use(res => res, err => {
        if (err.status === 401 || err.status === 403) {
            logOut().then(() => {
                // console.log(`You are logged out because of an errorn with  ${err.status} code`)
            }).catch(err => console.log(err))

        }

    })
    return axiosInstance
}

export default UseAxiosSecure
