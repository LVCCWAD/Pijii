import React, { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import { IconArrowLeft, IconFlag, IconZoom } from "@tabler/icons-react";
import { Tooltip } from "@mantine/core";
import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";

export default function Search() {
  const { search, categories = [], projects = [], tasks = [] } = usePage().props;
  const [query, setQuery] = useState(search || "");

  const getPriorityStyle = (priority) => {
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
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unscheduled";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatStageName = (stageName) => {
    if (!stageName) return "N/A";
    return stageName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.get("/search", { search: query });
  };

  return (
    <div className="piji-green h-screen flex overflow-hidden">
      <NavbarMinimalColored />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <PijiHeader />
        <PijiHeader2 title="Search" />

        {/* SEARCH BAR */}
        <div className="flex flex-col search-input md:flex-row justify-between items-start md:items-center px-4 md:px-8 py-4 bg-white border-b border-gray-200 gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl w-full md:max-w-md"
        >
            <IconZoom size={20} className="text-gray-600" />
            <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm w-full h-[20px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="submit"
                className="ml-2 px-3 py-[6px] bg-green-600 hover:bg-green-700 text-white text-sm rounded-md"
            >
                Search
            </button>
        </form>

          <Link
            href="/"
            className="piji-green flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl hover:underline"
          >
            <IconArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="px-4 md:px-8 py-6 space-y-10">
          {/* Results Message */}
          {search && (
            <p className="text-gray-600 italic">
              Showing results for: <strong>{search}</strong>
            </p>
          )}

          {/* Categories */}
          <section>
            <h2 className="font-bold text-xl mb-4 text-gray-800">Categories</h2>
            {categories.length === 0 ? (
              <p className="text-gray-500 italic">No matching categories found.</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="w-full sm:w-64 bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-md"
                  >
                    <h3 className="text-md font-semibold">{category.name}</h3>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Projects */}
          <section>
            <h2 className="font-bold text-xl mb-4 text-gray-800">Projects</h2>
            {projects.length === 0 ? (
              <p className="text-gray-500 italic">No matching projects found.</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {projects.map((project) => {
                  const { color, label } = getPriorityStyle(project.priority_level);
                  const url = `/categories/${project.category_id}/projects/${project.id}`;
                  return (
                    <Link
                      key={project.id}
                      href={url}
                      className="relative w-full sm:w-72 bg-amber-50 rounded-lg shadow-sm hover:bg-amber-100 transition-all duration-200 hover:scale-[1.02] active:scale-95 active:bg-amber-200 p-4 no-underline text-black"
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
          </section>

          {/* Tasks */}
          <section>
            <h2 className="font-bold text-xl mb-4 text-gray-800">Tasks</h2>
            {tasks.length === 0 ? (
              <p className="text-gray-500 italic">No matching tasks found.</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {tasks.map((task) => {
                  if (!task.project) return null;
                  const { color, label } = getPriorityStyle(task.priority_level);
                  const url = `/categories/${task.project.category_id}/projects/${task.project_id}/tasks/${task.id}`;
                  return (
                    <Link
                      key={task.id}
                      href={url}
                      className="relative w-full sm:w-72 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02] active:scale-95 active:bg-blue-100 p-4 no-underline text-black"
                    >
                      <div className="font-medium text-sm mb-1">{task.title}</div>
                      <div className="text-xs text-gray-500">
                        Project: {task.project.project_name}
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
          </section>
        </div>
      </div>
    </div>
  );
}

Search.layout = (page) => page;
