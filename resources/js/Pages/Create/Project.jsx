import React from "react";
import { useForm } from "@inertiajs/react";

export default function CreateTaskForm({ category = {}, project = {}, stages = [], onSuccess }) {
  const reminderOptions = [
    { label: "30 minutes before", value: 30 },
    { label: "1 hour before", value: 60 },
    { label: "3 hours before", value: 180 },
    { label: "1 day before", value: 1440 },
    { label: "2 days before", value: 2880 },
  ];

  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    description: "",
    stage_id: stages.length ? stages[0].id : "",
    priority_level: "medium",
    scheduled_at: "",
    minutes_before: "",
    is_collaborative: false,
    project_id: project.id || "",
  });

  // Reset reminder if scheduled_at cleared
  React.useEffect(() => {
    if (!data.scheduled_at) {
      setData("minutes_before", "");
    }
  }, [data.scheduled_at]);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setData(name, type === "checkbox" ? checked : value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!project.id) {
      alert("Project is required.");
      return;
    }

    post("/", {
      onSuccess: () => {
        reset();
        if (onSuccess) onSuccess();
      },
      onError: () => {
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Category - read only */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <input
          type="text"
          readOnly
          value={category.name || ""}
          className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Project - read only */}
      <div>
        <label className="block font-semibold mb-1">Project</label>
        <input
          type="text"
          readOnly
          value={project.project_name || ""}
          className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={data.title}
          onChange={handleChange}
          required
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={3}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Stage */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="stage_id">
          Stage
        </label>
        <select
          id="stage_id"
          name="stage_id"
          value={data.stage_id}
          onChange={handleChange}
          required
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.stage_id ? "border-red-500" : "border-gray-300"
          }`}
        >
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
        {errors.stage_id && (
          <p className="text-red-600 text-sm mt-1">{errors.stage_id}</p>
        )}
      </div>

      {/* Priority Level */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="priority_level">
          Priority Level
        </label>
        <select
          id="priority_level"
          name="priority_level"
          value={data.priority_level}
          onChange={handleChange}
          required
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.priority_level ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority_level && (
          <p className="text-red-600 text-sm mt-1">{errors.priority_level}</p>
        )}
      </div>

      {/* Scheduled At */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="scheduled_at">
          Scheduled Date
        </label>
        <input
          type="date"
          id="scheduled_at"
          name="scheduled_at"
          value={data.scheduled_at}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.scheduled_at ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.scheduled_at && (
          <p className="text-red-600 text-sm mt-1">{errors.scheduled_at}</p>
        )}
      </div>

      {/* Task Reminder */}
      <div>
        <label className="block font-semibold mb-1" htmlFor="minutes_before">
          Reminder (before scheduled date)
        </label>
        <select
          id="minutes_before"
          name="minutes_before"
          value={data.minutes_before}
          onChange={handleChange}
          disabled={!data.scheduled_at}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.minutes_before ? "border-red-500" : "border-gray-300"
          } ${!data.scheduled_at ? "bg-gray-100 cursor-not-allowed" : ""}`}
        >
          <option value="">No reminder</option>
          {reminderOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.minutes_before && (
          <p className="text-red-600 text-sm mt-1">{errors.minutes_before}</p>
        )}
      </div>

      {/* Is Collaborative */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_collaborative"
          name="is_collaborative"
          checked={data.is_collaborative}
          onChange={handleChange}
          className="rounded"
        />
        <label htmlFor="is_collaborative" className="font-semibold">
          Collaborative Task
        </label>
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          disabled={processing}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          {processing ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
}
