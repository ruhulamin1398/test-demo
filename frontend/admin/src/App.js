import {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/home';
import BuyerBoard from "./Components/Buyerboard"
import LeaderBorad from "./Components/LeaderBoard"
import DashBoard from "./Components/dashboard"
import PremiumBoard from "./Components/premiumBoard"
import ReferralComponents from "./Components/referral"


function App() {
  const [routes, setRoutes] = useState(0)
  // console.warn(routes)
  return (
    <div className="App bg-gradient-to-br from-back-800 to-gray-800 h-screen">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Navbar setRoute={setRoutes}/>
      <div className=" ">
       {
        routes == 0 ? <Home/> :routes == 1 ? <DashBoard/> :  routes == 2 ? <LeaderBorad/> : routes == 3 ? <PremiumBoard/> : <ReferralComponents/>
       }
      </div>
    </div>
  );
}

export default App;
