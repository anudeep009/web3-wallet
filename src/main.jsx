import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WalletProvider } from './context/WalletContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/light-theme.css';
import './styles/dark-theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThemeProvider>
        <WalletProvider>
            <App />
        </WalletProvider>
    </ThemeProvider>
);
