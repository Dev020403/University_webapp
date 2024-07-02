import React, { useEffect, useState } from "react";
import axios from "axios";
import UniversityLayout from "../../layout/UniversityLayout";
import TableGrid from "../../components/TableGrid";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/react";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingStatuses, setLoadingStatuses] = useState({});
  const [sortBy, setSortBy] = useState(""); 
  const rowsPerPage = 10;
  const token = useSelector((state) => state.auth.token);

  // Fetch applications data from the backend API
  const fetchApplications = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/university-applications/6671518cd0af51e7954e3238`,
        {
          params: {
            page: page,
            limit: rowsPerPage,
            sortBy: sortBy,
          },
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, [sortBy]); // Refetch applications when sortBy changes

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setLoadingStatuses((prevStatuses) => ({
        ...prevStatuses,
        [applicationId]: true,
      }));

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, applicationStatus: newStatus }
            : application
        )
      );

      const response = await axios.put(
        `http://localhost:3000/api/${applicationId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Application status updated successfully");
      }

      setLoadingStatuses((prevStatuses) => ({
        ...prevStatuses,
        [applicationId]: false,
      }));
    } catch (error) {
      console.error("Error updating application status:", error);

      setLoadingStatuses((prevStatuses) => ({
        ...prevStatuses,
        [applicationId]: false,
      }));
    }
  };

  const getStatusSelect = (applicationId, currentStatus) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(applicationId, e.target.value)}
        aria-label="Select status"
        placeholder="Select status"
        disabled={loadingStatuses[applicationId]}
        className="block w-full px-3 py-2 mt-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="submitted">Submitted</option>
        <option value="underReview">Under Review</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
      {loadingStatuses[applicationId] && (
        <div className="loader">
          <Spinner></Spinner>
        </div>
      )}
    </div>
  );

  const columns = [
    { key: "id", label: "Application ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "contact", label: "Contact" },
    { key: "status", label: "Status" },
    { key: "jeePr", label: "JEE Percentile" },
    { key: "boardPr", label: "Board Percentile" },
  ];

  const rows = applications.map((application) => ({
    id: application._id,
    name: application.student.profile.name,
    email: application.student.email,
    contact: application.student.profile.personalInfo.phone,
    status: getStatusSelect(application._id, application.applicationStatus),
    jeePr: application.student.profile.academicBackground.jeePr,
    boardPr: application.student.profile.academicBackground.boardPr,
  }));

  // Handle page change
  const handlePageChange = (newPage) => {
    fetchApplications(newPage);
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <UniversityLayout>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="sortBy" className="mr-2">
            Sort By:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="px-2 py-1 border border-gray-300 rounded-md"
          >
            <option value="">No Filter</option>
            <option value="jeePr">JEE Percentile</option>
            <option value="boardPr">Board Percentile</option>
          </select>
        </div>
      </div>

      <TableGrid
        columns={columns}
        rows={rows}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        name={"Recent Applications"}
        loading={loading}
      />
      <ToastContainer />
    </UniversityLayout>
  );
};

export default Application;
