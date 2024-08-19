import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39'; // Synchronous version for simplicity
import { derivePath } from 'ed25519-hd-key'; // For deriving a unique path

export const SolanaWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    const handleAddWallet = () => {
        try {
            const seed = mnemonicToSeedSync(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString('hex')).key;
            const keypair = Keypair.fromSeed(derivedSeed);
            const newPublicKey = keypair.publicKey.toBase58();
            const newPrivateKey = Buffer.from(keypair.secretKey).toString('hex');

            setWallets([...wallets, { publicKey: newPublicKey, privateKey: newPrivateKey }]);
            setCurrentIndex(currentIndex + 1);
        } catch (error) {
            console.error('Error deriving Solana wallet:', error.message);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={handleAddWallet}
                className="bg-green-500 text-white dark:bg-green-400 dark:hover:bg-green-300 p-2 rounded hover:bg-green-600"
            >
                Add Solana Wallet
            </button>
            {wallets.map((w, index) => (
                <div key={index} className="mt-4 p-4 border rounded bg-white dark:bg-gray-700 overflow-auto max-w-full">
                    <h2 className="text-lg font-bold text-green-600 dark:text-green-400">Solana Wallet {index + 1}</h2>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Public Key:</strong> <span className="break-all">{w.publicKey}</span></p>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Private Key:</strong> <span className="break-all">{w.privateKey}</span></p>
                </div>
            ))}
        </div>
    );
};
