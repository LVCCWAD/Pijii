import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import { IconFlag, IconTrash, IconHistory } from "@tabler/icons-react";
import { Link, usePage, router } from "@inertiajs/react";
import { Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";

export default function Deleted() {
  const { projects: deletedProjects = [], flash = {} } = usePage().props;
  const [successMessage, setSuccessMessage] = useState(flash.success || "");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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

  function formatStageName(stageName) {
    if (!stageName) return "N/A";
    return stageName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatDate(dateString) {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const groupedProjects = deletedProjects.reduce((groups, project) => {
    const categoryName = project.category?.name || "Uncategorized";
    if (!groups[categoryName]) groups[categoryName] = [];
    groups[categoryName].push(project);
    return groups;
  }, {});

  const handleDelete = (categoryId, projectId, projectName) => {
    if (
      confirm(
        `Are you sure you want to permanently delete "${projectName}"?\nThis will delete all its subprojects and tasks. This action cannot be undone.`
      )
    ) {
      router.delete(`/categories/${categoryId}/projects/${projectId}`, {
        preserveScroll: true,
        onSuccess: () => {
          router.reload({ only: ["projects", "flash"] });
        },
      });
    }
  };

  const handleRestore = (categoryId, projectId) => {
    router.patch(`/categories/${categoryId}/projects/${projectId}/restore`, {
      preserveScroll: true,
      onSuccess: () => {
        setSuccessMessage("Project restored successfully.");
        router.reload({ only: ["projects", "flash"] });
      },
    });
  };

  return (
    <div className="piji-green h-screen">
      <div className="flex flex-row w-full h-screen">
        <NavbarMinimalColored />
        <div className="flex flex-col w-full overflow-y-auto">
          <PijiHeader />
          <PijiHeader2 title="Recently Deleted" />

          <div className="p-4 md:p-6 xl:p-8">
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {successMessage}
              </div>
            )}

            {deletedProjects.length === 0 ? (
              <h1 className="text-center text-gray-500 italic">
                No deleted projects yet
              </h1>
            ) : (
              Object.entries(groupedProjects).map(([categoryName, projects]) => (
                <div key={categoryName} className="mb-6">
                  <h2 className="font-bold text-lg mb-2">{categoryName}</h2>
                  <div className="flex flex-wrap gap-3">
                    {projects.map((project) => {
                      const { color, label } = getPriorityStyle(project.priority_level);
                      const projectUrl = `/categories/${project.category_id}/projects/${project.id}`;

                      return (
                        <Link
                          href={projectUrl}
                          key={project.id}
                          className="relative w-full md:w-72 bg-amber-50 rounded-lg shadow-sm transition-all duration-200 hover:bg-amber-100 hover:scale-[1.02] active:scale-95 active:bg-amber-200 p-3 no-underline text-black"
                        >
                          {/* ACTION BUTTONS */}
                          <div className="absolute top-2 right-2 z-10 flex space-x-2">
                            {/* Restore button */}
                            <Tooltip label="Restore project" position="bottom" withArrow>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRestore(project.category_id, project.id);
                                }}
                                className="p-1 rounded hover:bg-green-100"
                              >
                                <IconHistory size={16} className="text-green-600" />
                              </button>
                            </Tooltip>

                            {/* Permanent delete button */}
                            <Tooltip label="Permanently delete project" position="bottom" withArrow>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleDelete(project.category_id, project.id, project.project_name || "Untitled");
                                }}
                                className="p-1 rounded hover:bg-red-100"
                              >
                                <IconTrash size={16} className="text-red-600" />
                              </button>
                            </Tooltip>
                          </div>

                          {/* CONTENT */}
                          <div className="font-medium text-sm mb-1">
                            {project.project_name || "Untitled"}
                          </div>
                          <div className="text-xs text-gray-500">
                            Deleted: {formatDate(project.deleted_at)}
                          </div>
                          <div className="text-xs text-gray-500 mb-6">
                            Stage: {formatStageName(project.stage?.stage_name)}
                          </div>

                          {/* PRIORITY FLAG */}
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Deleted.layout = (page) => page;
