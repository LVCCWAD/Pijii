import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Modal, Tooltip } from '@mantine/core';
import { IconEdit, IconPlus, IconPencil, IconCheck } from '@tabler/icons-react';

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
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">
                    Category: {category.name}
                  </h1>
                  <Tooltip label="Edit Category" position="bottom">
                    <button onClick={() => setEditModalOpen(true)} className="cursor-pointer">
                      <IconEdit className="hover:text-amber-600 transition cursor-pointer" />
                    </button>
                  </Tooltip>
                </div>

                {success && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-md border border-green-300 shadow-sm">
                    <IconCheck size={16} className="text-green-700" />
                    <span>{success}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => openFormWithStage('to_do')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl shadow hover:bg-amber-100 hover:text-amber-600 transition cursor-pointer"
              >
                <IconPlus size={20} className="cursor-pointer" />
                <span className="text-base font-medium">Create</span>
              </button>
            </div>

            {/* Project Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {Object.entries(stageConfigs).map(([key, config]) => (
                <div key={key} className={`${config.bg} rounded-lg shadow overflow-hidden flex flex-col`}>
                  <div className={`flex justify-between items-center ${config.head} p-2`}>
                    <h2 className="font-semibold text-lg md:text-xl">{config.label}</h2>
                    <Tooltip label={`Add project to ${config.label}`}>
                      <button onClick={() => openFormWithStage(key)} className="cursor-pointer">
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
                          <Link key={project.id} href={`/categories/${category.id}/projects/${project.id}`}>
                            <div className="group flex flex-col gap-1 bg-amber-50 rounded-xl shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-[1.02] hover:text-blue-600 active:scale-95 active:bg-amber-200 p-3 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <p className="font-semibold text-md">{project.project_name || 'Untitled'}</p>
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200">
                                  <Tooltip label="Edit project">
                                    <IconPencil size={18} className="cursor-pointer" />
                                  </Tooltip>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">📅 {scheduledDate}</p>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
                            </div>
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
          categories={[category]}
          stages={stages}
          defaultCategoryId={category.id}
          defaultStageId={selectedStageId}
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
