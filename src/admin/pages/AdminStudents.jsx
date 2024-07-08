// AdminStudents.js

import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosConfig";
import TableGrid from "../../components/TableGrid";
import { Button, Input } from "@nextui-org/react";
import { FaTrashAlt } from "react-icons/fa";
import ViewStudentModal from "../components/ViewStudentModal";
import DeleteStudentModal from "../components/DeleteStudentModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDebounce } from "use-debounce";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300); // Debounce search input

  const token = useSelector((state) => state.adminAuth.token);
  const role = useSelector((state) => state.adminAuth.role);

  const fetchStudents = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/students?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(page, debouncedSearch);
  }, [page, debouncedSearch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
    { key: "updateStatus", label: "Update Status" }, // Added column for update status button
  ];

  const rows = students.map((student) => ({
    id: student._id,
    name: student.profile.name,
    email: student.email,
    status: (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold
        ${
          student.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {student.status}
      </span>
    ),
    actions: (
      <div className="flex gap-2">
        <Button
          size="sm"
          color="primary"
          onClick={() => handleView(student._id)}
        >
          View
        </Button>
        <Button
          size="sm"
          color="danger"
          onClick={() => handleDelete(student._id)}
        >
          <FaTrashAlt />
        </Button>
      </div>
    ),
    updateStatus: (
      <Button
        size="sm"
        color={student.status === "active" ? "danger" : "success"}
        onClick={() => handleUpdateStatus(student._id, student.status)}
      >
        {student.status === "active" ? "Deactivate" : "Activate"}
      </Button>
    ),
  }));

  const handleView = (id) => {
    const student = students.find((stu) => stu._id === id);
    setSelectedStudent(student);
    setViewModalOpen(true);
  };

  const handleDelete = (id) => {
    const student = students.find((stu) => stu._id === id);
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/delete-student/${studentToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      if (response.data) {
        setStudents(students.filter((stu) => stu._id !== studentToDelete._id));
        setDeleteModalOpen(false);
        toast.success("Student deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student");
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUpdateStatus = async (studentId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axiosInstance.put(
        `/admin/student-status/${studentId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      if (response.data && response.data.student) {
        const updatedStudents = students.map((stu) =>
          stu._id === response.data.student._id ? response.data.student : stu
        );
        setStudents(updatedStudents);
        toast.success("Student status updated successfully");
      }
    } catch (error) {
      console.error("Error updating student status:", error);
      toast.error("Failed to update student status");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="Search Students"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <TableGrid
        rows={rows}
        columns={columns}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />

      <ViewStudentModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        student={selectedStudent}
      />
      <DeleteStudentModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        studentName={studentToDelete?.profile.name}
      />

      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminStudents;
