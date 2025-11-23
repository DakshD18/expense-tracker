// src/App.jsx
import { useState } from "react";
import "./App.css";

function App() {
  // Transactions state
  const [transactions, setTransactions] = useState([
    { id: 1, text: "Salary", amount: 20000 },
    { id: 2, text: "Groceries", amount: -1500 },
    { id: 3, text: "Movie", amount: -300 },
  ]);

  // Form state
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Derived values
  const amounts = transactions.map((t) => t.amount);
  const totalBalance = amounts.reduce((acc, val) => acc + val, 0);
  const income = amounts
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val, 0);
  const expense = amounts
    .filter((val) => val < 0)
    .reduce((acc, val) => acc + val, 0);

  // Add transaction
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) {
      alert("Please enter a description and amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text,
      amount: Number(amount),
    };

    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };

  // 🔴 Delete transaction
  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // 🌗 Toggle theme
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      {/* Header with theme toggle */}
      <header className="header">
        <h1>Expense Tracker</h1>
        <button className="theme-toggle" onClick={handleToggleTheme}>
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* Balance */}
      <div className="card balance-card">
        <h2>Your Balance</h2>
        <p className="balance-amount">₹ {totalBalance.toFixed(2)}</p>
      </div>

      {/* Income & Expense Summary */}
      <div className="card summary-card">
        <div className="summary-item income">
          <h3>Income</h3>
          <p>₹ {income.toFixed(2)}</p>
        </div>
        <div className="summary-item expense">
          <h3>Expense</h3>
          <p>₹ {Math.abs(expense).toFixed(2)}</p>
        </div>
      </div>

      {/* Add Transaction Form */}
      <div className="card">
        <h2>Add New Transaction</h2>
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-control">
            <label>Description</label>
            <input
              type="text"
              placeholder="e.g. Rent, Food, Freelance"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label>
              Amount (use negative for expense, positive for income)
            </label>
            <input
              type="number"
              placeholder="e.g. -500 or 2000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">
            Add Transaction
          </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="card">
        <h2>History</h2>
        <ul className="transaction-list">
          {transactions.map((t) => (
            <li
              key={t.id}
              className={`transaction-item ${
                t.amount < 0 ? "minus" : "plus"
              }`}
            >
              <span className="transaction-text">{t.text}</span>
              <span className="transaction-amount">
                {t.amount < 0 ? "-" : "+"}₹ {Math.abs(t.amount)}
              </span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(t.id)}
                aria-label="Delete transaction"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
