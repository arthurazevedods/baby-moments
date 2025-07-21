import React from 'react';
import { useThemeStore } from '../store/theme';

const Switch: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div>
      <label className="relative inline-block w-14 h-8">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={theme === 'cupcake'}
          onChange={toggleTheme}
        />
        <span data-theme={theme} className={`absolute bg-secondary cursor-pointer top-0 left-0 right-0 bottom-0 transition duration-400 rounded-xl `}>
          <span
            className={`absolute h-5 w-5 bottom-1.5 left-1.5 rounded-lg bg-white transition duration-400 transform ${
              theme === 'cupcake' ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
      </label>
    </div>
  );
};

export default Switch;