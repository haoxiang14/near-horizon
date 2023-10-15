import { useState } from "react"

export default function Popover({ address }) {
  const [amt, setAmt] = useState()

  async function sendTip() {
    console.log("test", amt)
    if (!amt && amt.length === 0) {
      alert("Please enter a valid tip amount and user");
      return;
    }

    try {
      const yoctoNEARTipAmount = utils.format.parseNearAmount(tipAmount);

      if (!wallet.isSignedIn()) {
        alert("Please connect the wallet and sign in.");
        return;
      }

      let account = wallet.account();

      alert("fuck", yoctoNEARTipAmount)
      // Send the tip
      // await account.sendMoney(address, yoctoNEARTipAmount);

      alert("Tip sent successfully");
    } catch (error) {
      alert("Error sending tip: " + error);
    }
  }

  return (
    <>
      <div style={{ position: "absolute", backgroundColor: "#fff", zIndex: 100 }}>
        <p> Tip {address}</p>
        <button> 1 </button>
        <button> 2 </button>
        <button> 5 </button>
        <button> 10 </button>
        <p> Custom Amount </p>
        <input type="text" id="amount" placeholder="Enter amount in NEAR" value={amt} onChange={(e) => setAmt(e.target.value)}/>
        <button onClick={sendTip}> Tip </button>
      </div >
    </>
  )
}
