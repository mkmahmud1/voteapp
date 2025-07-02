'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const init = async () => {
      const prov = new ethers.BrowserProvider(window.ethereum);
      setProvider(prov);
      const accounts = await prov.send('eth_accounts', []);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        setSigner(await prov.getSigner());
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('MetaMask not installed');
    try {
      const prov = new ethers.BrowserProvider(window.ethereum);
      const accounts = await prov.send('eth_requestAccounts', []);
      setProvider(prov);
      setAccount(accounts[0]);
      setIsConnected(true);
      setSigner(await prov.getSigner());
    } catch (err) {
      console.error('Wallet connect failed', err);
    }
  };

  return (
    <Web3Context.Provider value={{ provider, signer, account, isConnected, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
