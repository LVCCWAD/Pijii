import { useEffect, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { NavbarMinimalColored } from "../../layouts/mantine/sidebar.jsx";
import PijiHeader from "../../layouts/components/Header.jsx";
import PijiHeader2 from "../../layouts/components/Header2.jsx";
import { IconChevronCompactRight } from "@tabler/icons-react";

export default function TaskEdit() {
  const {
    task,
    project,
    category,
    ancestors = [],
    stages = [],
    flash,
  } = usePage().props;

  const initialReminder = task.task_reminders?.[0] || null;

  const [title, setTitle] = useState(task?.title || "");
  const [stageId, setStageId] = useState(task?.stage_id || "");
  const [priority, setPriority] = useState(task?.priority_level || "medium");
  const [scheduledAt, setScheduledAt] = useState(task?.scheduled_at || "");
  const [minutesBefore, setMinutesBefore] = useState(
    initialReminder?.minutes_before?.toString() || ""
  );
  const [description, setDescription] = useState(task?.description || "");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [flash?.success]);

  const handleSave = () => {
    router.put(
      `/categories/${category.id}/projects/${project.id}/tasks/${task.id}`,
      {
        title,
        stage_id: stageId,
        priority_level: priority,
        scheduled_at: scheduledAt,
        minutes_before: minutesBefore === "" ? null : Number(minutesBefore),
        description,
      }
    );
  };

  const handleDiscard = () => {
    setTitle(task?.title || "");
    setStageId(task?.stage_id || "");
    setPriority(task?.priority_level || "medium");
    setScheduledAt(task?.scheduled_at || "");
    setMinutesBefore(initialReminder?.minutes_before?.toString() || "");
    setDescription(task?.description || "");
  };

  const formatStageName = (name) =>
    name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

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

    function formatLocalDateTime(datetime) {
    if (!datetime) return "";
    const local = new Date(datetime);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toISOString().slice(0, 16);
  }

  return (
    <div className="piji-green h-screen overflow-hidden">
      <div className="flex flex-row h-full w-full">
        <NavbarMinimalColored />
        <div className="flex flex-col w-full h-full overflow-hidden">
          <PijiHeader />
          <PijiHeader2 title={`Edit Task: ${task.title}`} />

          <div className="flex-1 overflow-y-auto p-4">
            {showSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 border border-green-300 shadow-sm">
                {flash.success}
              </div>
            )}

            <div className="flex items-center gap-1 mb-4 flex-wrap">
              <Link href={`/categories/${category.id}`} className="text-3xl font-bold">
                {category.name}
              </Link>
              <IconChevronCompactRight size={20} />
              {ancestors.map((a) => (
                <div key={a.id} className="flex gap-1 items-center">
                  <Link
                    href={`/categories/${category.id}/projects/${a.id}`}
                    className="text-3xl font-bold"
                  >
                    {a.project_name}
                  </Link>
                  <IconChevronCompactRight size={20} />
                </div>
              ))}
              <Link
                href={`/categories/${category.id}/projects/${project.id}`}
                className="text-3xl font-bold"
              >
                {project.project_name}
              </Link>
              <IconChevronCompactRight size={20} />
              <span className="text-3xl font-bold">{task.title}</span>
            </div>

            <div className="bg-gray-50 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto space-y-6">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  className="w-full p-2 border rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Stage</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={stageId}
                  onChange={(e) => setStageId(e.target.value)}
                >
                  <option value="">Select Stage</option>
                  {stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {formatStageName(stage.stage_name)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Scheduled At</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded-lg"
                  value={formatLocalDateTime(scheduledAt)}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Task Reminder</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={minutesBefore}
                  onChange={(e) => setMinutesBefore(e.target.value)}
                  disabled={!scheduledAt}
                >
                  {reminderOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {!scheduledAt && (
                  <p className="text-gray-500 text-xs mt-1">
                    Set scheduled date first to enable reminder
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={handleDiscard}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
