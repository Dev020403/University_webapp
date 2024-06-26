import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentLayout from "../../layout/StudentLayout";
import TableGrid from "../../components/TableGrid";
import { useSelector } from "react-redux";
import { Chip } from "@nextui-org/react";

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const studentId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const rowsPerPage = 12;

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/student-applications/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [studentId]);

  const columns = [
    { key: "universityName", label: "University Name" },
    { key: "courseName", label: "Course Name" },
    { key: "applicationStatus", label: "Application Status" },
    { key: "submissionDate", label: "Submission Date" },
  ];

  const getStatusBadge = (status) => {
    let color;
    switch (status) {
      case "submitted":
        color = "primary";
        break;
      case "underReview":
        color = "warning";
        break;
      case "accepted":
        color = "success";
        break;
      case "rejected":
        color = "danger";
        break;
      default:
        color = "default";
    }
    return (
      <Chip color={color} variant="flat">
        {status}
      </Chip>
    );
  };

  const rows = applications.map((application) => ({
    id: application._id,
    universityName: application.university.name,
    courseName: application.course.name,
    applicationStatus: getStatusBadge(application.applicationStatus),
    submissionDate: new Date(application.submissionDate).toLocaleDateString(),
  }));

  return (
    <StudentLayout>
      <TableGrid rows={rows} columns={columns} rowsPerPage={rowsPerPage} />
    </StudentLayout>
  );
};

export default StudentApplications;
