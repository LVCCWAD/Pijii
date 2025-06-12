import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import DashboardCreator from '../../Pages/Create_Options';
import { useUser } from '../../Pages/UserContext.jsx';
import CreateProjectForm from '../../Pages/Create/Project.jsx';

export default function PijiHeader2({ title = "Title" }) {
    const [opened, setOpened] = useState(false);
    const { user } = useUser();
    
  return (
    <div className="flex justify-between items-center piji-green-2 shadow-xl" style={{ padding: "0 20px 5px 20px" }}>
      <h1 className="text-5xl font-bold">{title}</h1>
    
    {/* <Link
      href="/Create/Options"
      className="flex text-xl bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-105 hover:text-amber-600"
      style={{ padding: "10px 35px" }}
    >
      Create +
    </Link> */}

    
        {/* <a
          onClick={() => setOpened(true)}
          className="flex text-xl bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-105 hover:text-amber-600 active:scale-95 active:bg-amber-200"
          style={{ padding: "10px 35px" }}
        >
          Create +
        </a>

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
      </Modal> */}


    </div>
  );
}
