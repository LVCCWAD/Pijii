import {NavbarMinimalColored_settings} from "../../layouts/mantine/sidebar_settings.jsx";
import Layout from '../../layouts/Layout';
import PijiHeader from "../../layouts/components/Header.jsx";
import React, { useState } from "react";

import ProjectCard from "../../layouts/components/Project_Card.jsx";
import PijiCard from "../../layouts/components/Task_Card.jsx";
import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';




export default function Preferences() {
  const [language, setLanguage] = useState("English");
  const [startWeekOnMonday, setStartWeekOnMonday] = useState(false);
  const [autoTimezone, setAutoTimezone] = useState(false);
  const [viewHistory, setViewHistory] = useState(true);
  const [profileDiscoverable, setProfileDiscoverable] = useState(false);

  return (
    <div class="main-bg">
    <div className="flex flex-row w-full">
      <NavbarMinimalColored_settings/>

        <div class="flex flex-col w-full" >
            <PijiHeader showBackButton={true}/> 
            <div className="" style={{padding:'10px'}}>
                <h1 className="text-4xl font-bold">Preferences</h1> 
            </div>
    

          <div className="p-6 max-w-auto mx-auto text-gray-800 gap-5" style={{padding:'0 15px'}}>
                <h2 className="text-2xl font-bold mb-4">Language & Time</h2>

                {/* Language */}
                <div className="flex justify-between items-center mb-6 " style={{marginBottom:'10px'}}>
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-sm text-gray-500">
                      Change the language used in the user interface.
                    </p>
                  </div>
                  <select
                    className="border rounded p-2 bg-white shadow-sm"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>Filipino</option>
                  </select>
                </div>

                {/* Start week on Monday */}
                <div className="flex justify-between items-center mb-6" style={{marginBottom:'10px'}}>
                  <div>
                    <p className="font-medium">Start week on Monday</p>
                    <p className="text-sm text-gray-500">
                      This will change how all calendars in your app look.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={startWeekOnMonday}
                    onChange={() => setStartWeekOnMonday(!startWeekOnMonday)}
                    className="toggle toggle-md"
                  />
                </div>

                {/* Set timezone automatically */}
                <div className="flex justify-between items-center mb-6" style={{marginBottom:'10px'}}>
                  <div>
                    <p className="font-medium">Set timezone automatically using your location</p>
                    <p className="text-sm text-gray-500">
                      Reminders, notifications, and emails are delivered based on your time zone.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoTimezone}
                    onChange={() => setAutoTimezone(!autoTimezone)}
                    className="toggle toggle-md"
                  />
                </div>

                {/* Timezone */}
                <div className="flex justify-between items-center mb-10" style={{marginBottom:'12px'}}>
                  <div>
                    <p className="font-medium">Timezone</p>
                    <p className="text-sm text-gray-500">Current timezone setting.</p>
                  </div>
                  <p className="text-gray-600">Auto</p>
                </div>

                <h2 className="text-2xl font-bold mb-4">Privacy</h2>

                {/* Cookie settings */}
                <div className="flex justify-between items-center mb-6" style={{marginBottom:'10px'}}>
                  <div>
                    <p className="font-medium">Cookie settings</p>
                    <p className="text-sm text-gray-500">
                      Customize cookies. See <span className="underline">Cookie Notice</span> for details.
                    </p>
                  </div>
                  <button className="text-sm underline text-blue-500">Customize</button>
                </div>

                {/* View history */}
                <div className="flex justify-between items-center mb-6" style={{marginBottom:'10px'}}>
                  <div>
                    <p className="font-medium">Show my view history</p>
                    <p className="text-sm text-gray-500">
                      People with edit or full access will be able to see when you’ve viewed a page.
                    </p>
                  </div>
                  <select
                    value={viewHistory ? "Record" : "Don't Record"}
                    onChange={(e) => setViewHistory(e.target.value === "Record")}
                    className="border rounded p-2 bg-white shadow-sm"
                  >
                    <option>Record</option>
                    <option>Don't Record</option>
                  </select>
                </div>

                {/* Profile discoverability */}
                <div className="flex justify-between items-center" style={{marginBottom:'10px'}}>
                  <div>
                    <p className="font-medium">Profile discoverability</p>
                    <p className="text-sm text-gray-500">
                      Users with your email can see your name and profile picture when inviting you to a new place
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profileDiscoverable}
                    onChange={() => setProfileDiscoverable(!profileDiscoverable)}
                    className="toggle toggle-md"
                  />
                </div>
          </div>

        </div>
    </div>
  </div>
  );
}

Preferences.layout = (page) => page;