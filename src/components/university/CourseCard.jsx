import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const CourseCard = ({ course, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: course.name,
    description: course.description,
    feeStructure: course.feeStructure,
    facilities: course.facilities.join(", "),
    resources: course.resources.join(", "),
  });

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(course._id, formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-1">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="p-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Course Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleEditChange}
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Course Name"
          />

          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Course Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleEditChange}
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Course Description"
          />

          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="feeStructure"
          >
            Fee Structure
          </label>
          <input
            type="number"
            name="feeStructure"
            id="feeStructure"
            value={formData.feeStructure}
            onChange={handleEditChange}
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Fee Structure"
          />

          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="facilities"
          >
            Facilities (comma separated)
          </label>
          <input
            type="text"
            name="facilities"
            id="facilities"
            value={formData.facilities}
            onChange={handleEditChange}
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Facilities (comma separated)"
          />

          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="resources"
          >
            Resources (comma separated)
          </label>
          <input
            type="text"
            name="resources"
            id="resources"
            value={formData.resources}
            onChange={handleEditChange}
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Resources (comma separated)"
          />

          <Button color="primary" type="submit" className="mr-2">
            Save
          </Button>
          <Button
            color="default"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <p className="text-gray-900 font-bold mb-2">
            Fee: ${course.feeStructure}
          </p>
          <p className="text-gray-700 mb-2">
            Facilities: {course.facilities.join(", ")}
          </p>
          <p className="text-gray-700 mb-4">
            Resources: {course.resources.join(", ")}
          </p>
          <Button color="primary" className="mr-2" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button color="danger" onClick={() => onDelete(course._id)}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
