import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import './Card_Template.css';

export default function ProjectCard() {
  return (
    <div className="project-card">
      {/* Top Status Section */}
      <div className='flex flex-col'>
        <div className="flex flex-row gap-1 justify-between" style={{padding:'15px 10px'}}>

          <div className="flex flex-row gap-1" id='left'>
            <div className='flex bg-amber-50 w-8 h-8 rounded-full items-center justify-center'
            style={{margin:'-3px 0'}}>  
              <h1 className='font-semibold' >1</h1>
            </div>
            <h1 className='font-bold text-xl'>Personal Task</h1>
          </div>

          <div className='flex flex-row gap-2' id='right'>
          <IconPlus/>
          <IconDotsVertical/>
          </div>
        </div>
 
           {/* foreach */}
          <div className='inner-project-card'>

          </div>
        <div className="top-status ">
          <div>
            <p className="label">Task Priority :</p>
            <span className="priority">Medium</span>
          </div>
          <div className="text-right">
            <div className='flex flex-row'>
            <p className="label">Task Status :</p>
            </div>
            <span className="status">New Task</span>
          </div>
        </div>


      </div>



    </div>
  );
}
