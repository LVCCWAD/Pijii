import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Modal, Tooltip } from '@mantine/core';
import {
  IconPlus,
  IconTrash,
  IconFlag,
  IconPencil
} from "@tabler/icons-react";

import { NavbarMinimalColored } from '../layouts/mantine/sidebar.jsx';
import PijiHeader from "../layouts/components/Header.jsx";
import CreateProjectForm from '../Pages/Create/Project.jsx';
import EditCategoryForm from '../Pages/Edit/Category.jsx';

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

export default function Category() {
  const { category, projects, stages } = usePage().props;
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const stageNameToId = {};
  stages.forEach((s) => (stageNameToId[s.stage_name] = s.id));

  const openFormWithStage = (stageKey) => {
    const id = stageNameToId[stageKey] || null;
    setSelectedStageId(id);
    setCreateModalOpen(true);
  };

  const grouped = {};
  stages.forEach(stage => {
    grouped[stage.stage_name] = [];
  });

  projects.forEach(project => {
    const stageKey = project.stage?.stage_name;
    if (stageKey && grouped[stageKey]) {
      grouped[stageKey].push(project);
    }
  });

  const stageConfigs = {
    to_do: { label: "To-do", bg: "bg-gray-100", head: "bg-gray-200" },
    in_progress: { label: "In Progress", bg: "bg-yellow-100", head: "bg-amber-200" },
    completed: { label: "Completed", bg: "bg-green-100", head: "bg-green-200" },
    on_hold: { label: "On-hold", bg: "bg-red-100", head: "bg-red-200" }
  };

  const handleDelete = (project) => {
    if (confirm('Delete this project?')) {
      router.delete(`/categories/${category.id}/projects/${project.id}`, {
        onSuccess: () => {
          setSuccessMessage("Successfully deleted project");
          router.reload({ only: ['projects'] });
        }
      });
    }
  };

  const handleArchive = (project) => {
    if (confirm('Archive this project?')) {
      router.post(`/categories/${category.id}/projects/${project.id}/archive`, {
        onSuccess: () => {
          setSuccessMessage("Successfully archived project");
          router.reload({ only: ['projects'] });
        }
      });
    }
  };

  const handleUnarchive = (project) => {
    if (confirm('Unarchive this project?')) {
      router.post(`/categories/${category.id}/projects/${project.id}/unarchive`, {
        onSuccess: () => {
          setSuccessMessage("Successfully unarchived project");
          router.reload({ only: ['projects'] });
        }
      });
    }
  };

  return (
    <div className="piji-green h-screen flex overflow-hidden">
      <div className="flex flex-row w-full overflow-hidden">
        <NavbarMinimalColored />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <PijiHeader />
          <div className="p-4 md:p-6 xl:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">
                    Category: {category.name}
                  </h1>
                  <Tooltip label="Edit Category" position="bottom" withinPortal={false}>
                    <button
                      onClick={() => setEditModalOpen(true)}
                      className="cursor-pointer"
                      aria-label="Edit Category"
                    >
                      <IconPencil size={20} className="hover:text-amber-600 transition text-gray-600" />
                    </button>
                  </Tooltip>
                </div>

                {successMessage && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-md border border-green-300 shadow-sm">
                    <IconPlus size={16} className="text-green-700" />
                    <span>{successMessage}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => openFormWithStage('to_do')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl shadow hover:bg-amber-100 hover:text-amber-600 transition"
              >
                <span className="text-base font-medium">New Project</span>
                <IconPlus size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {Object.entries(stageConfigs).map(([key, config]) => (
                <div
                  key={key}
                  className={`${config.bg} rounded-lg shadow overflow-hidden flex flex-col`}
                >
                  <div className={`flex justify-between items-center ${config.head} p-2`}>
                    <h2 className="font-semibold text-lg md:text-xl">{config.label}</h2>
                    <Tooltip label={`Add project to ${config.label}`} position="bottom" withinPortal={false}>
                      <button
                        onClick={() => openFormWithStage(key)}
                        aria-label={`Add project to ${config.label}`}
                      >
                        <IconPlus size={20} />
                      </button>
                    </Tooltip>
                  </div>

                  <div className="flex flex-col gap-2 p-3 max-h-[75vh] overflow-y-auto">
                    {(grouped[key] || []).length === 0 ? (
                      <p className="text-sm text-gray-500 italic p-2">No projects here yet.</p>
                    ) : (
                      grouped[key].map(project => {
                        const totalTasks = project.tasks?.length || 0;
                        const completedTasks = project.tasks?.filter(t => t.status === 'completed').length || 0;
                        const scheduledDate = project.scheduled_at
                          ? new Date(project.scheduled_at).toLocaleString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })
                          : "No date";

                        return (
                          <Link
                            key={project.id}
                            href={`/categories/${category.id}/projects/${project.id}`}
                            className="group flex flex-col justify-between bg-amber-50 rounded-xl shadow-md transition duration-200 hover:bg-amber-100 hover:scale-[1.02] active:scale-95 active:bg-amber-200 p-3 cursor-pointer no-underline"
                          >
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-md">
                                  {project.project_name || 'Untitled'}
                                </span>
                                <div
                                  className="opacity-0 group-hover:opacity-100 transition flex gap-2 items-center"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {project.archived_at ? (
                                    <Tooltip label="Unarchive project" position="bottom" withinPortal={false}>
                                      <button onClick={(e) => { e.preventDefault(); handleUnarchive(project); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-7l-2-2H5a2 2 0 00-2 2z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v-4m0 0l-3 3m3-3l3 3" />
                                        </svg>
                                      </button>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip label="Archive project" position="bottom" withinPortal={false}>
                                      <button onClick={(e) => { e.preventDefault(); handleArchive(project); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-600 hover:text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-7l-2-2H5a2 2 0 00-2 2z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v4m0 0l-3-3m3 3l3-3" />
                                        </svg>
                                      </button>
                                    </Tooltip>
                                  )}
                                  <Tooltip label="Delete project" position="bottom" withinPortal={false}>
                                    <button onClick={(e) => { e.preventDefault(); handleDelete(project); }}>
                                      <IconTrash size={20} className="text-red-600 hover:text-red-800" />
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">📅 {scheduledDate}</p>
                            </div>

                            {project.priority_level && (() => {
                              const { color, label } = getPriorityStyle(project.priority_level);
                              return (
                                <div className="flex justify-end">
                                  <Tooltip label={label} position="top" withArrow>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color}`}>
                                      <IconFlag size={14} className="text-white" />
                                    </div>
                                  </Tooltip>
                                </div>
                              );
                            })()}
                          </Link>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title={<div className="text-2xl font-semibold">Create New Project</div>}
        centered
        size="lg"
        overlayProps={{ backgroundOpacity: 0.40, blur: 1 }}
        styles={{
          header: { justifyContent: 'center', backgroundColor: "#fce4b3" },
          content: { width: '100%', maxWidth: '700px', maxHeight: '90vh', backgroundColor: '#fff5e1' }
        }}
      >
        <CreateProjectForm
          category={category}
          selectedStage={stages.find(s => s.id === selectedStageId)}
          parentProject={null}
          onSuccess={() => {
            setCreateModalOpen(false);
            setSuccessMessage("Successfully created project");
            router.reload({ only: ['projects'] });
          }}
        />
      </Modal>

      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={<div className="text-2xl font-semibold">Edit Category</div>}
        centered
        size="md"
        overlayProps={{ backgroundOpacity: 0.40, blur: 1 }}
        styles={{
          header: { justifyContent: 'center', backgroundColor: "#bbf7d0" },
          content: { width: '100%', maxWidth: '600px', maxHeight: '90vh', backgroundColor: '#fff7ed' }
        }}
      >
        <EditCategoryForm category={category} onClose={() => setEditModalOpen(false)} />
      </Modal>
    </div>
  );
}

Category.layout = (page) => page;
