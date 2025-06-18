import React, { useState } from "react";
import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import Layout from "../layouts/Layout";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";

export default function Settings() {
  const [language, setLanguage] = useState("English");
  const [startWeekOnMonday, setStartWeekOnMonday] = useState(false);
  const [autoTimezone, setAutoTimezone] = useState(false);
  const [viewHistory, setViewHistory] = useState(true);
  const [profileDiscoverable, setProfileDiscoverable] = useState(false);

  return (
    <div className="flex h-screen piji-green overflow-hidden">
      <NavbarMinimalColored />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <PijiHeader />
        <PijiHeader2 title="Settings" />

        <div className="max-w-4xl w-full mx-auto mt-10 mb-16 px-10 py-12 bg-white rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Preferences
          </h2>

          <div className="space-y-10 text-gray-800">

            {/* Language & Time */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Language & Time</h3>

              {/* Language */}
              <div className="flex justify-between items-center mb-4">
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
                </select>
              </div>

              {/* Start week on Monday */}
              <div className="flex justify-between items-center mb-4">
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

              {/* Auto timezone */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">
                    Set timezone automatically using your location
                  </p>
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

              {/* Timezone display */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="font-medium">Timezone</p>
                  <p className="text-sm text-gray-500">Current timezone setting.</p>
                </div>
                <p className="text-gray-600">Auto</p>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Privacy</h3>

              {/* View history */}
              <div className="flex justify-between items-center mb-4">
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
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Profile discoverability</p>
                  <p className="text-sm text-gray-500">
                    Users with your email can see your name and profile picture when inviting you to a new place.
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
    </div>
  );
}

Settings.layout = (page) => <Layout>{page}</Layout>;
