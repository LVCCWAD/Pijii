import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function CreateProjectForm({
  category = {},
  selectedStage = {},
  parentProject = null,
  onSuccess,
}) {
  const stageOptions = [
    { id: 1, label: "To Do", value: "to_do" },
    { id: 2, label: "In Progress", value: "in_progress" },
    { id: 3, label: "Completed", value: "completed" },
    { id: 4, label: "On Hold", value: "on_hold" },
  ];

  const [submitError, setSubmitError] = useState("");

  const { data, setData, post, processing, errors, reset } = useForm({
    project_name: "",
    category_id: category?.id || "",
    stage_id: selectedStage?.id || "",
    parent_id: parentProject?.id || null,
    priority_level: "medium",
    scheduled_at: "",
  });

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
    setSubmitError(""); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category?.id || !data.stage_id) {
      setSubmitError("Please select a category and a stage.");
      return;
    }

    post(`/categories/${category.id}/projects`, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        reset();
        setSubmitError("");
      },
      onError: () => {
        setSubmitError("Something went wrong. Please check the form and try again.");
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Top Error Banner */}
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-semibold">Error:</strong> {submitError}
          </div>
        )}

        {/* Project Name */}
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

        {/* Category Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
            {category?.name || "Unknown Category"}
          </div>
        </div>

        {/* Stage Select */}
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

        {/* Parent Project (optional) */}
        {parentProject && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Project</label>
            <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
              {parentProject.project_name}
            </div>
          </div>
        )}

        {/* Priority Level */}
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

        {/* Scheduled Date */}
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

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            disabled={processing}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
          >
            {processing ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
