import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import { IconFlag } from "@tabler/icons-react";
import { Link, usePage } from "@inertiajs/react";
import { Tooltip } from "@mantine/core";

export default function Urgent() {
  const { urgentProjects = [], urgentTasks = [] } = usePage().props;

  function getPriorityStyle(priority) {
    switch (priority) {
      case "low":
        return { color: "bg-yellow-300", label: "Low Priority" };
      case "medium":
        return { color: "bg-orange-400", label: "Medium Priority" };
      case "high":
        return { color: "bg-red-600", label: "High Priority" };
      default:
        return { color: "bg-gray-400", label: "No Priority" };
    }
  }

  function formatDate(dateString) {
    if (!dateString) return "Unscheduled";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function formatStageName(stageName) {
    if (!stageName) return "N/A";
    return stageName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="piji-green h-screen">
      <div className="flex flex-row w-full h-screen">
        <NavbarMinimalColored />

        <div className="flex flex-col w-full overflow-y-auto">
          <PijiHeader />
          <PijiHeader2 title="Urgent" />

          <div className="p-4 md:p-6 xl:p-8 space-y-10">
            {/* Urgent Projects */}
            <div>
              <h2 className="font-bold text-xl mb-3 text-gray-800">Urgent Projects</h2>
              {urgentProjects.length === 0 ? (
                <p className="text-gray-500 italic">No urgent projects found.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {urgentProjects.map((project) => {
                    const { color, label } = getPriorityStyle(project.priority_level);
                    const projectUrl = `/categories/${project.category_id}/projects/${project.id}`;
                    return (
                      <Link
                        href={projectUrl}
                        key={project.id}
                        className="relative w-full md:w-72 bg-amber-50 rounded-lg shadow-sm transition-all duration-200 hover:bg-amber-100 hover:scale-[1.02] active:scale-95 active:bg-amber-200 p-3 no-underline text-black"
                      >
                        <div className="font-medium text-sm mb-1">
                          {project.project_name || "Untitled"}
                        </div>
                        <div className="text-xs text-gray-500">
                          Scheduled: {formatDate(project.scheduled_at)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Stage: {formatStageName(project.stage?.stage_name)}
                        </div>

                        <div className="absolute bottom-2 right-2">
                          <Tooltip label={label} position="top" withArrow>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${color}`}
                            >
                              <IconFlag size={12} className="text-white" />
                            </div>
                          </Tooltip>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Urgent Tasks */}
            <div>
              <h2 className="font-bold text-xl mb-3 text-gray-800">Urgent Tasks</h2>
              {urgentTasks.length === 0 ? (
                <p className="text-gray-500 italic">No urgent tasks found.</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {urgentTasks.map((task) => {
                    if (!task.project) return null;

                    const { color, label } = getPriorityStyle(task.priority_level);
                    const taskUrl = `/categories/${task.project.category_id}/projects/${task.project_id}/tasks/${task.id}`;

                    return (
                      <Link
                        href={taskUrl}
                        key={task.id}
                        className="relative w-full md:w-72 bg-white rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-50 hover:scale-[1.02] active:scale-95 active:bg-blue-100 p-3 no-underline text-black"
                      >
                        <div className="font-medium text-sm mb-1">
                          {task.title || "Untitled Task"}
                        </div>
                        <div className="text-xs text-gray-500">
                          Project: {task.project.project_name || "Unnamed Project"}
                        </div>
                        <div className="text-xs text-gray-500">
                          Scheduled: {formatDate(task.scheduled_at)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Stage: {formatStageName(task.stage?.stage_name)}
                        </div>

                        <div className="absolute bottom-2 right-2">
                          <Tooltip label={label} position="top" withArrow>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center ${color}`}
                            >
                              <IconFlag size={12} className="text-white" />
                            </div>
                          </Tooltip>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Urgent.layout = (page) => page;
