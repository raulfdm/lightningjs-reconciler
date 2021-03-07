import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <div className="button-container">
        <button
          className="decrement-button"
          onClick={() => setCounter(counter - 1)}
        >
          -
        </button>
        <div className="counter-text">{counter}</div>
        <button
          className="increment-button"
          onClick={() => setCounter(counter + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
