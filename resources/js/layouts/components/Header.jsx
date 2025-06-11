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

      {/* Left Section */}
      <div className="header-left search-input">
        <Link><IconZoom size={29} /></Link>
        <input type="text" placeholder=" Search..." className="w-full h-[20px]" />
      </div>

              {/* Conditionally show back button */}
        {showBackButton && (
          
          <Link href="/"
          style={{padding:'10px'}}  
          className="piji-green flex items-center gap-1 text-md font-large text-white hover:underline rounded-xl">
            <IconArrowLeft size={24} />
            <span >Back to Dashboard</span>
          </Link>
        )}


      {/* Middle: Date */}
      <div className="header-middle">
        <p className="text-xl font-bold date-text">{today}</p>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="header-right" style={{ margin: '0 90px 0 0' }}>
        {/* <div className="notification">
          <Link href="/Notifications"><IconBell size={29} /></Link>
        </div> */}

        <Link className="profile" href="/profile">
          <img
            src={user?.avatar|| 'https://i.pravatar.cc/40'} 
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
