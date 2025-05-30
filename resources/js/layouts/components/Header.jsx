import React from 'react';
import './header.css';
import { IconZoom, IconBell } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import { useUser } from '../../Pages/UserContext.jsx';

export default function PijiHeader() {

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const { user } = useUser();

  return (
    <header className="app-header">
      {/* Left: Search box */}
      <div className="header-left search-input">

        <Link>< IconZoom size={29}/> </Link>
        <input type="text" placeholder=" Search..."  className="w-full h-[20px]" />
      </div>

      {/* Middle: Date */}
      <div className="header-middle">
        <p className="text-xl font-bold date-text">{today}</p>
      </div>

      {/* Right: Notification and Profile */}
      <div className="header-right" style={{margin:"0 90px 0 0"}}>
        
        <div className="notification">
          <Link href={""}>< IconBell size={29}/> </Link>
        </div>

        <Link className="profile" href={"/profile"}>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="profile-pic"
          />
          <div>
            <span className="profile-name">{user.name}</span>
            <p className="font-md">Student</p>
          </div>
        </Link>

      </div>
    </header>
  );
}
