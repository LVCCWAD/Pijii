import {NavbarMinimalColored} from "../../layouts/mantine/sidebar.jsx";
import PijiHeader from "../../layouts/components/Header.jsx";
import PijiHeader2 from "../../layouts/components/Header2.jsx";
import PijiCard from "../../layouts/components/Task_Card.jsx";

// import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';



export default function AllTasks() {
  return (
    <div class="piji-green">
    <div className="flex flex-row w-full">
      <NavbarMinimalColored/>

        <div class="flex flex-col w-full" >
            <PijiHeader/> 
            <PijiHeader2 title="All Projects"/>

    
                <PijiCard/>

        </div>
    </div>
  </div>
  );
}

AllTasks.layout = (page) => page;
