import { useState } from "react";
import accountIcon from "./assets/Gemini_Generated_Image_59avso59avso59av.jpg";
import "./Accounts.css";

const formatRand = (amount) =>
  `R${Number(amount || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

const belongsToAccount = (record, account) =>
  record.accountId === account.id ||
  record.account === account.name ||
  record.accountName === account.name;

function Accounts({
  transactions = [],
  savingsContributions = [],
  savingsGoals = [],
}) {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "savings", type: "Savings", initialBalance: 5000 },
    { id: 2, name: "credit", type: "Credit", initialBalance: 3000 },
  ]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Savings");
  const [balance, setBalance] = useState("");
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
        initialBalance: Number(balance),
      },
    ]);

    setName("");
    setBalance("");
    setSuccessMessage("Account created successfully.");
  };

  const deleteAccount = (id) => {
    const account = accounts.find((currentAccount) => currentAccount.id === id);
    if (!account) return;

    const linkedGoals = savingsGoals.filter(
      (goal) => belongsToAccount(goal, account),
    );
    const linkedGoalIds = new Set(linkedGoals.map((goal) => goal.id));
    const hasTransactions = transactions.some((transaction) =>
      belongsToAccount(transaction, account),
    );
    const hasContributions = savingsContributions.some(
      (contribution) =>
        belongsToAccount(contribution, account) ||
        linkedGoalIds.has(contribution.goalId),
    );

    if (hasTransactions || hasContributions || linkedGoals.length > 0) {
      setSuccessMessage(
        `Cannot delete ${account.name}: it is linked to ${[
          hasTransactions && "transactions",
          hasContributions && "savings contributions",
          linkedGoals.length > 0 && "savings goals",
        ]
          .filter(Boolean)
          .join(", ")}.`,
      );
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${account.name}?`)) {
      return;
    }

    setAccounts((currentAccounts) =>
      currentAccounts.filter((account) => account.id !== id),
    );
    setSuccessMessage(`${account.name} account deleted.`);
  };

  const currentBalance = (account) => {
    const transactionTotal = transactions
      .filter((transaction) => belongsToAccount(transaction, account))
      .reduce((sum, transaction) => sum + (Number(transaction.amount) || 0), 0);
    const linkedGoalIds = new Set(
      savingsGoals
        .filter((goal) => belongsToAccount(goal, account))
        .map((goal) => goal.id),
    );
    const contributionTotal = savingsContributions
      .filter(
        (contribution) =>
          belongsToAccount(contribution, account) ||
          linkedGoalIds.has(contribution.goalId),
      )
      .reduce(
        (sum, contribution) => sum + (Number(contribution.amount) || 0),
        0,
      );

    return account.initialBalance - transactionTotal - contributionTotal;
  };

  const totalBalance = accounts.reduce(
    (sum, account) => sum + currentBalance(account),
    0,
  );

  return (
    <main className="accounts-page">
      <div className="accounts-layout">
        <header className="accounts-header">
          <h1>Accounts</h1>
        </header>

        <section className="accounts-summary" aria-label="account summary">
          <div>
            <p className="accounts-summary-label">Total balance</p>
            <p className="accounts-summary-amount">{formatRand(totalBalance)}</p>
          </div>
          <p className="accounts-count">
            {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
          </p>
        </section>

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

        <section className="accounts-grid" aria-label="Your accounts">
          {accounts.map((account) => {
            const linkedGoals = savingsGoals.filter((goal) =>
              belongsToAccount(goal, account),
            );

            return (
              <article className="account-card" key={account.id}>
                <div className="account-card-heading">
                  <div className="account-card-title">
                    <img className="account-card-icon" src={accountIcon} alt="" />
                    <div>
                      <h2>{account.name}</h2>
                      <p className="account-type">{account.type} account</p>
                    </div>
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

                <p className="account-initial-balance">
                  Initial balance: {formatRand(account.initialBalance)}
                </p>
                <p className="account-balance">{formatRand(currentBalance(account))}</p>
                {linkedGoals.length > 0 && (
                  <ul className="account-goals" aria-label="Linked savings goals">
                    {linkedGoals.map((goal) => (
                      <li className="account-goal-chip" key={goal.id}>
                        {goal.name}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </section>

      </div>
    </main>
  );
}

export default Accounts;
