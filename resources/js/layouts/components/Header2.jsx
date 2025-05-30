import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import DashboardCreator from '../../Pages/Create_Options';

export default function PijiHeader2({ title = "Title" }) {
    const [opened, setOpened] = useState(false);
  
  return (
    <div className="flex justify-between items-center piji-green-2" style={{ padding: "10px 20px" }}>
      <h1 className="text-5xl font-bold">{title}</h1>
    
    {/* <Link
      href="/Create/Options"
      className="flex text-xl bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-105 hover:text-amber-600"
      style={{ padding: "10px 35px" }}
    >
      Create +
    </Link> */}

    
          <a onClick={() => setOpened(true)}  className="flex text-xl bg-amber-50 rounded-xl drop-shadow-md transition-all duration-200 hover:bg-amber-100 hover:scale-105 hover:text-amber-600"
      style={{ padding: "10px 35px" }}>
            Create +
          </a>

     <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <div className=" text-2xl font-semibold">
            Create New
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
            backgroundColor: "#fff5e1"
          },

        content: {
            width: '90%',
            maxWidth: '90%',
            height: '80%',
            maxHeight: '80%',
            backgroundColor: '#fce4b3',
        }}}
      >
        {/* Modal content goes here */}
        
        <DashboardCreator/>
      </Modal>


    </div>
  );
}
