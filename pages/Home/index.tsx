"use client"; // This is a client component 
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const Home = () => {
  const [isConnected, setConnected] = useState(false);
  const [status, setStatus] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');

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
          getBalance(address);
        }
      } catch (error) {
        console.error(error);
        setStatus('Erro durante a conexão com a conta');
      }
    } else {
      setStatus('Instale o MetaMask no seu navegador');
    }
  };

  const getBalance = async (address: string) => {
    try {
      const web3 = new Web3(window.ethereum!);
      const weiBalance = await web3.eth.getBalance(address);
      const etherBalance = web3.utils.fromWei(weiBalance, 'ether');
      setBalance(etherBalance);
    } catch (error) {
      console.error(error);
      setBalance('Erro ao obter saldo');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts && accounts.length > 0) {
          const address: string = accounts[0];
          setConnected(true);
          setWalletAddress(address);
          getBalance(address);
        } else {
          setConnected(false);
          setWalletAddress('');
          setStatus('');
          setBalance('');
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
        <div className="mt-4 text-white">
          <p>Conta: {walletAddress.substring(0, 5)}...{walletAddress.substring(38)}</p>
          <p>Saldo: {balance} ETH</p>
        </div>
      )}
      {status && <p className="text-white mt-4">{status}</p>}
    </div>
  );
};

export default Home;
