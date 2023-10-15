import { useState, useEffect } from 'react'
import 'near-api-js/dist/near-api-js.min.js';
const { keyStores, connect, WalletConnection } = window.nearApi;
import './App.css'
import Popover from "./Popover";

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
  return wallet;
}

async function updateUI(wallet) {
  const accountIdDisplay = document.getElementById("account-id");
  const accountBalanceDisplay = document.getElementById("account-balance");
  const tipSection = document.getElementById("tip-section");

  if (wallet.isSignedIn()) {
    const accountId = wallet.getAccountId();
    accountIdDisplay.innerText = "Signed in as: " + accountId;
    tipSection.style.display = "block";  // Show tip section

    //get account balance
    const account = await wallet.account();
    const accountBalance = await account.getAccountBalance();
    const amountInNear = utils.format.formatNearAmount(accountBalance.available, 2);
    accountBalanceDisplay.innerText = "Account Balance: " + amountInNear + " Ⓝ";


  } else {
    accountIdDisplay.innerText = "Not signed in";
    tipSection.style.display = "none";  // Hide tip section if not signed in
    accountBalanceDisplay.innerText = "";

  }
}

function App() {
  const [wallet, setWallet] = useState()
  useEffect(() => {
    initializeNear().then((wallet) => setWallet(wallet))
  }, [])


  return (
    <div style={{ display: "none" }}>
      <button id="sign-in-button" style={{ marginTop: "2rem" }} onClick={() => console.log("fuck u", wallet)}>sign in cibai</button>
    </div >
  )
}

export default App
