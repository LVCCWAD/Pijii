import {NavbarMinimalColored} from "../../layouts/mantine/sidebar.jsx";
import PijiHeader from "../../layouts/components/Header.jsx";
import PijiHeader2 from "../../layouts/components/Header2.jsx";
import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';



export default function Edit_Category() {
  return (
    <div class="piji-green">
    <div className="flex flex-row w-full">
      <NavbarMinimalColored/>

        <div class="flex flex-col w-full" >
            <PijiHeader/> 
            <PijiHeader2 title=" Edit_Category"/>

                {/* might as well gawing component na tong part */}
    

        <h1>Login</h1>

        </div>
    </div>
  </div>
  );
}

Edit_Category.layout = (page) => page;
