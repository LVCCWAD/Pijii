import {NavbarMinimalColored_settings} from "../../layouts/mantine/sidebar_settings.jsx";
import Layout from '../../layouts/Layout';
import PijiHeader from "../../layouts/components/Header.jsx";

import ProjectCard from "../../layouts/components/Project_Card.jsx";
import PijiCard from "../../layouts/components/Task_Card.jsx";
import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';




export default function GeneralSettings() {
  return (
    <div class="main-bg">
    <div className="flex flex-row w-full">
      <NavbarMinimalColored_settings/>

        <div class="flex flex-col w-full" >
            <PijiHeader showBackButton={true}/> 
            <div className="" style={{padding:'10px'}}>
                <h1 className="text-4xl font-bold">General</h1> 
            </div>
    


        </div>
    </div>
  </div>
  );
}

GeneralSettings.layout = (page) => page;
