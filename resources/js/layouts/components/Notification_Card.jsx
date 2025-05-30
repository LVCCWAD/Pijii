import { useState } from 'react';
import { IconX } from '@tabler/icons-react';

export default function NotificationCard() {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="notifications bg-blue-300 flex items-center justify-between w-full h-[60px] px-4 rounded-2xl drop-shadow-md">
          <span>Notification</span>
          <button onClick={handleClose}>
            <IconX className="text-gray-800 hover:text-red-500 cursor-pointer" />
          </button>
        </div>
      )}
    </>
  );
}
