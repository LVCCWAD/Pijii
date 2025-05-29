import { useState } from 'react';
import { IconTrash,IconSettings2, IconArchive,  } from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './NavbarMinimalColored.module.css';

function NavbarLink({ icon: Icon, label, active, onClick }) {
    return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>

        <Icon size={40} stroke={1.5}/>
      </UnstyledButton>
    </Tooltip>);
}
const mockdata = [
    { icon: IconArchive, label: 'Archived' },
    { icon: IconTrash, label: 'Recently Deleted' },

];
export function NavbarMinimalColored() {
    const [active, setActive] = useState(2);

    const links = mockdata.map((link, index) => (<NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)}/>));
    
    return (<nav className={classes.navbar}>
      <Center>
        <img src="/images/PIJI LOGO.png" alt="Logo" className="object-cover  w-[70px] h-[70px]"/>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={10}>
          {links}
        </Stack>

      </div>


      <div style={{margin:"0px 0 0 0"}} className="justify-center"> 
        <Stack justify="center">
          <NavbarLink icon={IconSettings2} label="Settings" size={40}/>
        </Stack>
      </div>

    </nav>);
}











// IconCalendarStats, IconDeviceDesktopAnalytics, IconFingerprint, IconGauge, IconHome2, IconLogout, IconSettings, IconSwitchHorizontal, IconUser,
    // { icon: IconGauge, label: 'Dashboard' },
    // { icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
    // { icon: IconCalendarStats, label: 'Releases' },
    // { icon: IconUser, label: 'Account' },
    // { icon: IconFingerprint, label: 'Security' },
    // { icon: IconSettings, label: 'Settings' },


            {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account"/> */}
