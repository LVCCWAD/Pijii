import { useEffect, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Tooltip } from "@mantine/core";

import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";

import {
  IconEdit,
  IconTrash,
  IconChevronCompactRight,
} from "@tabler/icons-react";

export default function TaskView() {
  const [showSuccess, setShowSuccess] = useState(true);
  const { task, project, category, ancestors = [], flash } = usePage().props;

  useEffect(() => {
    if (flash?.success) {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [flash?.success]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      router.delete(
        `/categories/${category.id}/projects/${project.id}/tasks/${task.id}`
      );
    }
  };

  const formatStageName = (stageName) => {
    if (!stageName) return "N/A";
    return stageName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="piji-green h-screen overflow-hidden">
      <div className="flex flex-row h-full w-full">
        <NavbarMinimalColored />
        <div className="flex flex-col w-full h-full overflow-hidden">
          <PijiHeader />
          <PijiHeader2 title={`Task: ${task?.title || "Untitled"}`} />

          <div className="flex-1 overflow-y-auto p-4">
            {flash?.success && showSuccess && (
              <div className="mb-4 mx-4 p-3 rounded-lg bg-green-100 text-green-800 border border-green-300 shadow-sm transition-opacity duration-500">
                {flash.success}
              </div>
            )}

            {/* BREADCRUMB */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex gap-1 items-center flex-wrap">
                <h1 className="text-3xl font-bold cursor-pointer">
                  <Link href={`/categories/${category.id}`}>
                    {category.name || "Category"}
                  </Link>
                </h1>
                <IconChevronCompactRight size={20} />

                {ancestors.map((ancestor) => (
                  <div key={ancestor.id} className="flex gap-1 items-center">
                    <h1 className="text-3xl font-bold cursor-pointer">
                      <Link href={`/categories/${category.id}/projects/${ancestor.id}`}>
                        {ancestor.project_name}
                      </Link>
                    </h1>
                    <IconChevronCompactRight size={20} />
                  </div>
                ))}

                <h1 className="text-3xl font-bold cursor-pointer">
                  <Link href={`/categories/${category.id}/projects/${project.id}`}>
                    {project.project_name}
                  </Link>
                </h1>
                <IconChevronCompactRight size={20} />

                <div className="flex items-center gap-1">
                  <h1 className="text-3xl font-bold">{task.title}</h1>
                  <Tooltip label="Edit task">
                    <button
                      onClick={() =>
                        router.get(
                          `/categories/${category.id}/projects/${project.id}/tasks/${task.id}/edit`
                        )
                      }
                      className="cursor-pointer"
                      aria-label="Edit Task"
                    >
                      <IconEdit className="hover:text-amber-600 transition-colors duration-200" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* TASK CARD */}
            <div className="bg-gray-50 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800 break-words">
                  {task.title}
                </h1>
                <div className="flex gap-2">
                  <Tooltip label="Edit task">
                    <button
                      onClick={() =>
                        router.get(
                          `/categories/${category.id}/projects/${project.id}/tasks/${task.id}/edit`
                        )
                      }
                      className="cursor-pointer"
                      aria-label="Edit Task"
                    >
                      <IconEdit className="hover:text-amber-600 transition-colors duration-200" />
                    </button>
                  </Tooltip>

                  <Tooltip label="Delete task">
                    <button
                      onClick={handleDelete}
                      className="cursor-pointer"
                      aria-label="Delete Task"
                    >
                      <IconTrash className="hover:text-red-600 transition-colors duration-200" />
                    </button>
                  </Tooltip>
                </div>
              </div>

              {/* ATTRIBUTES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {task.status || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Scheduled At:</span>{" "}
                  {task.scheduled_at
                    ? new Date(task.scheduled_at).toLocaleString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "No date set"}
                </div>
                <div>
                  <span className="font-semibold">Stage:</span>{" "}
                  {formatStageName(task.stage?.stage_name)}
                </div>
                <div>
                  <span className="font-semibold">Priority:</span>{" "}
                  {task.priority || "N/A"}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Description</h2>
                <p className="whitespace-pre-wrap text-gray-800">
                  {task.description || "No description"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
