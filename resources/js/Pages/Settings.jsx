import {NavbarMinimalColored_settings} from "../layouts/mantine/sidebar_settings.jsx";
import PijiHeader from "../layouts/components/Header.jsx";

import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';




export default function Settings() {
  return (
    <div class="main-bg">
    <div className="flex flex-row w-full">
      <NavbarMinimalColored_settings/>

        <div class="flex flex-col w-full" >
            <PijiHeader showBackButton={true} /> 

    


        </div>
    </div>
  </div>
  );
}

Settings.layout = (page) => page;
