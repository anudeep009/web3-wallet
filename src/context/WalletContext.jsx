import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [mnemonic, setMnemonic] = useState('');
    const [solanaWallets, setSolanaWallets] = useState([]);
    const [ethWallets, setEthWallets] = useState([]);

    const addSolanaWallet = (wallet) => setSolanaWallets([...solanaWallets, wallet]);
    const addEthWallet = (wallet) => setEthWallets([...ethWallets, wallet]);

    return (
        <WalletContext.Provider value={{ mnemonic, setMnemonic, solanaWallets, ethWallets, addSolanaWallet, addEthWallet }}>
            {children}
        </WalletContext.Provider>
    );
};
