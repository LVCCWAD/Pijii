import {NavbarMinimalColored} from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

const DashboardCreator = () => {
  const [selected, setSelected] = useState('task');

  const renderPreview = () => {
    switch (selected) {
      case 'task':
        return (
          <div className="p-4 border rounded bg-white shadow">
            <h2 className="text-lg font-semibold mb-2">Create Task</h2>
            <input type="text" placeholder="Task name" className="border p-2 w-full mb-2" />
            <textarea placeholder="Description" className="border p-2 w-full mb-2" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Task</button>
          </div>
        );
      case 'project':
        return (
          <div className="p-4 border rounded bg-white shadow">
            <h2 className="text-lg font-semibold mb-2">Create Project</h2>
            <input type="text" placeholder="Project title" className="border p-2 w-full mb-2" />
            <textarea placeholder="Project goal" className="border p-2 w-full mb-2" />
            <button className="bg-green-500 text-white px-4 py-2 rounded">Create Project</button>
          </div>
        );
      case 'category':
        return (
          <div className="p-4 border rounded bg-white shadow">
            <h2 className="text-lg font-semibold mb-2">Create Category</h2>
            <input type="text" placeholder="Category name" className="border p-2 w-full mb-2" />
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Create Category</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col max-w-xl mx-auto mt-10 piji-gradient w-full h-full" style={{Padding:"0px 100px"}} >
      <div className="flex justify-between mb-6" >
        <button
          className={`px-4 py-2 rounded ${selected === 'task' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelected('task')}
        >
          Task
        </button>
        <button
          className={`px-4 py-2 rounded ${selected === 'project' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelected('project')}
        >
          Project
        </button>
        <button
          className={`px-4 py-2 rounded ${selected === 'category' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelected('category')}
        >
          Category
        </button>
      </div>

      {/* Preview Box */}
      {renderPreview()}
    </div>
  );
};

export default DashboardCreator;