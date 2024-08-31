import { useState, useContext } from 'react';
import { Wallet as WalletIcon, Menu, X } from 'lucide-react';
import Wallet from './Wallet';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`bg-background shadow-sm ${isDarkMode ? 'dark:bg-gray-900' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <WalletIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">CryptoVault</span>
            </a>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 ml-6">
              {['Wallet', 'Faucet', 'Transcations', 'Settings'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect Wallet Button for Desktop */}
          <div className="hidden md:flex items-center">
            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Connect Wallet
            </button> */}
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full border border-gray-300 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-lg cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-500" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-muted-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
          <nav className="px-2 pt-2 pb-3 space-y-1">
            {['Dashboard', 'Transactions', 'Assets', 'Settings'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Connect Wallet Button and Theme Toggle for Mobile */}
          <div className="pt-4 pb-3 border-t border-muted px-2 space-y-3">
            {/* <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Connect Wallet
            </button> */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full ml-24 border border-gray-300 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-lg"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-500" />}
            </button>

            {/* Wallet Component Display */}
            {/* <div className="flex-grow overflow-y-auto p-4">
              <Wallet />
            </div> */}
          </div>
        </div>
      )}
    </header>
  );
}
