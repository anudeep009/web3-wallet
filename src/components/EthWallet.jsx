import React, { useState, useContext } from 'react';
import { mnemonicToSeed } from 'bip39';
import { Wallet, HDNodeWallet, ethers } from 'ethers';
import { WalletContext } from '../context/WalletContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const EthWallet = ({ mnemonic }) => {
  const { ethWallets, addEthWallet } = useContext(WalletContext);
  const [currentIndex, setCurrentIndex] = useState(ethWallets.length);
  const [showPrivateKeys, setShowPrivateKeys] = useState(Array(ethWallets.length).fill(false));

  const fetchEthBalance = async (address) => {
    try {
      const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/6bd848e7272f4152a15b3af991369616');
      const balance = await provider.getBalance(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Error fetching Ethereum balance:', error.message);
      return '0';
    }
  };

  const handleAddWallet = async () => {
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const hdNode = HDNodeWallet.fromSeed(seed);
      const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
      const childNode = hdNode.derivePath(derivationPath);
      const wallet = new Wallet(childNode.privateKey);

      const balance = await fetchEthBalance(wallet.address);

      const newWallet = { address: wallet.address, privateKey: wallet.privateKey, balance };
      addEthWallet(newWallet);
      setCurrentIndex(currentIndex + 1);
      setShowPrivateKeys([...showPrivateKeys, false]);
    } catch (error) {
      console.error('Error deriving Ethereum wallet:', error.message);
    }
  };

  const handleTogglePrivateKey = (index) => {
    const updatedShowPrivateKeys = [...showPrivateKeys];
    updatedShowPrivateKeys[index] = !updatedShowPrivateKeys[index];
    setShowPrivateKeys(updatedShowPrivateKeys);
  };

  return (
    <div className="p-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddWallet}
        className="bg-purple-500 text-white dark:bg-purple-400 dark:hover:bg-purple-300 p-2 rounded hover:bg-purple-600 transition-colors duration-300 shadow-lg"
      >
        Add ETH Wallet
      </motion.button>
      {ethWallets.map((w, index) => (
        <motion.div
          key={index}
          className="mt-4 p-4 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <h2 className="text-lg font-bold text-purple-600 dark:text-purple-400">Ethereum Wallet {index + 1}</h2>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Address:</strong> <span className="break-all">{w.address}</span>
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Private Key:</strong>
            <span className="break-all">
              {showPrivateKeys[index] ? w.privateKey : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
            </span>
            <button
              onClick={() => handleTogglePrivateKey(index)}
              className="ml-2 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {showPrivateKeys[index] ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </p>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Balance:</strong> {w.balance} ETH
          </p>
        </motion.div>
      ))}
    </div>
  );
};
