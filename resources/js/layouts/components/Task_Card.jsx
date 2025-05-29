import { IconDotsVertical } from '@tabler/icons-react';
import './Card_Template.css';

export default function PijiCard() {
  return (
    <div className="piji-card">
      {/* Top Status Section */}
      <div className="card-top">
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
        {/* Dots can go here later if needed */}
      </div>

      {/* Main Content */}
      <div className="card-content">
        <p className="date">07, April 2025</p>
        <h2 className="title">Wireframe</h2>
        <p className="description">
          Make a draft wireframe for WAD Project. Due tomorrow at 7am.<br />
          Refer to the documentation!
        </p>
        <div className="meta flex flex-row justify-between">
          <div className='flex flex-col'>
            <p>Created by : You</p>
            <p>Last edited by : You</p>
          </div>

          <div className='flex flex-col'>
            <p>Time Created - 3:20 PM</p>
            <p>Latest Edit - 5:13 PM</p>
          </div>
       


        </div>
      </div>
    </div>
  );
}
