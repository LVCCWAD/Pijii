import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Modal, Tooltip } from '@mantine/core';
import {
  IconPlus,
  IconCheck,
  IconPencil,
  IconChevronCompactRight,
  IconEdit,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";

import { NavbarMinimalColored } from '../layouts/mantine/sidebar.jsx';
import PijiHeader from "../layouts/components/Header.jsx";
import CreateProjectForm from '../Pages/Create/Project.jsx';
import EditCategoryForm from '../Pages/Edit/Category.jsx';

export default function Category() {
  const { category, projects, stages, success } = usePage().props;
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);

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
    to_do:        { label: "To-do",       bg: "bg-gray-100",    head: "bg-gray-200" },
    in_progress:  { label: "In Progress", bg: "bg-yellow-100",  head: "bg-amber-200" },
    completed:    { label: "Completed",   bg: "bg-green-100",   head: "bg-green-200" },
    on_hold:      { label: "On-hold",     bg: "bg-red-100",     head: "bg-red-200" }
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
                      <IconPencil
                        size={20}
                        className="hover:text-amber-600 transition cursor-pointer text-gray-600"
                      />
                    </button>
                  </Tooltip>
                </div>

                {success && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-md border border-green-300 shadow-sm">
                    <IconCheck size={16} className="text-green-700 cursor-pointer" />
                    <span>{success}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => openFormWithStage('to_do')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl shadow hover:bg-amber-100 hover:text-amber-600 transition cursor-pointer"
                aria-label="Create New Project"
              >
                <span className="text-base font-medium">New Project</span>
                <IconPlus size={20} className="cursor-pointer" />
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
                        className="cursor-pointer"
                        aria-label={`Add project to ${config.label}`}
                      >
                        <IconPlus size={20} className="cursor-pointer" />
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
                        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                        const scheduledDate = project.scheduled_at
                          ? new Date(project.scheduled_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                          : "No date";

                        return (
                          <Link
                            key={project.id}
                            href={`/categories/${category.id}/projects/${project.id}`}
                            className="group flex flex-col gap-1 bg-amber-50 rounded-xl shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-[1.02] active:scale-95 active:bg-amber-200 p-3 cursor-pointer no-underline"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-md cursor-pointer">
                                {project.project_name || 'Untitled'}
                              </span>
                              <div
                                className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2 items-center cursor-default"
                                onClick={(e) => e.preventDefault()}
                              >
                                {/* Archive / Unarchive */}
                                {project.archived_at ? (
                                  <Tooltip label="Unarchive project" position="bottom" withinPortal={false}>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (confirm('Unarchive this project?')) {
                                          router.post(`/categories/${category.id}/projects/${project.id}/unarchive`);
                                        }
                                      }}
                                      className="p-1 cursor-pointer"
                                      aria-label="Unarchive project"
                                    >
                                      {/* Unarchive icon */}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-green-600 hover:text-green-800 cursor-pointer"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-7l-2-2H5a2 2 0 00-2 2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v-4m0 0l-3 3m3-3l3 3" />
                                      </svg>
                                    </button>
                                  </Tooltip>
                                ) : (
                                  <Tooltip label="Archive project" position="bottom" withinPortal={false}>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (confirm('Archive this project?')) {
                                          router.post(`/categories/${category.id}/projects/${project.id}/archive`);
                                        }
                                      }}
                                      className="p-1 cursor-pointer"
                                      aria-label="Archive project"
                                    >
                                      {/* Archive icon */}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-yellow-600 hover:text-yellow-800 cursor-pointer"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-7l-2-2H5a2 2 0 00-2 2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v4m0 0l-3-3m3 3l3-3" />
                                      </svg>
                                    </button>
                                  </Tooltip>
                                )}

                                {/* Delete */}
                                <Tooltip label="Delete project" position="bottom" withinPortal={false}>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (confirm('Delete this project?')) {
                                        router.delete(`/categories/${category.id}/projects/${project.id}`);
                                      }
                                    }}
                                    className="p-1 cursor-pointer"
                                    aria-label="Delete project"
                                  >
                                    {/* Delete icon */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 011-1h2a1 1 0 011 1m-4 0v4" />
                                    </svg>
                                  </button>
                                </Tooltip>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 cursor-default">📅 {scheduledDate}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1 cursor-default">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 cursor-default">{progress}% complete</p>
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

      {/* Create Project Modal */}
      <Modal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title={<div className="text-2xl font-semibold">Create New Project</div>}
        centered
        size="lg"
        overlayProps={{ backgroundOpacity: 0.40, blur: 1 }}
        styles={{
          header: { justifyContent: 'center', backgroundColor: "#fce4b3" },
          content: {
            width: '100%',
            maxWidth: '700px',
            height: 'auto',
            maxHeight: '90vh',
            backgroundColor: '#fff5e1',
          }
        }}
      >
        <CreateProjectForm
          category={category}
          selectedStage={stages.find(s => s.id === selectedStageId)}
          parentProject={null}
          onSuccess={() => {
            setCreateModalOpen(false);
            router.reload({ only: ['projects'] });
          }}
        />
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={<div className="text-2xl font-semibold">Edit Category</div>}
        centered
        size="md"
        overlayProps={{ backgroundOpacity: 0.40, blur: 1 }}
        styles={{
          header: { justifyContent: 'center', backgroundColor: "#bbf7d0" },
          content: {
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            maxHeight: '90vh',
            backgroundColor: '#fff7ed',
          }
        }}
      >
        <EditCategoryForm category={category} onClose={() => setEditModalOpen(false)} />
      </Modal>
    </div>
  );
}

Category.layout = (page) => page;
