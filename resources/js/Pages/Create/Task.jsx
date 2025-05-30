import { useState } from 'react';

const CreateTaskForm = ({ projects = [], stages = [], errors = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    project_id: '',
    stage_id: '',
    priority_level: 'medium',
    scheduled_at: '',
    is_collaborative: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // you'd call your API or Inertia post here
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* <h1 className="text-2xl font-bold mb-6">Create New Task</h1> */}

      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
          <ul className="list-disc pl-5">
            {Object.values(errors).map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">Title <span className="text-red-600">*</span></label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 ${
              errors.title ? 'border-red-500' : ''
            }`}
            required
            maxLength={255}
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 ${
              errors.description ? 'border-red-500' : ''
            }`}
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Project */}
        <div>
          <label htmlFor="project_id" className="block font-medium mb-1">Project <span className="text-red-600">*</span></label>
          <select
            id="project_id"
            name="project_id"
            value={form.project_id}
            onChange={handleChange}
            required
            className={`w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-indigo-200 ${
              errors.project_id ? 'border-red-500' : ''
            }`}
          >
            <option value="">-- Select Project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_name}
              </option>
            ))}
          </select>
          {errors.project_id && <p className="text-red-600 text-sm mt-1">{errors.project_id}</p>}
        </div>

        {/* Stage */}
        <div>
          <label htmlFor="stage_id" className="block font-medium mb-1">Stage <span className="text-red-600">*</span></label>
          <select
            id="stage_id"
            name="stage_id"
            value={form.stage_id}
            onChange={handleChange}
            required
            className={`w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-indigo-200 ${
              errors.stage_id ? 'border-red-500' : ''
            }`}
          >
            <option value="">-- Select Stage --</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.stage_name.replace('_', ' ')}
              </option>
            ))}
          </select>
          {errors.stage_id && <p className="text-red-600 text-sm mt-1">{errors.stage_id}</p>}
        </div>

        {/* Priority Level */}
        <div>
          <label htmlFor="priority_level" className="block font-medium mb-1">Priority Level <span className="text-red-600">*</span></label>
          <select
            id="priority_level"
            name="priority_level"
            value={form.priority_level}
            onChange={handleChange}
            required
            className={`w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-indigo-200 ${
              errors.priority_level ? 'border-red-500' : ''
            }`}
          >
            {['low', 'medium', 'high'].map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
          {errors.priority_level && <p className="text-red-600 text-sm mt-1">{errors.priority_level}</p>}
        </div>

        {/* Scheduled At */}
        <div>
          <label htmlFor="scheduled_at" className="block font-medium mb-1">Scheduled At</label>
          <input
            type="date"
            id="scheduled_at"
            name="scheduled_at"
            value={form.scheduled_at}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200 ${
              errors.scheduled_at ? 'border-red-500' : ''
            }`}
          />
          {errors.scheduled_at && <p className="text-red-600 text-sm mt-1">{errors.scheduled_at}</p>}
        </div>

        {/* Is Collaborative */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_collaborative"
            name="is_collaborative"
            checked={form.is_collaborative}
            onChange={handleChange}
          />
          <label htmlFor="is_collaborative" className="font-medium">Is Collaborative</label>
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
