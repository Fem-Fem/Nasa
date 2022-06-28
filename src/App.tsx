import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Astronomy Picture of the Day</p>

        {/* link: https://api.nasa.gov/planetary/apod?api_key=FeONMuyEyNh9VfhKSPRFtD9QdKM01D3LKOyEDhjF */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
