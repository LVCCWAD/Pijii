import {NavbarMinimalColored} from "../layouts/mantine/sidebar.jsx";
import Layout from '../layouts/Layout';
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import ProjectCard from "../layouts/components/Project_Card.jsx";
import PijiCard from "../layouts/components/Task_Card.jsx";

import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers, IconX, IconBell, IconBellFilled} from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';



export default function Dashboard() {
      const { user } = usePage().props;
    
  return (
    <div className="piji-green flex flex-col w-screen h-screen bg-amber-50">

            <div className="flex flex-row w-full h-full">
                <NavbarMinimalColored/>

                {/* Dashboard Content Container */}
                <div className="flex flex-col w-full  h-full ">
                    <PijiHeader/> 
                    <PijiHeader2 title="Dashboard"/>

                    {/* Dashboard Content Container */}
                    <div className="flex flex-row justify-around" style={{padding:"20px"}}>
                        <div>
                            <div style={{ padding:"25px 20px "}} className="bg-white flex flex-row max-w-[720px] h-[280px] rounded-3xl drop-shadow-md " >
                                <div className="flex flex-col gap-7">
                                    <div className="flex flex-col">
                                        <h1 className="text-3xl font-extrabold"> Hi, {user.name}</h1>
                                        <p className="text-2xl font-semibold">
                                            What are we doing <br />
                                            today?
                                        </p>
                                </div>
                                
                                {/* Box 1 */}
                                <div className="flex flex-row">
                                    <div className="grid grid-cols-2 w-[400px] ">
                                        <Link className="flex items-center gap-1" style={{marginTop:"-20px"}} ><IconCalendarPlus size={24} color="royalblue"> </IconCalendarPlus>Check Calendar </Link>
                                        <Link className="flex gap-1" ><IconUsers size={24} color="green"> </IconUsers>Check Collaboration projects</Link>
                                        <Link className="flex items-center gap-1" style={{marginTop:"20px"}} ><IconFlag size={24} color="darkorange"> </IconFlag>Check Urgent Tasks</Link>
                                        <Link className="flex items-center gap-1" style={{marginTop:"20px"}}><IconMessageCircleQuestion size={24}> </IconMessageCircleQuestion>Ask Piji</Link>
                                    </div>                 
                                </div> 
                        </div>    

                        <div style={{margin:"-150px 0 0 0"}}  className="flex object-cover w-[450px] h-[400px] overflow-visible">
                            <img src="/images/PIJI SPRITE1.png" alt="Sprite" className="w-100% h-100% rounded-lg  object-cover overflow-visible scale-x-[-1]"/>
                        </div>
                    </div>

    
                    </div>
                
                    {/* notifcations -  bg-gray-100*/}
                     <div style={{ padding:"20px"}} className=" flex flex-col min-w-[450px] h-[280px] rounded-3xl drop-shadow-md  overflow-hidden" >
                            <Link href="/Notifications">
                                <div class="flex flex-row gap-4">
                                    <div style={{ margin:"6px 0"}}><IconBell size={28} /></div>
                                    <h1 className="text-4xl font-bold"> Notifications</h1>
                                </div>
                            </Link>

                    {/* insert foreach loop -  bg-gray-100*/}

                        {/* notif 1 */}
                        <div style={{ margin: "5px 0", padding: "25px 20px" }}
                        className="bg-blue-300 flex flex-row items-center  w-full h-[60px] rounded-2xl drop-shadow-md justify-between"
                        >
                        Notification 1
                        <Link><IconX/></Link>
                        </div>

                        {/* notif 1 */}
                        <div style={{ margin: "5px 0", padding: "25px 20px" }}
                        className="bg-blue-300 flex flex-row items-center  w-full h-[60px] rounded-2xl drop-shadow-md justify-between"
                        >
                        Notification 2 placeholder
                        <Link><IconX/></Link>
                        </div>

                                                {/* notif 1 */}
                        <div style={{ margin: "5px 0", padding: "25px 20px" }}
                        className="bg-blue-300 flex flex-row items-center  w-full h-[60px] rounded-2xl drop-shadow-md justify-between"
                        >
                        Notification 3 placeholder
                        <Link><IconX/></Link>
                        </div>
                     </div>

                </div>

                {/* dapat may foreach to */}
                <div className="flex flex-row justify-center gap-4" style={{margin:'0 20px'}}>

                
                    <ProjectCard
                    title="PERSONAL TASKS"
                    badgeNumber={1}
                    badgeColor="bg-white"
                    cardBg="piji-orange-1"
                    />

                    <ProjectCard
                    title="SCHOOL TASKS"
                    badgeNumber={2}
                    badgeColor="bg-white"
                    cardBg="piji-cyan-1"
                    />
                    <ProjectCard
                    title="WORK TASKS"
                    badgeNumber={3}
                    badgeColor="bg-white"
                    cardBg="piji-green-1"
                    />
                </div>

                </div>
            </div>
    </div>                   
  );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>










// import React from 'react';
// import { router } from '@inertiajs/react';

// function Dashboard() {
//     function handleLogout(e) {
//         e.preventDefault();
//         router.post('/logout');
//     }

//     return (
//         <div className="flex flex-col items-center justify-center gap-4 p-6">
//             <p className="text-gray-500 italic text-center text-sm">Note: This is just a placeholder.</p>
//             <h1 className="text-2xl font-bold text-center text-purple-700">Welcome to Pijii!</h1>
//             <button
//                 className="bg-amber-500 hover:bg-amber-300 text-white font-semibold py-2 px-4 rounded-md transition"
//                 onClick={handleLogout}
//             >
//                 Log out
//             </button>
//         </div>
//     );
// }

// export default Dashboard;
