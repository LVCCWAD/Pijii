import {NavbarMinimalColored} from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import PijiCard from "../layouts/components/Task_Card.jsx";
import {IconCalendarPlus, IconFlag, IconMessageCircleQuestion, IconUsers} from '@tabler/icons-react';
import { Link } from '@inertiajs/react';


export default function Dashboard({name}) {
  return (
    <div className="piji-green">
            <div className="flex flex-row w-full">
                <NavbarMinimalColored/>

                <div className="flex flex-col w-full" >
                    <PijiHeader/> 
                    <PijiHeader2 title="Dashboard"/>

                    <div>
                        <div style={{margin:"10px", padding:"30px 20px "}} className="bg-white flex flex-row w-[720px] h-[280px] rounded-3xl drop-shadow-md " >
                        <div className="flex flex-col gap-7">
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-extrabold"> Hi, {name}</h1>
                            <p className="text-2xl font-semibold">
                                What are we doing <br />
                                today?
                            </p>
                        </div>

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

                                <PijiCard/>

                </div>
            </div>
        </div>
    </div>                   
  );
}

Dashboard.layout = (page) => page;










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
