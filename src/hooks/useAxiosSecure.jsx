import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // request interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user.accessToken}`
            return config
        })
        //response interceptor
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response
        }, (error) => {
            console.log(error);
            if (error.status === 401 || error.status === 403) {
                logOut().then(()=>{
                    navigate('/signin')
                })
            }
            return Promise.reject(error)
        })
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.request.eject(resInterceptor)
        }
    }, [user])
    return axiosSecure;
};

export default useAxiosSecure;