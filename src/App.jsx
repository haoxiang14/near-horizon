import 'near-api-js/dist/near-api-js.min.js';
import './App.css'

function App({ wallet }) {
  return (
    <div style={{ display: "none" }}>
      <button id="sign-in-button" style={{ marginTop: "2rem" }} onClick={() => console.log("fuck u", wallet)}>sign in cibai</button>
    </div >
  )
}

export default App
