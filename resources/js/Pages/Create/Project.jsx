import React, { useState } from "react";

export default function CreateProjectForm({ categories = [], stages = [] }) {
  const [formData, setFormData] = useState({
    project_name: "",
    category_id: "",
    stage_id: "",
    priority_level: "medium",
    scheduled_at: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors({});
      // Example: Replace with your API logic
      console.log("Submitting:", formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col justify-items-center" style={{margin:'0 auto'}}>
      {/* <h2 className="text-2xl font-semibold text-green-700 mb-6">
        Create New Project
      </h2> */}

      <form onSubmit={handleSubmit} noValidate>
        {/* Project Name */}
        <div className="mb-4">
          <label
            htmlFor="project_name"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <input
            type="text"
            name="project_name"
            id="project_name"
            value={formData.project_name}
            onChange={handleChange}
            required
            className={`w-full border rounded-md p-2 ${
              errors.project_name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.project_name && (
            <div className="text-red-500 text-xs mt-1">
              {errors.project_name}
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category_id"
            id="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className={`w-full border rounded-md p-2 ${
              errors.category_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <div className="text-red-500 text-xs mt-1">
              {errors.category_id}
            </div>
          )}
        </div>

        {/* Stage */}
        <div className="mb-4">
          <label
            htmlFor="stage_id"
            className="block text-sm font-medium text-gray-700"
          >
            Stage
          </label>
          <select
            name="stage_id"
            id="stage_id"
            value={formData.stage_id}
            onChange={handleChange}
            required
            className={`w-full border rounded-md p-2 ${
              errors.stage_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Stage</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.stage_name}
              </option>
            ))}
          </select>
          {errors.stage_id && (
            <div className="text-red-500 text-xs mt-1">
              {errors.stage_id}
            </div>
          )}
        </div>

        {/* Priority Level */}
        <div className="mb-4">
          <label
            htmlFor="priority_level"
            className="block text-sm font-medium text-gray-700"
          >
            Priority Level
          </label>
          <select
            name="priority_level"
            id="priority_level"
            value={formData.priority_level}
            onChange={handleChange}
            required
            className={`w-full border rounded-md p-2 ${
              errors.priority_level ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority_level && (
            <div className="text-red-500 text-xs mt-1">
              {errors.priority_level}
            </div>
          )}
        </div>

        {/* Scheduled Date */}
        <div className="mb-4">
          <label
            htmlFor="scheduled_at"
            className="block text-sm font-medium text-gray-700"
          >
            Scheduled Date
          </label>
          <input
            type="date"
            name="scheduled_at"
            id="scheduled_at"
            value={formData.scheduled_at}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 ${
              errors.scheduled_at ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.scheduled_at && (
            <div className="text-red-500 text-xs mt-1">
              {errors.scheduled_at}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
