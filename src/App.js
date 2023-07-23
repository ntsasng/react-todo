import logo from "./logo.svg";
import "./App.css";
import Content from "./Content";
import { useCallback, useState } from "react";
import Heading from "./Heading";
import Product from "./Product";
import UpDown from "./UpDown";
import JobTodo from "./JobTodo";

function App() {
  const [show, setShow] = useState(false);
  const [increase, setIncrease] = useState(0);
  const handleIncrease = useCallback(() => {
    setIncrease((prev) => prev + 1);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
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
        <JobTodo />
        {/*
        <button onClick={() => setShow(!show)} type="button">
          Toggle
        </button>
         <UpDown />
        <Product />
        <h1>{increase}</h1>
        <Heading onIncrease={handleIncrease} />
        {show && <Content />} */}
      </header>
    </div>
  );
}

export default App;
