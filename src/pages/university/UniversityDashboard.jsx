import React, { useEffect, useState } from "react";
import UniversityLayout from "../../layout/UniversityLayout";
import WelcomeCard from "../../components/WelcomeCard";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import axios from "axios";

const Dashboard = () => {
  const userName = useSelector((state) => state.auth.user?.name || "Guest");
  const universityId = useSelector((state) => state.auth.user?._id);
  const [totalCourses, setTotalCourses] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [underReviewCount, setUnderReviewCount] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const data = [
    { name: "Submitted", value: submittedCount },
    { name: "UnderReview", value: underReviewCount },
    { name: "Rejected", value: rejectedCount },
    { name: "Accepted", value: acceptedCount },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/${universityId}/totalData`
    );
    console.log(res.data);
    setTotalCourses(res.data.totalCourses);
    setAcceptedCount(res.data.acceptedCount);
    setRejectedCount(res.data.rejectedCount);
    setSubmittedCount(res.data.rejectedCount);
    setUnderReviewCount(res.data.underReviewCount);
    setTotalApplications(res.data.totalApplications);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UniversityLayout>
      <WelcomeCard name={userName}></WelcomeCard>

      <div className="w-[100%] flex">
        <div className="flex flex-col gap-4 w-1/2">
          <div className="bg-white p-4  rounded-md shadow-md w-full mr-4">
            <h2 className="text-lg font-semibold mb-2">
              Total Student Applications
            </h2>
            <p className="text-gray-600">{totalApplications}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md w-full">
            <h2 className="text-lg font-semibold mb-2">Total Courses</h2>
            <p className="text-gray-600">{totalCourses}</p>
          </div>
        </div>

        <div className="w-1/2 bg-white rounded-md border-1 shadow-md ml-5 flex justify-center">
          <PieChart className="" width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </UniversityLayout>
  );
};

export default Dashboard;
