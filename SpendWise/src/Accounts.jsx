import { useState } from "react";
import "./Accounts.css";

const formatRand = (amount) =>
  `R${Number(amount || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

function Accounts() {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "savings", type: "Savings", balance: 5000 },
    { id: 2, name: "credit", type: "Credit", balance: 3000 },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Savings");
  const [balance, setBalance] = useState("");
  const [showAccounts, setShowAccounts] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const addAccount = () => {
    setSuccessMessage("");
    if (!name.trim() || !balance) {
      alert("Enter Account Name and Balance");
      return;
    }

    setAccounts((currentAccounts) => [
      ...currentAccounts,
      {
        id: Date.now(),
        name: name.trim(),
        type,
        balance: Number(balance),
      },
    ]);

    setName("");
    setBalance("");
    setShowAccounts(true);
    setSuccessMessage("Account created successfully.");
  };

  const deleteAccount = (id) => {
    setAccounts((currentAccounts) =>
      currentAccounts.filter((account) => account.id !== id),
    );
  };

  const totalBalance = accounts.reduce(
    (sum, account) => sum + (Number(account.balance) || 0),
    0,
  );

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

        {showAccounts && (
          <>
            <section className="accounts-summary" aria-label="Account summary">
              <div>
                <p className="accounts-summary-label">Total balance</p>
                <p className="accounts-summary-amount">
                  {formatRand(totalBalance)}
                </p>
              </div>
              <p className="accounts-count">
                {accounts.length}{" "}
                {accounts.length === 1 ? "account" : "accounts"}
              </p>
            </section>

            <section className="accounts-grid" aria-label="Your accounts">
              {accounts.map((account) => (
                <article className="account-card" key={account.id}>
                  <div className="account-card-heading">
                    <div>
                      <h2>{account.name}</h2>
                      <p className="account-type">{account.type} account</p>
                    </div>
                    <button
                      className="account-delete"
                      type="button"
                      onClick={() => deleteAccount(account.id)}
                      aria-label={`Delete ${account.name} account`}
                    >
                      Delete
                    </button>
                  </div>
                  <p className="account-balance">
                    {formatRand(account.balance)}
                  </p>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Accounts;
