// import axios from "axios";
// import { useEffect } from "react";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router";

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:3000'
// })

// const useAxiosSecure = () => {
//     const { user, logOut } = useAuth()
//     const navigate = useNavigate()

//     useEffect(() => {
//         // request interceptor
//         const reqInterceptor = axiosSecure.interceptors.request.use(config => {
//             config.headers.Authorization = `Bearer ${user.accessToken}`
//             return config
//         })
//         //response interceptor
//         const resInterceptor = axiosSecure.interceptors.response.use((response) => {
//             return response
//         }, (error) => {
//             console.log(error);
//             if (error.status === 401 || error.status === 403) {
//                 logOut().then(()=>{
//                     navigate('/signin')
//                 })
//             }
//             return Promise.reject(error)
//         })
//         return () => {
//             axiosSecure.interceptors.request.eject(reqInterceptor)
//             axiosSecure.interceptors.request.eject(resInterceptor)
//         }
//     }, [user, logOut, navigate ])
//     return axiosSecure;
// };

// export default useAxiosSecure;




import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (!user) {
                    return Promise.reject(
                        new Error("User is not authenticated")
                    );
                }
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    logOut()
                        .then(() => navigate("/signin"))
                        .catch((err) => console.error(err));
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
