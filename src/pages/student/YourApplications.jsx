import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentLayout from "../../layout/StudentLayout";
import TableGrid from "../../components/TableGrid";
import { Chip } from "@nextui-org/react";
import axiosInstance from "../../config/axiosConfig";

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const studentId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const rowsPerPage = 10;

  const fetchApplications = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/student-applications/${studentId}?page=${page}&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
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

  // Map applications data to rows for TableGrid component
  const rows = applications.map((application) => ({
    id: application._id,
    universityName: application.university
      ? application.university.name
      : "Unknown",
    courseName: application.course ? application.course.name : "Unknown",
    applicationStatus: getStatusBadge(application.applicationStatus),
    submissionDate: new Date(application.submissionDate).toLocaleDateString(),
  }));

  // Handle page change
  const handlePageChange = (newPage) => {
    fetchApplications(newPage);
  };

  return (
    <StudentLayout>
      <TableGrid
        loading={loading}
        rows={rows}
        columns={columns}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </StudentLayout>
  );
};

export default StudentApplications;
