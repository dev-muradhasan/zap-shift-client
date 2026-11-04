import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../../components/Loading/Loading";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  const COLORS = ["#03373D", "#CAEB66", "#3B82F6", "#F59E0B"];

  // Chart Data
  const chartData = stats.map((stat) => ({
    name: stat._id || "Pending",
    value: stat.count,
  }));

  // Total Parcels
  const totalParcels = stats.reduce((total, stat) => total + stat.count, 0);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
        <p className="text-gray-500 mt-2">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat._id || "pending"}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium text-sm capitalize">
                  {(stat._id || "Pending").split("-").join(" ")}
                </p>

                <h3 className="text-3xl font-bold text-primary mt-2">
                  {stat.count}
                </h3>
              </div>
            </div>

            <div className="divider my-3"></div>

            <p className="text-xs text-gray-400">
              <span className="text-green-600 font-semibold">Overview</span> of
              your platform
            </p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-primary">
              Parcel Status Overview
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Distribution of all parcel delivery statuses.
            </p>
          </div>

          {totalParcels === 0 ? (
            <div className="h-80 flex items-center justify-center text-gray-400">
              No parcel data available.
            </div>
          ) : (
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={110}
                    paddingAngle={4}
                    dataKey="value"
                    nameKey="name"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [`${value} Parcels`, "Count"]}
                  />

                  <Legend
                    verticalAlign="bottom"
                    formatter={(value) => (
                      <span className="text-gray-600 capitalize">
                        {value.split("-").join(" ")}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Center Total */}
          <div className="text-center -mt-51.25 mb-28.75 pointer-events-none">
            <h3 className="text-3xl font-bold text-primary">{totalParcels}</h3>
            <p className="text-xs text-gray-500">Total Parcels</p>
          </div>
        </div>

        {/* Status Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-primary mb-6">
            Status Summary
          </h3>

          <div className="space-y-6">
            {chartData.map((item, index) => (
              <div key={item.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {item.name.split("-").join(" ")}
                  </span>

                  <span className="font-bold text-primary">{item.value}</span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.value / totalParcels) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  ></div>
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {((item.value / totalParcels) * 100).toFixed(1)}% of total
                  parcels
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
