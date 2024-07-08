import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import AdminLayout from "../layout/AdminLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3498db",
  "#2ecc71",
  "#e74c3c",
  "#f39c12",
  "#9b59b6",
  "#1abc9c",
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching statistics", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const innerData = [
    { name: "Active Students", value: stats.activeStudents },
    {
      name: "Inactive Students",
      value: stats.totalStudents - stats.activeStudents,
    },
    { name: "Active Universities", value: stats.activeUniversities },
    {
      name: "Inactive Universities",
      value: stats.totalUniversities - stats.activeUniversities,
    },
  ];

  const outerData = [
    { name: "Total Students", value: stats.totalStudents },
    { name: "Total Universities", value: stats.totalUniversities },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                  title="Total Students"
                  value={stats.totalStudents}
                  color="bg-blue-100 text-blue-800"
                />
                <StatCard
                  title="Active Students"
                  value={stats.activeStudents}
                  color="bg-green-100 text-green-800"
                />
                <StatCard
                  title="Total Universities"
                  value={stats.totalUniversities}
                  color="bg-purple-100 text-purple-800"
                />
                <StatCard
                  title="Active Universities"
                  value={stats.activeUniversities}
                  color="bg-indigo-100 text-indigo-800"
                />
              </div>
            </div>
            {/* <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Additional Information
              </h2>
              <p className="text-gray-600">
                Here you can add more detailed statistics or information
                relevant to the admin dashboard.
              </p>
            </div> */}
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
              <h2 className="text-xl font-semibold mb-4">Statistics</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={outerData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {outerData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Pie
                    data={innerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={110}
                    outerRadius={140}
                    fill="#82ca9d"
                    dataKey="value"
                    label
                  >
                    {innerData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[(index + 2) % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-lg ${color}`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
