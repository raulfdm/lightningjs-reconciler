import { useState } from "react";

function Title() {
  return <h1>HEHEHE</h1>;
}

function Header() {
  return (
    <header>
      <Title>HELLO CARAIO</Title>
    </header>
  );
}

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <Header />
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
        <component>
          <element getFocused={() => {}} />
        </component>
      </div>
    </div>
  );
}

export default App;
