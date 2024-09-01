import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WalletProvider } from './context/WalletContext';
import { ThemeProvider } from './context/ThemeContext';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './styles/light-theme.css';
import './styles/dark-theme.css';
import { Wallet, Home, Faucet, Transactions, Settings } from './exports';
import Layout from './Layout.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="wallet" element={<Wallet />} />
      <Route path="faucet" element={<Faucet />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  )
);

root.render(
  <ThemeProvider>
    <WalletProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </WalletProvider>
  </ThemeProvider>
);
