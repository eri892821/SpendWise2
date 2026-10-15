import { useState } from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'

const AddTransactionForm = ({ categoryName, accounts, onAdd }) => {
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState('')
  const [error, setError] = useState('')


const selectedAccount = account || accounts[0]?.name || ''

  const handleSubmit = (event) => {
    event.preventDefault()
    const isoDate = parseDate(date)
    const value = parseFloat(amount)

    if (!isoDate) return setError('Enter the date as dd/mm/yyyy.')
    if (!value || value <= 0) return setError('Enter an amount above R0.')
    if (!selectedAccount) return setError('Choose an account.')

    onAdd({ date: isoDate, amount: value, account: selectedAccount })
    setDate('')
    setAmount('')
    setError('')
  }

   return (
    <section className="card add-transaction">
      <h2 className="card__title">
        Add a transaction to {categoryName.toLowerCase()}
      </h2>

      <form
        className="add-transaction__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="field">
          <span className="field__label">Date</span>
          <span className="field__control">
            <CalendarDays size={18} strokeWidth={1.6} />
            <input
              className="field__input"
              type="text"
              inputMode="numeric"
              placeholder="dd/mm/yyyy"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </span>
        </label>

        <label className="field field--amount">
          <span className="field__label">Amount</span>
          <span className="field__control field__control--amount">
            <span className="field__prefix">R</span>
            <input
              className="field__input"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </span>
        </label>

        <label className="field field--account">
          <span className="field__label">Account</span>
          <span className="field__control field__control--select">
            <select
              className="field__input"
              value={selectedAccount}
              onChange={(event) => setAccount(event.target.value)}
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            <ChevronDown size={16} />
          </span>
        </label>

        <button
          type="submit"
          className="btn btn--primary add-transaction__submit"
        >
          Add
        </button>
      </form>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </section>
  )
}

export default AddTransactionForm