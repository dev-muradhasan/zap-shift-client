// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useRole = () => {
//     const {user} = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const {isLoading: roleLoading, data: role = 'user'} = useQuery({
//         queryKey: ['user-role', user.email],
//         queryFn: async()=>{
//             const res = await axiosSecure.get(`/users/${user.email}/role`)
//             return res.data.role;
//         }
//     })

//     return { role, roleLoading };
// };

// export default useRole;


import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        isLoading: roleLoading,
        data: role = "user",
        error,
    } = useQuery({
        queryKey: ["user-role", user?.email],

        enabled: !!user?.email,

        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users/${user.email}/role`
            );

            return res.data.role;
        },
    });

    return { role, roleLoading, error };
};

export default useRole;
