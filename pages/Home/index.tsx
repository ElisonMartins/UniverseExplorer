"use client"; // This is a client component 
import { useEffect, useState, useClient } from 'react'

function Home() {
  const [isConnected, setConnectedStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [walletAddress, setWallet] = useState('')

  const connectWalletPressed = async () => {
    if (isConnected)
      return alert(
        "Conta já conectada! " +
          String(walletAddress).substring(0, 5) +
          "..." +
          String(walletAddress).substring(38)
      )

    const walletResponse = await connectWallet()
    setConnectedStatus(walletResponse.connectedStatus)
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const address = await window.ethereum.enable()
        const obj = {
          connectedStatus: true,
          status: "Conectado",
          address: address,
        }
        return obj
      } catch (error) {
        return {
          connectedStatus: false,
          status: "Erro durante a conexão com a conta",
        }
      }
    } else {
      return {
        connectedStatus: false,
        status:
          "Instale a Metamask no seu browser: https://metamask.io/download.html",
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">Conectar com o Metamask</h1>
      <button
        onClick={connectWalletPressed}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
      >
        {isConnected ? 'Conta Conectada' : 'Conectar'}
      </button>
      {isConnected && (
        <p className="text-white mt-4">
          Conta: {String(walletAddress).substring(0, 5)}...
          {String(walletAddress).substring(38)}
        </p>
      )}
      {status && <p className="text-white mt-4">{status}</p>}
    </div>
  )
}

export default Home
