import { useEffect, useState } from 'react';
import './App.css'
import 'near-api-js/dist/near-api-js.min.js';
const { keyStores, connect, WalletConnection } = window.nearApi;
async function initializeNear() {
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  const connectionConfig = {
    networkId: "mainnet",
    keyStore: myKeyStore, // first create a key store
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };
  const nearConnection = await connect(connectionConfig);
  let wallet = new WalletConnection(nearConnection, "testnear");
  console.log('cib', wallet, nearConnection)
  return wallet;
}

function App() {
  const [wallet, setWallet] = useState()
  useEffect(() => {
    initializeNear().then((wallet) => {
      console.log("don't be undefined pls", wallet.account("haoxiang14.near"))
      setWallet(wallet)
    })
  }, [])

  return (
    <div style={{ display: "none" }}>
      <button id="sign-in-button" style={{ marginTop: "2rem" }} onClick={() => console.log("fuck u", wallet)}>sign in cibai</button>
    </div >
  )
}

export default App
