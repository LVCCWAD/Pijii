import React, { useState } from 'react';
import CreateTaskForm from './Create/Task';
import CreateProjectForm from './Create/Project';

const DashboardCreator = () => {
  const [selected, setSelected] = useState('task');

  const renderPreview = () => {
    switch (selected) {
      case 'task':
        return (
          <CreateTaskForm/>
          // <div className="p-4 border rounded bg-white shadow">
          //   <h2 className="text-lg font-semibold mb-2">Create Task</h2>
          //   <input type="text" placeholder="Task name" className="border p-2 w-full mb-2" />
          //   <textarea placeholder="Description" className="border p-2 w-full mb-2" />
          //   <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Task</button>
          // </div>
        );
      case 'project':
        return (
                    <CreateProjectForm/>

          // <div className="p-4 border rounded bg-white shadow">
          //   <h2 className="text-lg font-semibold mb-2">Create Project</h2>
          //   <input type="text" placeholder="Project title" className="border p-2 w-full mb-2" />
          //   <textarea placeholder="Project goal" className="border p-2 w-full mb-2" />
          //   <button className="bg-green-500 text-white px-4 py-2 rounded">Create Project</button>
          // </div>
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
    <div className="w-full h-full flex flex-col justify-center "style={{padding:'0 '}}>

    <div className="grid grid-cols-1 sm:grid-cols-3" style={{margin:'10px 0', Padding:'10px'}}>
      <button
        style={{Padding:'10px 20px'}}
        className={` rounded text-lg sm:text-xl transition-all ${
          selected === 'task' ? 'bg-blue-500 text-white' : 'bg-[#fff5e1]'
        }`}
        
        onClick={() => setSelected('task')}
        //  onClick={openTaskModal}
      >
        <h1  style={{Margin:'10px 20px'}}>Task</h1>
      </button>

      <button
        className={`rounded text-lg sm:text-xl transition-all ${
          selected === 'project' ? 'bg-green-500 text-white' : 'bg-gray-200'
        }`}
        style={{Margin:'10px 20px'}}
        onClick={() => setSelected('project')}
      >
        Project
      </button>

      <button
        className={`rounded text-lg sm:text-xl transition-all ${
          selected === 'category' ? 'bg-orange-500 text-white' : 'bg-gray-200'
        }`}
        style={{Padding:'10px 20px'}}
        onClick={() => setSelected('category')}
      >
        Category
      </button>
    </div>


      {/* <div className="flex justify-around "style={{marginBottom:'10px'}} >
        <button
          className={`fpx-4 py-2 rounded ${selected === 'task' ? 'bg-blue-500 text-white' : 'bg-gray-200'}` }
          style={{padding:'0.5rem 3rem', fontSize:'20px'}}
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
      </div> */}

      {/* Preview Box */}
      {renderPreview()}
    </div>
  );
};

export default DashboardCreator;