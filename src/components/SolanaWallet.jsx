import React, { useState } from 'react';
import { Keypair, Connection, PublicKey } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const SolanaWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [showPrivateKeys, setShowPrivateKeys] = useState([]);

  const fetchSolBalance = async (publicKey) => {
    const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/t9XjJfRs6tGhrSCQLIG7qIZ4bcOeoMOn', 'confirmed');
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance / 1e9;
  };

  const handleAddWallet = async () => {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString('hex')).key;
      const keypair = Keypair.fromSeed(derivedSeed);
      const newPublicKey = keypair.publicKey.toBase58();
      const newPrivateKey = Buffer.from(keypair.secretKey).toString('hex');

      const balance = await fetchSolBalance(newPublicKey);

      setWallets([...wallets, { publicKey: newPublicKey, privateKey: newPrivateKey, balance }]);
      setShowPrivateKeys([...showPrivateKeys, false]);
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error('Error deriving Solana wallet:', error.message);
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
        className="bg-green-500 text-white dark:bg-green-400 dark:hover:bg-green-300 p-2 rounded hover:bg-green-600 transition-colors duration-300 shadow-lg"
      >
        Add Solana Wallet
      </motion.button>
      {wallets.map((w, index) => (
        <motion.div
          key={index}
          className="mt-4 p-4 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <h2 className="text-lg font-bold text-green-600 dark:text-green-400">Solana Wallet {index + 1}</h2>
          <p className="text-gray-800 dark:text-gray-200">
            <strong>Public Key:</strong> <span className="break-all">{w.publicKey}</span>
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
            <strong>Balance:</strong> {w.balance} SOL
          </p>
        </motion.div>
      ))}
    </div>
  );
};
