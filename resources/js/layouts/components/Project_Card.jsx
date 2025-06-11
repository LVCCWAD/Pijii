import { IconDotsVertical, IconPlus, IconDotsCircleHorizontal } from '@tabler/icons-react';
import PriorityToggleButton from './PriorityToggleButton';

import { Link } from '@inertiajs/react';
import { useUser } from '../../Pages/UserContext.jsx';

export default function ProjectCard({
  title = "Personal Task",
  badgeNumber = 1,
  badgeColor = "bg-amber-50",
  cardBg = "bg-red-100",
}) {
  return (
<div className={`project-card ${cardBg} rounded-2xl drop-shadow-md `}>
      {/* Top Status Section */}
      <div className='flex flex-col'>
        <div className="flex flex-row gap-1 justify-between" style={{ padding: '15px 10px' }}>
          <div className="flex flex-row gap-1" id='left'>
            <div className={`flex ${badgeColor} w-8 h-8 rounded-full items-center justify-center`} style={{ margin: '-3px 0' }}>
              <h1 className='font-semibold'>{badgeNumber}</h1>
            </div>

          {/* Currently only directs to the same category, with no */}
            <Link href="/Category"> 
                <h1 className='font-bold text-xl'>{title}</h1>
            </Link>  
          </div>

          <div className='flex flex-row gap-2' id='right'>
            <IconPlus />
            <IconDotsVertical />
          </div>
        </div>

        {/* Task Preview */}

        <div className='inner-project-card' style={{ padding: '15px' }}>
          

            <div className='flex flex-row justify-between'>
              <h1 className='font-lightbold text-xl'>{title}</h1>
              <IconDotsCircleHorizontal />
            </div>
            


          <div className='flex flex-row justify-between'>
            <p className='text-sm'>Today 11:50 PM</p>
            <PriorityToggleButton />
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <div className='flex flex-row border justify-center rounded-xl' style={{ padding: '5px 0', margin: '10px' }}>
        <IconPlus />
        <button className='font-semibold'>
          <h1>Add New Task</h1>
        </button>
      </div>
    </div>
  );
}







// import { IconDotsVertical, IconPlus, IconDotsCircleHorizontal } from '@tabler/icons-react';
// import './Card_Template.css';
// import PriorityToggleButton from './PriorityToggleButton';

// export default function ProjectCard() {


  
//   return (
//     <div className="project-card">
//       {/* Top Status Section */}
//       <div className='flex flex-col'>
//         <div className="flex flex-row gap-1 justify-between" style={{padding:'15px 10px'}}>

//           <div className="flex flex-row gap-1" id='left'>
//             <div className='flex bg-amber-50 w-8 h-8 rounded-full items-center justify-center'
//             style={{margin:'-3px 0'}}>  
//               <h1 className='font-semibold' >1</h1>
//             </div>
//             <h1 className='font-bold text-xl'>Personal Task</h1>
//           </div>

//           <div className='flex flex-row gap-2' id='right'>
//           <IconPlus/>
//           <IconDotsVertical/>
//           </div>
//         </div>
 
//            {/* foreach */}
           
//           <div className='inner-project-card ' style={{padding:'15px'}}>
            
//             <div className='flex flex-row justify-between' >
//                 <h1 className='font-lightbold text-xl'>Personal Task</h1>
//                 <IconDotsCircleHorizontal/>
//             </div>

//               <div className='flex flex-row justify-between'>
//                   <p className='text-sm'>Today 11:50 PM</p>
//                   <PriorityToggleButton/>
//               </div>
//           </div>
    
//       </div>
//         <div className='flex flex-row border justify-center rounded-xl ' style={{padding:'5px 0', margin:'10px'}}>
//           <IconPlus/>

//          <button className='font-semibold'> <h1>Add New Task </h1></button>
//         </div>
//     </div>
//   );
// }
