import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaBox,
  FaClock,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-60">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">Failed to load dashboard data.</p>
    );
  }

  // Chart data
  const parcelChartData = [
    {
      name: "Delivered",
      parcels: stats.deliveredParcels || 0,
    },
    {
      name: "Pending",
      parcels: stats.pendingParcels || 0,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          User Dashboard
        </h2>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's your parcel overview.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Parcels */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Parcels</p>
              <h2 className="text-3xl font-bold text-primary mt-2">
                {stats.totalParcels || 0}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-xl bg-[#E6F2F1] flex items-center justify-center">
              <FaBox className="text-2xl text-primary" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-5">
            All parcels you've created
          </p>
        </div>

        {/* Pending Parcels */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Parcels
              </p>
              <h2 className="text-3xl font-bold text-orange-500 mt-2">
                {stats.pendingParcels || 0}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center">
              <FaClock className="text-2xl text-orange-500" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-5">
            Parcels waiting for delivery
          </p>
        </div>

        {/* Delivered Parcels */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Delivered Parcels
              </p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {stats.deliveredParcels || 0}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-5">
            Successfully delivered parcels
          </p>
        </div>

        {/* Total Spent */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <h2 className="text-3xl font-bold text-primary mt-2">
                ৳{stats.totalSpent || 0}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-xl bg-[#F0F8D9] flex items-center justify-center">
              <FaWallet className="text-2xl text-primary" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-5">
            Your total payment amount
          </p>
        </div>
      </div>

      
      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-primary">Parcel Overview</h3>
          <p className="text-sm text-gray-500 mt-1">
            Your parcel delivery statistics
          </p>
        </div>

        <div className="w-full h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={parcelChartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="parcels"
                fill="#03373D"
                radius={[8, 8, 0, 0]}
                barSize={55}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
