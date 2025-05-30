import {NavbarMinimalColored_settings} from "../../layouts/mantine/sidebar_settings.jsx";
import Layout from '../../layouts/Layout';
import PijiHeader from "../../layouts/components/Header.jsx";

import ProjectCard from "../../layouts/components/Project_Card.jsx";
import PijiCard from "../../layouts/components/Task_Card.jsx";
import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';




export default function Notifications() {
   const notifications = [
    {
      title: 'Profile Updated',
      content: 'Your profile was successfully updated.',
      time: '2 hours ago',
    },
    {
      title: 'New Task Assigned',
      content: 'You have been assigned to "Project Phoenix".',
      time: '5 hours ago',
    },
    {
      title: 'Password Changed',
      content: 'Your password was changed successfully.',
      time: '1 day ago',
    },
  ];

  return (
    <div class="main-bg">
    <div className="flex flex-row w-full">
      <NavbarMinimalColored_settings/>

        <div class="flex flex-col w-full" >
            <PijiHeader showBackButton={true}/> 
            <div className="" style={{padding:'10px'}}>
                <h1 className="text-4xl font-bold">Notifications</h1> 
            </div>
    
        {/* <div className="min-h-screen bg-gray-50 p-6">
              <div className="max-w-xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <BellIcon className="w-6 h-6" /> Notifications
                </h1>
                <div className="space-y-4">
                  {notifications.map((note, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
                    >
                      <h2 className="text-lg font-medium">{note.title}</h2>
                      <p className="text-gray-600">{note.content}</p>
                      <span className="text-sm text-gray-400">{note.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

        </div>
    </div>
  </div>
  );
}

Notifications.layout = (page) => page;
