import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { FaMotorcycle, FaBox, FaCheckCircle } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

 const {
   data: deliveryPerDay = [],
   isLoading,
 } = useQuery({
   queryKey: ["delivery-per-day", user?.email],
   enabled: !!user?.email,
   retry: false,
   queryFn: async () => {
     const res = await axiosSecure.get("/riders/deliver-per-day");
     return res.data;
   },
 });

  // Total delivered parcels
  const totalDelivered = deliveryPerDay.reduce(
    (total, item) => total + item.deliveredCount,
    0,
  );

  // Chart data
  const chartData = deliveryPerDay.map((item) => ({
    date: item._id,
    delivered: item.deliveredCount,
  }));

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">Rider Dashboard</h2>
        <p className="text-gray-500 mt-2">
          Welcome back! Track your daily delivery performance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Delivered
              </p>
              <h3 className="text-3xl font-bold text-primary mt-2">
                {totalDelivered}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
              <FaCheckCircle />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Active Delivery Days
              </p>
              <h3 className="text-3xl font-bold text-primary mt-2">
                {deliveryPerDay.length}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
              <FaMotorcycle />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-primary">
            Daily Delivery Performance
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Number of parcels delivered per day.
          </p>
        </div>

        {chartData.length === 0 ? (
          <div className="h-80 flex flex-col items-center justify-center text-gray-400">
            <FaBox className="text-5xl mb-4" />
            <p>No delivery history found.</p>
          </div>
        ) : (
          <div className="w-full h-87.5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis
                  dataKey="date"
                  tick={{ fill: "#606060", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#606060", fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value} Parcels`, "Delivered"]}
                />

                <Bar
                  dataKey="delivered"
                  fill="#03373D"
                  radius={[8, 8, 0, 0]}
                  barSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderDashboard;
