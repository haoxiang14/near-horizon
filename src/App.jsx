import { useState, useEffect } from 'react'
import 'near-api-js/dist/near-api-js.min.js';
const { keyStores, connect, WalletConnection } = window.nearApi;
import './App.css'

async function initializeNear() {
  console.log("cibai")
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  const connectionConfig = {
    networkId: "mainnet",
    keyStore: "", // first create a key store
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };
  const nearConnection = await connect(connectionConfig);
  let wallet = new WalletConnection(nearConnection, "testnear");
  return wallet;
}
async function sendTip() {
  const tipUser = document.getElementById("tip-user").value;
  const tipAmount = document.getElementById("tip-amount").value;

  if (tipUser === "" || tipAmount === "") {
    alert("Please enter a valid tip amount and user");
    return;
  }

  try {
    const yoctoNEARTipAmount = utils.format.parseNearAmount(tipAmount);

    if (!wallet.isSignedIn()) {
      alert("Please connect the wallet and sign in.");
      return;
    }

    let account;
    if (wallet.isSignedIn()) {
      account = wallet.account();
    } else {
      account = nearConnection.account(wallet.getAccountId());
    }

    // Send the tip
    await account.sendMoney(tipUser, yoctoNEARTipAmount);

    alert("Tip sent successfully");
  } catch (error) {
    alert("Error sending tip: " + error);
  }
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
    <div style={{ display: "block" }}>
      <button id="sign-in-button" style={{ marginTop: "2rem" }} onClick={() => console.log("fuck u", wallet)}>sign in cibai</button>
    </div >
  )
}

export default App
