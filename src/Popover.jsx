import { useState } from "react"
import 'near-api-js/dist/near-api-js.min.js';
const { utils } = window.nearApi;

export default function Popover({ address, wallet }) {
  const [amt, setAmt] = useState("")

  const sendTip = async () => {
    if (!amt && amt.length === 0) {
      alert("Please enter a valid tip amount and user");
      return;
    }

    try {
      const yoctoNEARTipAmount = utils.format.parseNearAmount(amt);

      if (!wallet.isSignedIn()) {
        await wallet.requestSignIn("testnear");
      }
      let account = wallet.account();

      console.log("fuck", yoctoNEARTipAmount, account)
      // Send the tip
      await account.sendMoney(address, yoctoNEARTipAmount);

      alert("Tip sent successfully");
    } catch (error) {
      console.log("Error sending tip: " + error);
    }
  }

  return (
    <>
      <div style={{ position: "absolute", backgroundColor: "#fff", zIndex: 100 }}>
        <p> Tip {address}</p>
        <button onClick={() => setAmt(1)}> 1 </button>
        <button onClick={() => setAmt(2)}> 2 </button>
        <button onClick={() => setAmt(5)}> 5 </button>
        <button onClick={() => setAmt(10)}> 10 </button>
        <p> Custom Amount </p>
        <input type="text" id="amount" placeholder="Enter amount in NEAR" value={amt} onChange={(e) => setAmt(e.target.value)} />
        <button onClick={sendTip}> Tip </button>
      </div >
    </>
  )
}
