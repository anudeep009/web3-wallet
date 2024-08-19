import React, { useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import { Wallet, HDNodeWallet } from 'ethers';

export const EthWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    const handleAddWallet = async () => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const hdNode = HDNodeWallet.fromSeed(seed);
            const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
            const childNode = hdNode.derivePath(derivationPath);
            const wallet = new Wallet(childNode.privateKey);

            setWallets([...wallets, { address: wallet.address, privateKey: wallet.privateKey }]);
            setCurrentIndex(currentIndex + 1);
        } catch (error) {
            console.error('Error deriving Ethereum wallet:', error.message);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={handleAddWallet}
                className="bg-purple-500 text-white dark:bg-purple-400 dark:hover:bg-purple-300 p-2 rounded hover:bg-purple-600"
            >
                Add ETH Wallet
            </button>
            {wallets.map((w, index) => (
                <div key={index} className="mt-4 p-4 border rounded bg-white dark:bg-gray-700 overflow-auto max-w-full">
                    <h2 className="text-lg font-bold text-purple-600 dark:text-purple-400">Ethereum Wallet {index + 1}</h2>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Address:</strong> <span className="break-all">{w.address}</span></p>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Private Key:</strong> <span className="break-all">{w.privateKey}</span></p>
                </div>
            ))}
        </div>
    );
};
