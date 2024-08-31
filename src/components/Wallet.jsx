import React, { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';
import { generateMnemonic } from 'bip39';
import { Buffer } from 'buffer';
import { FaCopy } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

window.Buffer = window.Buffer || Buffer;

function Wallet() {
  const { mnemonic, setMnemonic } = useContext(WalletContext);

  const notify = () => toast('Mnemonic copied to clipboard!');

  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic);
    notify();
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 rounded-lg shadow-lg w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster />
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 flex flex-col gap-6">
        <motion.div
          className="flex items-center justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Web3 Wallet
          </h1>
        </motion.div>

        <motion.button
          onClick={async () => {
            const mn = await generateMnemonic();
            setMnemonic(mn);
          }}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-3 rounded shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Seed Phrase
        </motion.button>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Wallet Mnemonics
            </h2>
            <button
              onClick={handleCopyMnemonic}
              className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <FaCopy size={20} />
            </button>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 overflow-x-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono text-gray-800 dark:text-gray-200">
              {mnemonic.split(' ').map((word, index) => (
                <motion.li
                  key={index}
                  className="break-all p-1 rounded bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-700"
                  whileHover={{ scale: 1.05 }}
                >
                  {word}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SolanaWallet mnemonic={mnemonic} />
          <EthWallet mnemonic={mnemonic} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Wallet;
