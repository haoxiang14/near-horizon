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

      // Send the tip
      await account.sendMoney(address, yoctoNEARTipAmount);

      alert("Tip sent successfully");
    } catch (error) {
      console.log("Error sending tip: " + error);
    }
  }

  const buttonStyles = {
    paddingX: ".5rem",
    paddingY: ".25rem",
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: "4px",
    marginBottom: "2px",
    fontSize: ".75rem",
    fontWeight: "bold"
  }

  const inputStyles = {
    padding: ".5rem",
    borderRadius: "4px",
    width: "92%",
    border: "1px solid #ccc",
    borderRadius: "4px"
  }

  return (
    <>
      <div style={{ position: "absolute", backgroundColor: "#fff", zIndex: 100, display: "flex", flexDirection: "column", gap: ".5rem", border: "1px solid #ccc", borderRadius: "4px", padding: "1rem", textAlign: "left", width: "16rem" }} className="shadow-lg">
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}> Tip {address}</p>
        <div>
          <p style={{ margin: "4px" }}>Select an ammount: </p>
          <div style={{ display: "flex", gap: ".5rem" }}>
            <button onClick={() => setAmt("1")} style={buttonStyles}> 1 </button>
            <button onClick={() => setAmt("2")} style={buttonStyles}> 2 </button>
            <button onClick={() => setAmt("5")} style={buttonStyles}> 5 </button>
            <button onClick={() => setAmt("10")} style={buttonStyles}> 10 </button>
          </div>
        </div>
        <div>
          <p style={{ margin: "4px" }}>Custom Amount </p>
          <input type="text" id="amount" placeholder="Enter amount in NEAR" value={amt} onChange={(e) => setAmt(e.target.value)} style={inputStyles} />
        </div>
        <button onClick={sendTip} style={{ ...buttonStyles, width: "100%", fontSize: "1rem" }}> Tip </button>
      </div >
    </>
  )
}
