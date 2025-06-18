import React from 'react';
import './header.css';
import { IconZoom, IconBell, IconArrowLeft } from '@tabler/icons-react'; // Add back icon
import { Link } from '@inertiajs/react';
import { useUser } from '../../Pages/UserContext.jsx';

// Accept props, especially for conditional behavior
export default function PijiHeader({ showBackButton = false }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const { user } = useUser();

  return (
    <header className="app-header">

      <div><h1 className="text-5xl font-black">Pijii</h1></div>
    
      {/* Middle: Date */}
      <div className="ml-125 header-middle">
        <p className="text-xl font-bold date-text">{today}</p>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="header-right" style={{ margin: '5px 30px 0 0' }}>
        {/* <div className="notification">
          <Link href="/Notifications"><IconBell size={29} /></Link>
        </div> */}

        <Link className="profile" href="/profile">
          <img
            src={user?.avatar || '/images/default-avatar.png'}
            alt="Profile"
            className="profile-pic"
          />

          <div>
            <span className="profile-name">{user?.name}</span>
            <p className="font-md">Student</p>
          </div>
        </Link>
      </div>
      
    </header>
  );
}
