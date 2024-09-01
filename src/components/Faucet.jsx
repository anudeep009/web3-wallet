import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import toast, { Toaster } from 'react-hot-toast';
import { ThemeContext } from '../context/ThemeContext';

function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const notify = (amount) =>
    toast.success(`Airdropped ${amount} SOL to ${wallet.publicKey.toBase58()}`);

  const requestAirdrop = async () => {
    const amountElement = document.getElementById('amount');
    const amount = amountElement ? parseFloat(amountElement.value) : 0;

    if (!amount || amount <= 0) {
      toast.error('Enter a valid amount!');
      return;
    }

    setLoading(true);
    try {
      const airdropSignature = await connection.requestAirdrop(
        wallet.publicKey,
        amount * LAMPORTS_PER_SOL
      );

      await connection.confirmTransaction(airdropSignature, 'confirmed');
      notify(amount);
    } catch (error) {
      toast.error(`Failed to request airdrop: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        id="amount"
        type="number"
        min={1}
        step={0.1}
        placeholder="Enter amount"
        className={`w-full px-4 py-2 text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          isDarkMode ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-500'
        }`}
      />
      <button
        onClick={requestAirdrop}
        disabled={loading || !wallet.connected}
        className={`w-full px-4 py-2 font-medium rounded-md shadow-lg transition-all ${
          loading ? 'cursor-not-allowed bg-green-400' : 'bg-green-500 hover:bg-green-600'
        } ${isDarkMode ? 'text-white' : 'text-white'}`}
      >
        {loading ? 'Processing...' : 'Request Airdrop'}
      </button>
    </div>
  );
}

export default function Faucet() {
  const wallets = [new PhantomWalletAdapter()];
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/SYT-X7hNux9uiFFWNfTB1EWk67fxmJTD">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative flex flex-col items-center justify-center min-h-screen p-8 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
            }`}
          >
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
              <WalletMultiButton className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all" />
              <WalletDisconnectButton className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all" />
            </div>
            <div className={`w-full max-w-md p-6 rounded-xl shadow-xl border flex flex-col items-center space-y-6 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Solana Faucet</h1>
              <RequestAirdrop />
            </div>
          </motion.div>
          <Toaster />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
