import { Link, router } from "@inertiajs/react";
import {
  IconPlus,
  IconTrash,
  IconFlag,
} from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";

export default function ProjectCard({
  title = "UNTITLED",
  badgeNumber = 0,
  badgeColor = "bg-amber-50",
  cardBg = "bg-red-100",
  categoryId = null,
  projects = [],
}) {
  const visibleProjects = projects.slice(0, 2);
  const remainingCount = projects.length - visibleProjects.length;

  const hoverBgMap = {
    "bg-red-100": "hover:bg-red-200",
    "bg-amber-50": "hover:bg-amber-100",
    "bg-green-100": "hover:bg-green-200",
    "bg-blue-100": "hover:bg-blue-200",
    "bg-cyan-100": "hover:bg-cyan-200",
  };

  function formatDate(datetime) {
    if (!datetime) return null;
    const date = new Date(datetime);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

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

  function deleteCategory(e) {
    e.preventDefault();
    if (
      confirm(
        "Are you sure you want to delete this category? This cannot be undone."
      )
    ) {
      router.delete(`/categories/${categoryId}`, {
        preserveScroll: true,
      });
    }
  }

  return (
    <div
      className={`project-card ${cardBg} rounded-2xl drop-shadow-md w-full max-w-[360px] flex flex-col`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className={`${badgeColor} w-8 h-8 rounded-full flex items-center justify-center`}
          >
            <span className="font-semibold">{badgeNumber}</span>
          </div>
          <Link href={`/categories/${categoryId}`}>
            <h2 className="font-bold text-xl truncate max-w-[145px]">{title}</h2>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={deleteCategory}
            className="text-black hover:text-white hover:bg-red-600 p-1.5 rounded-lg transition-all cursor-pointer"
            title="Delete Category"
          >
            <IconTrash size={22} />
          </button>
        </div>
      </div>

      {/* Content & Button */}
      <div className="flex flex-col justify-between flex-grow px-4 pt-2 pb-3 h-full">
        {/* Projects */}
        <div>
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project) => {
              const { color, label } = getPriorityStyle(project.priority_level);
              const scheduledText = project.scheduled_at
                ? formatDate(project.scheduled_at)
                : "Unscheduled";

              return (
                <Link
                  key={project?.id ?? Math.random()}
                  href={`/categories/${categoryId}/projects/${project.id}`}
                  className="bg-white w-full p-4 mb-2 rounded-xl shadow-sm text-sm text-gray-800 flex flex-col hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="truncate max-w-[75%] font-bold">
                      {project?.project_name ?? "Untitled"}
                    </div>

                    {project.priority_level && (
                      <Tooltip label={label} position="top" withArrow>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${color}`}
                        >
                          <IconFlag size={14} className="text-white" />
                        </div>
                      </Tooltip>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 italic">
                    Scheduled at:{" "}
                    <span className={project.scheduled_at ? "text-gray-700" : "text-gray-400"}>
                      {scheduledText}
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="italic text-sm text-gray-500">No projects yet.</p>
          )}

          {remainingCount > 0 && (
            <p className="text-xs italic text-gray-600 ml-1">+{remainingCount} more…</p>
          )}
        </div>

        <div className="mt-auto pt-3">
          <Link
            href={`/categories/${categoryId}`}
            className={`flex items-center justify-center gap-1 rounded-xl py-2 px-4 w-[90%] mx-auto font-semibold text-sm transition-all duration-200 ease-in-out border
              ${cardBg} ${hoverBgMap[cardBg] ?? "hover:bg-opacity-80"} hover:scale-[1.02] hover:shadow-md`}
          >
            <IconPlus size={18} className="transition duration-200" />
            <span>Add&nbsp;New&nbsp;Project</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
