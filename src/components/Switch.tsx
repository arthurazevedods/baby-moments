import React, { useState } from 'react';

const Switch: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label className="relative inline-block w-14 h-8">
        <input 
          type="checkbox" 
          className="opacity-0 w-0 h-0" 
          checked={isChecked}
          onChange={handleToggle}
        />
        
        <span data-theme={`${isChecked ? "cupcake": "bumblebee"}`} className={`absolute bg-primary cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-400 rounded-xl }`}>
          <span data-theme="bumblebee" className={`absolute h-5 w-5 bottom-1.5 left-1.5 rounded-lg bg-white transition duration-400 transform ${
            isChecked ? 'translate-x-6' : ''
          }`}></span>
        </span>
      </label>
    </div>
  );
};

export default Switch;