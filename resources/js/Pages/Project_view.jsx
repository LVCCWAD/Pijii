import { useEffect, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Modal, Tooltip } from "@mantine/core";

import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";

import {
  IconTrash,
  IconChevronCompactRight,
  IconPlus,
  IconEdit,
  IconChevronDown,
  IconChevronRight,
  IconFlag,
} from "@tabler/icons-react";

import CreateProjectForm from "../Pages/Create/Project.jsx";
import EditProjectForm from "../Pages/Edit/Project.jsx";
import CreateTaskForm from "../Pages/Create/Task.jsx";

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

export default function ProjectView() {
  const [openedTaskModal, setOpenedTaskModal] = useState(false);
  const [openedSubprojectModal, setOpenedSubprojectModal] = useState(false);
  const [openedEditProjectModal, setOpenedEditProjectModal] = useState(false);
  const [showSubprojects, setShowSubprojects] = useState(true);
  const [showSuccess, setShowSuccess] = useState(true);
  const [selectedStageId, setSelectedStageId] = useState(1);

  const { project, ancestors, subprojects = [], flash } = usePage().props;
  const category = project?.category;
  const tasks = project?.tasks || [];

  useEffect(() => {
    if (flash?.success) {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [flash?.success]);

  const stages = [
    { name: "To-do", id: 1, bg: "bg-gray-100", header: "bg-gray-200" },
    { name: "In Progress", id: 2, bg: "bg-yellow-100", header: "bg-amber-200" },
    { name: "Completed", id: 3, bg: "bg-green-100", header: "bg-green-200" },
    { name: "On-hold", id: 4, bg: "bg-red-100", header: "bg-red-200" },
  ];

  return (
    <div className="piji-green h-screen overflow-hidden">
      <div className="flex flex-row h-full w-full">
        <NavbarMinimalColored />
        <div className="flex flex-col w-full h-full overflow-hidden">
          <PijiHeader />
          <PijiHeader2 title={`Project: ${project?.project_name || "Untitled"}`} />

          <div className="flex-1 overflow-y-auto p-4">
            {flash?.success && showSuccess && (
              <div className="mb-4 mx-4 p-3 rounded-lg bg-green-100 text-green-800 border border-green-300 shadow-sm transition-opacity duration-500">
                {flash.success}
              </div>
            )}

            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex gap-1 items-center flex-wrap">
                <h1 className="text-3xl font-bold cursor-pointer">
                  <Link href={`/categories/${category?.id}`}>{category?.name || "Category"}</Link>
                </h1>
                <IconChevronCompactRight size={20} />
                {ancestors?.map((ancestor) => (
                  <div key={ancestor.id} className="flex gap-1 items-center">
                    <h1 className="text-3xl font-bold cursor-pointer">
                      <Link href={`/categories/${category?.id}/projects/${ancestor.id}`}>{ancestor.project_name}</Link>
                    </h1>
                    <IconChevronCompactRight size={20} />
                  </div>
                ))}
                <h1 className="text-3xl font-bold">{project.project_name}</h1>
                <Tooltip label="Edit project">
                  <button
                    onClick={() => setOpenedEditProjectModal(true)}
                    className="cursor-pointer"
                    aria-label="Edit Project"
                  >
                    <IconEdit className="hover:text-amber-600 transition-colors duration-200" />
                  </button>
                </Tooltip>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold flex items-center gap-1">
                  <Tooltip label={showSubprojects ? "Hide subprojects" : "Show subprojects"}>
                    <button
                      onClick={() => setShowSubprojects(!showSubprojects)}
                      className="cursor-pointer"
                      aria-label="Toggle Subprojects Visibility"
                    >
                      {showSubprojects ? <IconChevronDown size={20} /> : <IconChevronRight size={20} />}
                    </button>
                  </Tooltip>
                  Subprojects
                </h2>
                <Tooltip label="Add subproject">
                  <button
                    onClick={() => setOpenedSubprojectModal(true)}
                    className="flex items-center gap-1 text-md bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-105 hover:text-amber-600 active:scale-95 active:bg-amber-200 px-4 h-[40px] cursor-pointer"
                  >
                    <IconPlus size={16} /> Add Subproject
                  </button>
                </Tooltip>
              </div>

              {showSubprojects && (subprojects.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No subprojects.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {subprojects.map((sub) => {
                    const totalTasks = sub.tasks?.length || 0;
                    const completedTasks = sub.tasks?.filter((t) => t.status === "completed").length || 0;
                    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                    const scheduledDate = sub.scheduled_at
                      ? new Date(sub.scheduled_at).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No date";

                    return (
                      <div key={sub.id} className="group cursor-pointer relative">
                        <Link
                          href={`/categories/${category?.id}/projects/${sub.id}`}
                          className="flex flex-col gap-1 bg-amber-50 rounded-xl shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-[1.02] hover:text-blue-600 active:scale-95 active:bg-amber-200 p-3"
                        >
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-md">{sub.project_name || "Untitled"}</p>
                          </div>
                          <p className="text-xs text-gray-600">📅 {scheduledDate}</p>
  
                        </Link>

                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Tooltip label="Delete subproject">
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this subproject?")) {
                                  router.delete(`/categories/${category?.id}/projects/${sub.id}`);
                                }
                              }}
                              className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                            >
                              <IconTrash size={18} />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">Tasks</h2>
              <Tooltip label="Create a new task">
                <button
                  onClick={() => {
                    setSelectedStageId(1);
                    setOpenedTaskModal(true);
                  }}
                  className="flex w-[140px] h-[40px] justify-center items-center text-md bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-105 hover:text-amber-600 active:scale-95 active:bg-amber-200 cursor-pointer"
                >
                  Create +
                </button>
              </Tooltip>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stages.map((stage) => (
                <div key={stage.id} className={`${stage.bg} rounded-lg shadow overflow-auto`}>
                  <div className={`flex justify-between ${stage.header} p-2`}>
                    <h2 className="font-semibold text-2xl">{stage.name}</h2>
                    <Tooltip label="Add task to this stage">
                      <button
                        onClick={() => {
                          setSelectedStageId(stage.id);
                          setOpenedTaskModal(true);
                        }}
                        className="cursor-pointer"
                      >
                        <IconPlus />
                      </button>
                    </Tooltip>
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    {tasks.filter((task) => task.stage?.id === stage.id).map((task) => {
                      const { color, label } = getPriorityStyle(task.priority_level);
                      return (
                        <div key={task.id} className="group cursor-pointer">
                          <Link
                            href={`/categories/${category?.id}/projects/${project.id}/tasks/${task.id}`}
                            className="flex flex-col w-full min-h-[40px] bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-105 hover:text-blue-600 active:scale-95 active:bg-amber-200 px-3 py-2"
                          >
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">{task.title}</p>
                              <div className="opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <Tooltip label="Delete task">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (confirm("Are you sure you want to delete this task?")) {
                                        router.delete(`/categories/${category?.id}/projects/${project.id}/tasks/${task.id}`);
                                      }
                                    }}
                                    className="text-gray-500 hover:text-red-600 transition-colors duration-200"
                                    aria-label="Delete Task"
                                  >
                                    <IconTrash />
                                  </button>
                                </Tooltip>
                              </div>
                            </div>
                            {task.description && (
                              <p className="text-xs text-gray-600 truncate">{task.description}</p>
                            )}
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                              <span>📅 {task.scheduled_at ? new Date(task.scheduled_at).toLocaleDateString() : "No date"}</span>
                              <div className="flex items-center gap-1">
                                <Tooltip label={label}>
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color}`}>
                                    <IconFlag size={14} className="text-white" />
                                  </div>
                                </Tooltip>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subproject Modal */}
      <Modal
        opened={openedSubprojectModal}
        onClose={() => setOpenedSubprojectModal(false)}
        title={<div className="text-2xl font-semibold">Create Subproject</div>}
        centered
        size="md"
        overlayProps={{ backgroundOpacity: 0.4, blur: 1 }}
        styles={{
          header: { justifyContent: "center", backgroundColor: "#fce4b3" },
          content: { maxWidth: "600px", maxHeight: "90vh", backgroundColor: "#fff5e1", overflowY: "auto" },
        }}
      >
        <CreateProjectForm
          category={category}
          selectedStage={null}
          parentProject={project}
          onSuccess={() => {
            setOpenedSubprojectModal(false);
            window.location.reload();
          }}
        />
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        opened={openedEditProjectModal}
        onClose={() => setOpenedEditProjectModal(false)}
        title={<div className="text-2xl font-semibold">Edit Project</div>}
        centered
        size="md"
        overlayProps={{ backgroundOpacity: 0.4, blur: 1 }}
        styles={{
          header: { justifyContent: "center", backgroundColor: "#dbeafe" },
          content: { maxWidth: "600px", maxHeight: "90vh", backgroundColor: "#eff6ff", overflowY: "auto" },
        }}
      >
        <EditProjectForm
          project={project}
          onClose={() => setOpenedEditProjectModal(false)}
          onSuccess={() => {
            setOpenedEditProjectModal(false);
            window.location.reload();
          }}
        />
      </Modal>

      {/* Task Modal */}
      <Modal
        opened={openedTaskModal}
        onClose={() => setOpenedTaskModal(false)}
        title={<div className="text-2xl font-semibold">Create Task</div>}
        centered
        size="md"
        overlayProps={{ backgroundOpacity: 0.4, blur: 1 }}
        styles={{
          header: { justifyContent: "center", backgroundColor: "#fce4b3" },
          content: { maxWidth: "600px", maxHeight: "90vh", backgroundColor: "#fff5e1", overflowY: "auto" },
        }}
      >
        <CreateTaskForm
          category={category}
          project={project}
          stages={stages}
          initialStageId={selectedStageId}
          onSuccess={() => {
            setOpenedTaskModal(false);
            window.location.reload();
          }}
        />
      </Modal>
    </div>
  );
}

ProjectView.layout = (page) => page;
