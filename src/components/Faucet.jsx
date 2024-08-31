import React from 'react';
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

export default function Faucet() {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/SYT-X7hNux9uiFFWNfTB1EWk67fxmJTD">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Container with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"
          >
            {/* Wallet Buttons Group - Positioned on the top right corner */}
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
              <WalletMultiButton className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all" />
              {/* <WalletDisconnectButton className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all" /> */}
            </div>

            {/* Main Card Container */}
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col items-center space-y-6">
              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-800">
                Solana Faucet
              </h1>

              {/* Input Field for Amount */}
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              {/* Request Airdrop Button */}
              <button className="w-full px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow-lg hover:bg-green-600 transition-all">
                Request Airdrop
              </button>
            </div>
          </motion.div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
