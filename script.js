// document.body.style.border = "2px solid red"

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-piggy-bank" viewBox="0 0 16 16">
  <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z"/>
  <path fill-rule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"/>
</svg>
`

const createPopover = (address, i) => {
  let popover = document.createElement('div')
  popover.style.position = 'relative'
  const id = `near-horizon-popover-${address}-${i}`
  popover.innerHTML = `
<div id="${id}" style="padding: 1rem; border: 1px solid #ccc; border-radius: 4px; display: none; position: absolute; z-index: 10; background-color: white;">
  the address: ${address}
<div class="p-4 p-sm-5" style="width: 20rem">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">NEAR TIP JAR</h5>
      <p class="card-text">Please Sign In to tip the user</p>
      <button id="sign-in-button" type="button" class="btn btn-primary">Connect Wallet</button>
      <button id="sign-out-button" type="button" class="btn btn-secondary">Sign Out</button>
      <div id="account-id"></div>
      <div id="account-balance"></div>

      <div id="tip-section" style="display: none;">
        <input type="text" id="tip-user" placeholder="Enter accountId(xxx.testnet)">
        <h6>Enter Tip Amount:</h6>
        <input type="number" id="tip-amount" min="1" placeholder="Enter tip amount Ⓝ">
        <button id="tip-button" class="btn btn-success">Tip</button>
      </div>
    </div>


  </div>
  
  <!-- near html js script -->
  <script src="https://cdn.jsdelivr.net/npm/near-api-js@0.44.2/dist/near-api-js.min.js" integrity="sha256-W5o4c5DRZZXMKjuL41jsaoBpE/UHMkrGvIxN9HcjNSY=" crossorigin="anonymous"></script>

  <script>
      const { connect, keyStores, WalletConnection, utils } = nearApi;

      const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

      const connectionConfig = {
          networkId: "testnet",
          keyStore: myKeyStore,
          nodeUrl: "https://rpc.testnet.near.org",
          walletUrl: "https://wallet.testnet.near.org",
          helperUrl: "https://helper.testnet.near.org",
          explorerUrl: "https://explorer.testnet.near.org",
      };

      let wallet; //wallet connection (public)

      async function initializeNear() {
          const nearConnection = await connect(connectionConfig);
          wallet = new WalletConnection(nearConnection, "testnear");
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

      document.addEventListener("DOMContentLoaded", async () => {
          const wallet = await initializeNear();

          const signInButton = document.getElementById("sign-in-button");
          const signOutButton = document.getElementById("sign-out-button");

          signInButton.addEventListener("click", async () => {
              console.log("signing in");
              await wallet.requestSignIn("testnear");
              updateUI(wallet);  // Update UI after sign in
          });

          signOutButton.addEventListener("click", () => {
              wallet.signOut();
              console.log("User signed out");
              updateUI(wallet);  // Update UI after sign out
          });

          // Update UI on page load
          updateUI(wallet);

          const tipButton = document.getElementById("tip-button");
          tipButton.addEventListener("click", sendTip);
      });
   </script>

</div>
</div>
`
  return popover
}

setInterval(() => {
  document.querySelectorAll('button[title="Like"]').forEach((e, i) => {
    if (e.parentElement.querySelector('.tipme')) return
    const url = new URL(e.parentNode.parentNode.parentNode.querySelector('a').href.replaceAll('#', ''))
    const address = url.searchParams.get('accountId')
    console.log('addr', address)
    const popover = createPopover(address, i)

    const newButton = document.createElement('i')
    newButton.classList.add('tipme')
    newButton.style.color = 'rgb(104, 112, 118)'
    newButton.style.padding = '6px'
    newButton.style.cursor = 'pointer'
    newButton.innerHTML = icon
    newButton.title = "Tip user"
    newButton.addEventListener('click', () => {
      let popover = document.querySelector(`#near-horizon-popover-${address.replaceAll('.', '\\.')}-${i}`)
      console.log(popover, address, i)
      popover.style.display = popover.style.display === 'block' ? 'none' : 'block'
    })

    e.parentElement.appendChild(newButton)
    e.parentElement.appendChild(popover)
  })
  console.log('run')
  // interval might be shorter for better ux but (worse performance)?
}, 4000)
