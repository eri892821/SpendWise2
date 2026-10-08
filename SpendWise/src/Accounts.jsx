import { useState } from "react";
import "./Accounts.css";

function Accounts() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "savings", type: "Savings", balance: 5000 },
    { id: 2, name: "credit", type: "Credit", balance: 3000 },
  ]);

  const [name, setName] = useState("");
  const [type, setType] = useState("Savings");
  const [balance, setBalance] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const addAccount = () => {
    if (!name.trim() || !balance) {
      alert("Enter Account Name and Balance");
      return;
    }

    setSuccessMessage("");
    setAccounts([
      ...accounts,
      {
        id: Date.now(),
        name: name.trim(),
        type,
        balance: Number(balance),
      },
    ]);

    setName("");
    setBalance("");
    setSuccessMessage("Account created successfully.");
  };

  return (
    <main className="accounts-page">
      <div className="accounts-layout">
        <header className="accounts-header">
          <h1>Accounts</h1>
        </header>

        <section className="account-form-panel">
          <h2>Create a new account</h2>
          <form
            className="account-form"
            onSubmit={(event) => {
              event.preventDefault();
              addAccount();
            }}
          >
            <label className="account-field">
              <span>Account name</span>
              <input
                placeholder="e.g. Everyday spending"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="account-field">
              <span>Account type</span>
              <select value={type} onChange={(event) => setType(event.target.value)}>
                <option value="Savings">Savings</option>
                <option value="Credit">Credit</option>
              </select>
            </label>

            <label className="account-field">
              <span>Initial balance</span>
              <input
                placeholder="R 0.00"
                type="number"
                value={balance}
                onChange={(event) => setBalance(event.target.value)}
              />
            </label>

            <button className="account-create" type="submit">
              Create
            </button>
          </form>
          {successMessage && (
            <p className="account-success" role="status">
              {successMessage}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

export default Accounts;
