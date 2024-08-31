import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

export default function Faucet() {
  const { isDarkMode } = useContext(ThemeContext);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [address, setAddress] = useState('');

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    // Call toast or any other notification system
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
    setAddress('');
    // Call toast or any other notification system
  };

  const handleRequestAirdrop = () => {
    if (!address) {
      // Call toast or any other notification system
      return;
    }
    // Call toast or any other notification system
  };

  return (
    <div className={`mt-20 w-full max-w-md mx-auto p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="mb-4">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CryptoVault Faucet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Request test tokens for the CryptoVault network
        </motion.p>
      </div>
      <div className="space-y-4">
        <AnimatePresence>
          {!isWalletConnected ? (
            <motion.button
              key="connect"
              onClick={handleConnectWallet}
              className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              Connect Wallet
            </motion.button>
          ) : (
            <motion.button
              key="disconnect"
              onClick={handleDisconnectWallet}
              className="w-full py-2 px-4 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              Disconnect Wallet
            </motion.button>
          )}
        </AnimatePresence>
        <motion.input
          type="text"
          placeholder="Enter your wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isWalletConnected}
          className={`w-full p-2 border rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-200 text-black border-gray-300'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="mt-4">
        {!isWalletConnected && (
          <motion.button
            onClick={handleRequestAirdrop}
            className="w-full py-2 px-4 rounded-lg bg-green-500 text-white hover:bg-green-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Request Airdrop
          </motion.button>
        )}
      </div>
    </div>
  );
}
