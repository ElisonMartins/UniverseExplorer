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
          const address = accounts[0];
          setConnected(true);
          setWalletAddress(address);
          setStatus('Conectado');
          getAccountBalance(address);
        }
      } catch (error) {
        console.error(error);
        setStatus('Erro durante a conexão com a conta');
      }
    } else {
      setStatus('Instale o MetaMask no seu navegador');
    }
  };

  const getAccountBalance = async (address) => {
    try {
      const web3 = new Web3(window.ethereum);
      const balanceInWei = await web3.eth.getBalance(address);
      const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
      setBalance(balanceInEth);
    } catch (error) {
      console.error(error);
      setBalance('Erro ao obter o saldo');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts && accounts.length > 0) {
          const address = accounts[0];
          setConnected(true);
          setWalletAddress(address);
          getAccountBalance(address);
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
        <div>
          <p className="text-white mt-4">
            Conta: {walletAddress.substring(0, 5)}...{walletAddress.substring(38)}
          </p>
          <p className="text-white mt-4">Saldo: {balance} ETH</p>
        </div>
      )}
      {status && <p className="text-white mt-4">{status}</p>}
    </div>
  );
};

export default Home;