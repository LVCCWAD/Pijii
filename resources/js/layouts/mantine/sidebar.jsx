import { useState } from 'react';
import {
  IconTrash,
  IconSettings2,
  IconArchive,
  IconSearch
} from '@tabler/icons-react';
import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import classes from './NavbarMinimalColored.module.css';
import { Link, usePage } from '@inertiajs/react';

function NavbarLink({ icon: Icon, label, active, onClick, link }) {
  const content = (
    <UnstyledButton
      onClick={onClick}
      className={classes.link}
      data-active={active || undefined}
    >
      <Icon size={40} stroke={1.5} />
    </UnstyledButton>
  );

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      {link ? <Link href={link}>{content}</Link> : content}
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconSearch, label: 'Search', link: '/search' },
  { icon: IconArchive, label: 'Archived Projects', link: '/projects/archived' },
  { icon: IconTrash, label: 'Recently Deleted Projects', link: '/projects/recently-deleted' },
];

export function NavbarMinimalColored() {
  const [active, setActive] = useState(null);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <Link href={'/'}>
          <img
            src="/images/PIJI LOGO.png"
            alt="Logo"
            className="object-cover w-[70px] h-[70px]"
          />
        </Link>
      </Center>
      Piji
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={10}>
          {links}
        </Stack>
      </div>

      <div style={{ margin: '0px 0 0 0' }} className="justify-center">
        <Stack justify="center">
          <NavbarLink
            icon={IconSettings2}
            label="Settings"
            link="/settings"
            size={40}
          />
        </Stack>
      </div>
    </nav>
  );
}
