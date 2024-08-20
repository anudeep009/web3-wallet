import React, { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';
import { generateMnemonic } from 'bip39';
import { Buffer } from 'buffer';
import { FaCopy } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

window.Buffer = window.Buffer || Buffer;

function Wallet() {
    const { mnemonic, setMnemonic } = useContext(WalletContext);

    const notify = () => toast('Mnemonic copied to clipboard!');

    const handleCopyMnemonic = () => {
        navigator.clipboard.writeText(mnemonic);
        notify();
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 w-full max-w-3xl mx-auto flex flex-col gap-6">
            <Toaster />
            <div className="flex items-center justify-center">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-300">Web3 Wallet</h1>
            </div>

            <button
                onClick={async () => {
                    const mn = await generateMnemonic();
                    setMnemonic(mn);
                }}
                className="bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-400 p-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
                Create Seed Phrase
            </button>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg border p-4 w-full">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Wallet Mnemonics</h2>
                    <button
                        onClick={handleCopyMnemonic}
                        className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                        <FaCopy size={20} />
                    </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-600 rounded-md p-4">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono text-gray-800 dark:text-gray-200">
                        {mnemonic.split(' ').map((word, index) => (
                            <li key={index} className="break-all">{word}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <SolanaWallet mnemonic={mnemonic} />
                <EthWallet mnemonic={mnemonic} />
            </div>
        </div>
    );
}

export default Wallet;
