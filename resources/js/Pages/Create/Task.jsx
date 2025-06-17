import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";


export default function CreateTaskForm({
  category = {},
  project = {},
  stages = [],
  initialStageId = null,
  onSuccess,
}) {
  const reminderOptions = [
    { value: "", label: "No Reminder" },
    { value: "1", label: "1 minute before" },
    { value: "5", label: "5 minutes before" },
    { value: "10", label: "10 minutes before" },
    { value: "15", label: "15 minutes before" },
    { value: "30", label: "30 minutes before" },
    { value: "60", label: "1 hour before" },
    { value: "120", label: "2 hours before" },
    { value: "180", label: "3 hours before" },
    { value: "240", label: "4 hours before" },
    { value: "300", label: "5 hours before" },
    { value: "1440", label: "1 day before" },
    { value: "2880", label: "2 days before" },
    { value: "4320", label: "3 days before" },
  ];


  const [submitError, setSubmitError] = useState("");


  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    description: "",
    stage_id: initialStageId || (stages.length > 0 ? stages[0].id : ""),
    priority_level: "medium",
    scheduled_at: "",
    minutes_before: "",
  });


  useEffect(() => {
    if (initialStageId) {
      setData("stage_id", initialStageId);
    }
  }, [initialStageId, setData]);


  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "minutes_before") {
      setData(name, value === "" ? "" : Number(value));
    } else {
      setData(name, value);
    }


    setSubmitError("");
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!data.title || !data.stage_id) {
      setSubmitError("Please fill in the required fields.");
      return;
    }


    post(`/categories/${category.id}/projects/${project.id}/tasks`, {
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
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-semibold">Error:</strong> {submitError}
          </div>
        )}


        <div>
          <label className="block text-sm font-medium text-gray-700">Task Title *</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
            {category?.name || "Unknown Category"}
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Project</label>
          <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
            {project?.project_name || "Unknown Project"}
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Stage *</label>
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
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </select>
          {errors.stage_id && <p className="text-red-500 text-sm mt-1">{errors.stage_id}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Priority *</label>
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
            type="datetime-local"
            name="scheduled_at"
            value={data.scheduled_at}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.scheduled_at && <p className="text-red-500 text-sm mt-1">{errors.scheduled_at}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Task Reminder</label>
          <select
            name="minutes_before"
            value={data.minutes_before}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={!data.scheduled_at}
          >
            {reminderOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.minutes_before && (
            <p className="text-red-500 text-sm mt-1">{errors.minutes_before}</p>
          )}
          {!data.scheduled_at && (
            <p className="text-gray-500 text-xs mt-1">
              Set scheduled date first to enable reminder
            </p>
          )}
        </div>


        <div className="text-right">
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 disabled:opacity-60"
          >
            {processing ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}



