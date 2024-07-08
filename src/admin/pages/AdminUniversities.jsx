import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosConfig";
import TableGrid from "../../components/TableGrid";
import { Button, Input } from "@nextui-org/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ViewUniversityModal from "../components/ViewUniversityModal";
import EditUniversityModal from "../components/EditUniversityModal";
import DeleteUniversityModal from "../components/DeleteUniversityModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDebounce } from "use-debounce"; // Import use-debounce

const AdminUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500); // Debounce search input

  const token = useSelector((state) => state.adminAuth.token);
  const role = useSelector((state) => state.adminAuth.role);

  const fetchUniversities = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/universities?page=${page}&limit=10&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      setUniversities(response.data.universities);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities(page, debouncedSearch);
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
    { key: "updateStatus", label: "Update Status" }, // New column for update status button
  ];

  const rows = universities.map((university) => ({
    id: university._id,
    name: university.name,
    email: university.email,
    status: (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold
        ${
          university.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {university.status}
      </span>
    ),
    actions: (
      <div className="flex gap-2">
        <Button
          size="sm"
          color="primary"
          onClick={() => handleView(university._id)}
        >
          View
        </Button>
        <Button
          size="sm"
          color="secondary"
          onClick={() => handleEdit(university._id)}
        >
          <FaEdit />
        </Button>
        <Button
          size="sm"
          color="danger"
          onClick={() => handleDelete(university._id)}
        >
          <FaTrashAlt />
        </Button>
      </div>
    ),
    updateStatus: (
      <Button
        size="sm"
        color={university.status === "active" ? "danger" : "success"}
        onClick={() => handleUpdateStatus(university._id, university.status)}
      >
        {university.status === "active" ? "Deactivate" : "Activate"}
      </Button>
    ),
  }));

  const handleView = (id) => {
    const university = universities.find((uni) => uni._id === id);
    setSelectedUniversity(university);
    setViewModalOpen(true);
  };

  const handleEdit = (id) => {
    const university = universities.find((uni) => uni._id === id);
    setEditingUniversity(university);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/api/update-university/${editingUniversity._id}`,
        editingUniversity,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      if (response.data) {
        setUniversities(
          universities.map((uni) =>
            uni._id === editingUniversity._id ? editingUniversity : uni
          )
        );
        setEditModalOpen(false);
        toast.success("University updated successfully");
      }
    } catch (error) {
      console.error("Error updating university:", error);
      toast.error("Failed to update university");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUniversity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    const university = universities.find((uni) => uni._id === id);
    setUniversityToDelete(university);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/delete-university/${universityToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      if (response.data) {
        setUniversities(
          universities.filter((uni) => uni._id !== universityToDelete._id)
        );
        setDeleteModalOpen(false);
        toast.success("University deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting university:", error);
      toast.error("Failed to delete university");
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUpdateStatus = async (universityId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axiosInstance.put(
        `/admin/university-status/${universityId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: role,
          },
        }
      );
      if (response.data && response.data.university) {
        const updatedUniversities = universities.map((uni) =>
          uni._id === response.data.university._id
            ? response.data.university
            : uni
        );
        setUniversities(updatedUniversities);
        toast.success("University status updated successfully");
      }
    } catch (error) {
      console.error("Error updating university status:", error);
      toast.error("Failed to update university status");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between mb-4">
        <Input
          type="text"
          placeholder="Search Universities"
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

      <ViewUniversityModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        university={selectedUniversity}
      />

      <EditUniversityModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        university={editingUniversity}
        onSubmit={handleEditSubmit}
        onChange={handleInputChange}
      />
      <DeleteUniversityModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        universityName={universityToDelete?.name}
      />
      <ToastContainer />
    </AdminLayout>
  );
};

export default AdminUniversities;
