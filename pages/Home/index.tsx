"use client"; // This is a client component 
import { useEffect, useState } from 'react';

const Home = () => {
  const [isConnected, setConnected] = useState(false);
  const [status, setStatus] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        if (accounts && accounts.length > 0) {
          const address: string = accounts[0];
          setConnected(true);
          setWalletAddress(address);
          setStatus('Conectado');
        }
      } catch (error) {
        console.error(error);
        setStatus('Erro durante a conexão com a conta');
      }
    } else {
      setStatus('Instale o MetaMask no seu navegador');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts && accounts.length > 0) {
          const address: string = accounts[0];
          setConnected(true);
          setWalletAddress(address);
        } else {
          setConnected(false);
          setWalletAddress('');
          setStatus('');
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">Conectar com o MetaMask</h1>
      <button
        onClick={connectWallet}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
      >
        {isConnected ? 'Conta Conectada' : 'Conectar'}
      </button>
      {isConnected && (
        <p className="text-white mt-4">
          Conta: {walletAddress.substring(0, 5)}...{walletAddress.substring(38)}
        </p>
      )}
      {status && <p className="text-white mt-4">{status}</p>}
    </div>
  );
};

export default Home;
