import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WalletProvider } from './context/WalletContext';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './styles/dark-theme.css';
import { Wallet, Home, Faucet, } from './exports';
import Layout from './Layout.jsx';
import Swap from './components/swap/Swap.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="wallet" element={<Wallet />} />
      <Route path="faucet" element={<Faucet />} />
      <Route path="swap" element={<Swap />} />
    </Route>
  )
);

root.render(
    <WalletProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </WalletProvider>
);
