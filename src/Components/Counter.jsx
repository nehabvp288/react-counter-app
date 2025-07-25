import { useState, useEffect } from "react";
import "../style.css";

const Counter = () => {
  const MIN = 0;
  const MAX = 20;

  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [step, setStep] = useState(1);

  // Load saved count from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("count");
    if (saved !== null) setCount(Number(saved));
  }, []);

  // Save to localStorage whenever count changes
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  const increment = () => {
    if (count + step <= MAX) setCount((prev) => prev + step);
  };

  const decrement = () => {
    if (count - step >= MIN) setCount((prev) => prev - step);
  };

  const reset = () => setCount(0);
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className={`container ${isDark ? "dark" : "light"}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="number-wrapper">
        <h1 key={count} className="number">{count}</h1>
      </div>

      <div className="step-select">
        <label htmlFor="step">Step:</label>
        <select id="step" value={step} onChange={(e) => setStep(Number(e.target.value))}>
          <option value={1}>+/- 1</option>
          <option value={5}>+/- 5</option>
          <option value={10}>+/- 10</option>
        </select>
      </div>

      <div className="btns-container">
        <button onClick={decrement} className="btn" disabled={count <= MIN}>−</button>
        <button onClick={reset} className="btn reset" disabled={count === 0}>Reset</button>
        <button onClick={increment} className="btn" disabled={count >= MAX}>+</button>
      </div>
    </div>
  );
};

export default Counter;
