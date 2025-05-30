import { useState } from 'react';

export default function PriorityToggleButton() {
  const priorities = [
    { label: 'High', color: 'bg-red-500' },
    { label: 'Medium', color: 'bg-orange-400' },
    { label: 'Low', color: 'bg-yellow-300 text-black' }, // black text for contrast
  ];

  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % priorities.length);
  };

  return (
    <button
      onClick={handleClick}
      style={{padding:'0.5rem 1rem'}}
      className={`px-4 py-2 rounded-full text-white font-semibold transition-all duration-200 ${priorities[index].color}`}
    >
      {priorities[index].label}
    </button>
  );
}
