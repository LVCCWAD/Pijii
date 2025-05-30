import { useState } from 'react';
import { IconTrash,IconSettings2, IconArchive,IconAdjustmentsHorizontal,IconBell,IconSettings  } from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './NavbarMinimalColored.module.css';
import { Link } from '@inertiajs/react';
import { useUser } from '../../Pages/UserContext.jsx';

function NavbarLink({ icon: Icon, label, active, onClick, link }) {
  const content = (
    <UnstyledButton
      onClick={onClick}
      className={`${classes.link_settings} flex items-center gap-2 px-3 py-2 rounded-md` }
      style={{padding:'0.50rem 0.75rem'}}
      data-active={active || undefined}
    >
      <div className='flex flex-row'>


      <Icon size={20} stroke={1.5} />
      <span className="text-base text-white">{label}</span>
            </div>

    </UnstyledButton>
  );

  return link ? <Link href={link}>{content}</Link> : content;
}

const mockdata = [
    { icon: IconAdjustmentsHorizontal, label: 'Preferences', link: '/settings/preferences'},
    { icon: IconBell, label: 'Notifications', link:'/settings/notification' },
    { icon: IconSettings, label: 'General', link:'/settings/general' },


];

export function NavbarMinimalColored_settings() {
  const [active, setActive] = useState(2);
  const { user } = useUser();
  

  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
  ));

  return (
    <nav className={classes.navbar_settings}>
      <Center>
       <Link className="profile" href={"/settings/profile"}>
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
      </Center>

      <div className={classes.navbarMain_settings}>
        <Stack justify="center" gap={10}>
          {links}
        </Stack>
      </div>


    </nav>
  );
}












// IconCalendarStats, IconDeviceDesktopAnalytics, IconFingerprint, IconGauge, IconHome2, IconLogout, IconSettings, IconSwitchHorizontal, IconUser,
    // { icon: IconGauge, label: 'Dashboard' },
    // { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    // { icon: IconCalendarStats, label: 'Releases' },
    // { icon: IconUser, label: 'Account' },
    // { icon: IconFingerprint, label: 'Security' },
    // { icon: IconSettings, label: 'Settings' },


            {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account"/> */}
