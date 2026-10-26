import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AssignedDeliveries = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: parcels = []} = useQuery({
        queryKey: ['parcels', user.email, 'rider-assigned' ],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=rider-assigned`)
            return res.data
        }
    })

    return (
        <div>
            assigned deliveries {parcels.length}
        </div>
    );
};

export default AssignedDeliveries;