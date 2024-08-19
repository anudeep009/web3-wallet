import React, { useContext } from 'react';
import Wallet from './components/Wallet';
import { ThemeContext } from './context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './index.css'; 

function App() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`flex flex-col items-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
            <button
                onClick={toggleTheme}
                className="mt-4 mb-4 p-2 rounded-full border border-gray-300 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-lg cursor-pointer"
            >
                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-500" />}
            </button>
            <div className="flex-grow overflow-y-auto p-4">
                <Wallet />
            </div>
        </div>
    );
}

export default App;
