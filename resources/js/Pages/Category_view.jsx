import {NavbarMinimalColored} from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers, IconEdit} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';




export default function Category() {
  return (
    <div class="piji-green">
    <div className="flex flex-row w-full">
      <NavbarMinimalColored/>

        <div class="flex flex-col w-full" >
            <PijiHeader/> 
            <PijiHeader2 title="Category"/>

    


        <div class="" style={{padding:'15px'}}>
        <h1 className="text-3xl font-bold">Category Name</h1> 
                    <IconPlus />
        
        <h1>lagyan ko dine ng edit category</h1>
        <h1>setting for collaborations</h1>
          <div class="grid grid-cols-4 gap-2 p-4" style={{padding:'10px'}}>
              <div class="bg-gray-100 rounded-lg shadow h-full" style={{padding:'10px'}}>
                <h2 class="font-semibold text-lg mb-2 text-center">To-do</h2>

                  {/* for each project */}

                  <Link href="/Project">
                                  <div>for each loop</div>
                  </Link>


              </div>

              <div class="bg-yellow-100 rounded-lg shadow" style={{padding:'10px'}}>
                <h2 class="font-semibold text-lg mb-2 text-center">In Progress</h2>
                                for each loop

              </div>

              <div class="bg-green-100 rounded-lg shadow" style={{padding:'10px'}}>
                <h2 class="font-semibold text-lg mb-2 text-center">Completed</h2>
                                for each loop

              </div>

              <div class="bg-red-100 rounded-lg shadow" style={{padding:'10px'}}>
                <h2 class="font-semibold text-lg mb-2 text-center">On-hold</h2>
                                for each loop

              </div>
        </div>


        </div>

        </div>
    </div>
  </div>
  );
}

Category.layout = (page) => page;
