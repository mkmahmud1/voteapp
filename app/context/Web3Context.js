"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const fetchBalanceAndSymbol = async (prov, address) => {
    try {
      const rawBalance = await prov.getBalance(address);
      const formattedBalance = ethers.formatEther(rawBalance);
      setBalance(formattedBalance);

      const network = await prov.getNetwork();
      let tokenSymbol = "ETH";
      if (network.name.toLowerCase().includes("polygon")) tokenSymbol = "MATIC";
      else if (network.name.toLowerCase().includes("bnb")) tokenSymbol = "BNB";
      else if (network.name.toLowerCase().includes("avalanche"))
        tokenSymbol = "AVAX";
      else if (network.nativeCurrency?.symbol)
        tokenSymbol = network.nativeCurrency.symbol;

      setSymbol(tokenSymbol);
    } catch (err) {
      console.error("Failed to fetch balance/symbol:", err);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const init = async () => {
      try {
        const prov = new ethers.BrowserProvider(window.ethereum);
        setProvider(prov);

        const accounts = await prov.send("eth_accounts", []);
        if (accounts.length > 0) {
          const acc = accounts[0];
          setAccount(acc);
          setIsConnected(true);
          const signer = await prov.getSigner();
          setSigner(signer);
          await fetchBalanceAndSymbol(prov, acc);
        }
      } catch (err) {
        console.error("Init failed:", err);
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not installed");
    try {
      const prov = new ethers.BrowserProvider(window.ethereum);
      const accounts = await prov.send("eth_requestAccounts", []);
      const acc = accounts[0];

      setProvider(prov);
      setAccount(acc);
      setIsConnected(true);
      const signer = await prov.getSigner();
      setSigner(signer);
      await fetchBalanceAndSymbol(prov, acc);
    } catch (err) {
      console.error("Wallet connect failed", err);
    }
  };

  // ✅ Disconnect wallet
  const disconnectWallet = () => {
    setAccount("");
    setSigner(null);
    setProvider(null);
    setBalance(null);
    setSymbol("");
    setIsConnected(false);
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        balance,
        symbol,
        isConnected,
        connectWallet,
        disconnectWallet, // ✅ Include here
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
