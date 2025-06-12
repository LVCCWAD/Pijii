import {NavbarMinimalColored} from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import {IconPencil, IconChevronCompactRight, IconUsers, IconPlus, IconEdit} from '@tabler/icons-react'
import { Link } from '@inertiajs/react';

import { Modal, Button } from '@mantine/core';
import { useState } from 'react';
import CreateProjectForm from '../Pages/Create/Project.jsx';


export default function Category() {
      const [opened, setOpened] = useState(false);
  
  return (
    <div class="piji-green">
    <div className="flex flex-row w-full">
      <NavbarMinimalColored/>

        <div class="flex flex-col w-full" >
            <PijiHeader/> 
            <PijiHeader2 title="Project"/>

                {/* might as well gawing component na tong part */}
    


        <div class="" style={{padding:'15px'}}>

        {/* Category Header ==================================================================== */}
        <div className="flex items-center justify-between">
        <div className="flex gap-1">
        <h1 className="text-3xl font-bold"> <Link href="/Category">Category Name</Link></h1> 
        <IconChevronCompactRight size={"29"}  style={{margin:'5px 0'}}/>  
        <h1 className="text-3xl font-bold"> Project Name</h1> 
           <Link href="/category edit"><IconEdit style={{margin:'5px 0'}} /></Link> 
          </div>

          <div className="flex gap-2">
            <a onClick={() => setOpened(true)}
              className="flex w-[140px] h-[50px] justify-center items-center text-xl
              bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 
              hover:bg-amber-100 hover:scale-105 hover:text-amber-600 
              active:scale-95 active:bg-amber-200 cursor-pointer">
                Create +
            </a>

            <a onClick={() => setOpened(true)}
              className="flex w-[180px] h-[50px] justify-center items-center text-xl
              bg-blue-50 rounded-xl drop-shadow-md transition-all duration-200 
              hover:bg-blue-100 hover:scale-105 hover:text-blue-600 
              active:scale-95 active:bg-blue-200 cursor-pointer">
                <IconUsers/> Collaborators
            </a>

          </div>
          </div>  

          <div class="grid grid-cols-4 gap-2 p-4" style={{padding:'10px'}}> 

              <div class="bg-gray-100 rounded-lg shadow overflow-auto" >
                
                <div class="justify-between flex flex-row bg-gray-200 " style={{padding:'10px'}} >
                    <h2 class="font-semibold text-2xl mb-2 text-center">To-do</h2>                   
                    <a href="#" onClick={() => setOpened(true)} style={{margin:'5px 0'}}><IconPlus /></a>   
                </div>
              
                  <Modal 
                      opened={opened}
                      onClose={() => setOpened(false)}
                      title={
                        <div className=" text-2xl font-semibold">
                          Create New Project
                        </div>}
                      centered
                      size="auto"
                      overlayProps={{
                        backgroundOpacity: 0.40,
                        blur: 1,
                      }}

                      styles={{
              
                        header:{
                              position: 'relative',
                          justifyContent: 'center',
                          backgroundColor: "#fce4b3"
                        },

                      content: {
                          width: '100%',
                          maxWidth: '100%',
                          height: '100%',
                          maxHeight: '100%',
                          backgroundColor: '#fff5e1',
                      }}}
                    >        
                     <CreateProjectForm/>
                  </Modal>


                  {/* project container */}
                <div class="flex flex-col gap-1" style={{padding:'10px'}}>

                                    {/* for each loop - project */}

                  <Link href="/Project">
                  <div className="group flex w-full h-[40px] items-center text-l justify-between
                                bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 
                                group-hover:bg-amber-100 hover:scale-105 hover:text-blue-600 
                                active:scale-95 active:bg-amber-200 " style={{padding:'10px'}} >
                    <p>project item 1 </p>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 "><IconPencil/></div>
                  </div>
                  </Link>

    
                </div>


              </div>

              <div class="bg-yellow-100 rounded-lg shadow overflow-auto" >
             
                <div class="justify-between flex flex-row bg-amber-200 " style={{padding:'10px'}} >
                    <h2 class="font-semibold text-2xl mb-2 text-center">In Progress</h2>                   
                    <a href="#" onClick={() => setOpened(true)} style={{margin:'5px 0'}}><IconPlus /></a>   
                </div>
             

                  {/* project container */}
                <div class="flex flex-col gap-1" style={{padding:'10px'}}>

                                    {/* for each loop - project */}

                  <Link href="/Project">
                  <div className="group flex w-full h-[40px] items-center text-l justify-between
                                bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 
                                group-hover:bg-amber-100 hover:scale-105 hover:text-blue-600 
                                active:scale-95 active:bg-amber-200 " style={{padding:'10px'}} >
                    <p>project item 1 </p>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 "><IconPencil/></div>
                  </div>
                  </Link>

    
                </div>

              </div>

              <div class="bg-green-100 rounded-lg shadow overflow-auto" >

                <div class="justify-between flex flex-row bg-green-200 " style={{padding:'10px'}} >
                    <h2 class="font-semibold text-2xl mb-2 text-center">Completed</h2>                   
                    <a href="#" onClick={() => setOpened(true)} style={{margin:'5px 0'}}><IconPlus /></a>   
                </div>
                
                             {/* project container */}
                <div class="flex flex-col gap-1" style={{padding:'10px'}}>

                                    {/* for each loop - project */}

                  <Link href="/Project">
                  <div className="group flex w-full h-[40px] items-center text-l justify-between
                                bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 
                                group-hover:bg-amber-100 hover:scale-105 hover:text-blue-600 
                                active:scale-95 active:bg-amber-200 " style={{padding:'10px'}} >
                    <p>project item 1 </p>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 "><IconPencil/></div>
                  </div>
                  </Link>

    
                </div>

              </div>

              <div class="bg-red-100 rounded-lg shadow overflow-auto ">

                <div class="justify-between flex flex-row bg-red-200 " style={{padding:'10px'}} >
                    <h2 class="font-semibold text-2xl mb-2 text-center">On-hold</h2>                   
                    <a href="#" onClick={() => setOpened(true)} style={{margin:'5px 0'}}><IconPlus /></a>   
                </div>

                  {/* project container */}
                <div class="flex flex-col gap-1" style={{padding:'10px'}}>

                                    {/* for each loop - project */}

                  <Link href="/Project">
                  <div className="group flex w-full h-[40px] items-center text-l justify-between
                                bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 
                                group-hover:bg-amber-100 hover:scale-105 hover:text-blue-600 
                                active:scale-95 active:bg-amber-200 " style={{padding:'10px'}} >
                    <p>project item 1 </p>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 "><IconPencil/></div>
                  </div>
                  </Link>
                  <Link href="/Project">
                  <div className="group flex w-full h-[40px] items-center text-l justify-between
                                bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 
                                group-hover:bg-amber-100 hover:scale-105 hover:text-blue-600 
                                active:scale-95 active:bg-amber-200 " style={{padding:'10px'}} >
                    <p>project item 1 </p>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 "><IconPencil/></div>
                  </div>
                  </Link>
    
                </div>
              </div>
          </div>
   


        </div>

        </div>
    </div>


                {/* All Modal Code goes here*/}

                  <Modal 
                      opened={opened}
                      onClose={() => setOpened(false)}
                      title={
                        <div className=" text-2xl font-semibold">
                          Create New Project
                        </div>}
                      centered
                      size="auto"
                      overlayProps={{
                        backgroundOpacity: 0.40,
                        blur: 1,
                      }}

                      styles={{
              
                        header:{
                              position: 'relative',
                          justifyContent: 'center',
                          backgroundColor: "#fce4b3"
                        },

                      content: {
                          width: '100%',
                          maxWidth: '100%',
                          height: '100%',
                          maxHeight: '100%',
                          backgroundColor: '#fff5e1',
                      }}}
                    >
        Modal content goes here
        
        <CreateProjectForm/>
                  </Modal>





  </div>
  );
}

Category.layout = (page) => page;
