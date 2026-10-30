import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading"


const TrackParcel = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();

    const { data: trackings = [], isLoading,  } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const result = await axiosInstance.get(`/trackings/${trackingId}/logs`);
            return result.data;
        }
    })



    if (isLoading) {
        return <Loading></Loading>;
    }


    return (

        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                Track Your Parcel
            </h2>

            <p className="text-gray-500 mb-5">
                Tracking ID: <span className="font-semibold text-primary">{trackingId}</span>
            </p>

            {trackings.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                    No tracking history found.
                </p>
            ) : (
                    <ul className="timeline timeline-vertical">
                    {trackings.map((tracking, index) => (
                        <li key={tracking._id}>
                            {index !== 0 && (
                                <hr className="bg-primary" />
                            )}

                            <div className="timeline-start text-sm text-gray-500 md:text-end mb-3">
                                {new Date(tracking.createdAt).toLocaleString(
                                    "en-BD",
                                    {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    }
                                )}
                            </div>

                            <div className="timeline-middle">
                                <div className="w-5 h-5 rounded-full bg-primary border-4 border-[#DADADA]"></div>
                            </div>

                            <div className="timeline-end timeline-box bg-[#FAFDF0] border border-[#DADADA] shadow-sm mb-5 w-full md:w-80">
                                <h3 className="font-bold text-primary capitalize text-base">
                                    {tracking.details}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Parcel status updated successfully.
                                </p>
                            </div>

                            {index !== trackings.length - 1 && (
                                <hr className="bg-primary" />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
};

export default TrackParcel;