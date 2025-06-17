import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function EditProjectForm({
  project = {},
  category = {},
  onSuccess,
  onCancel,
}) {
  const stageOptions = [
    { id: 1, label: "To Do", value: "to_do" },
    { id: 2, label: "In Progress", value: "in_progress" },
    { id: 3, label: "Completed", value: "completed" },
    { id: 4, label: "On Hold", value: "on_hold" },
  ];

  const [submitError, setSubmitError] = useState("");

  const { data, setData, put, processing, errors } = useForm({
    project_name: project.project_name || "",
    category_id: project.category?.id || "",
    stage_id: project.stage_id || "",
    parent_id: project.parent_id || null,
    priority_level: project.priority_level || "medium",
    scheduled_at: project.scheduled_at ? project.scheduled_at.slice(0, 10) : "", // format YYYY-MM-DD
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
    setSubmitError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate category_id from form data, not from prop
    if (!data.category_id || !data.stage_id) {
      setSubmitError("Please select a category and a stage.");
      return;
    }

    put(`/categories/${data.category_id}/projects/${project.id}`, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        setSubmitError("");
      },
      onError: () => {
        setSubmitError("Something went wrong. Please check the form and try again.");
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-3">

        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-semibold">Error:</strong> {submitError}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            name="project_name"
            value={data.project_name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.project_name ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.project_name && (
            <p className="text-red-500 text-sm mt-1">{errors.project_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
            {project.category?.name || "Unknown Category"}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stage</label>
          <select
            name="stage_id"
            value={data.stage_id}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.stage_id ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="">Select Stage</option>
            {stageOptions.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.label}
              </option>
            ))}
          </select>
          {errors.stage_id && (
            <p className="text-red-500 text-sm mt-1">{errors.stage_id}</p>
          )}
        </div>

        {project.parent_id && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Project</label>
            <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
              {project.parent_project_name || "Unknown Parent"}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority_level"
            value={data.priority_level}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
          <input
            type="date"
            name="scheduled_at"
            value={data.scheduled_at}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-md border border-gray-400 hover:bg-gray-100"
            disabled={processing}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={processing}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
          >
            {processing ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
