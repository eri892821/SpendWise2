import { useState, useEffect, useRef } from 'react'
import {
  getCategories,
  getAccounts,
  addCategory as dbAddCategory,
  addTransaction as dbAddTransaction,
} from './db'

import categoriesLogo from './assets/Gemini_Generated_Image_r5byi0r5byi0r5by.jpg'
import budgetLogo from './assets/Gemini_Generated_Image_7dvgog7dvgog7dvg.jpg'
import dashboardLogo from './assets/Gemini_Generated_Image_27pdd327pdd327pd.jpg'
import savingGoals from './assets/Gemini_Generated_Image_59avso59avso59av.jpg'
import accountsLogo from './assets/Gemini_Generated_Image_ov0r71ov0r71ov0r.jpg'



const icons = {
  categories: categoriesLogo,
  budget: budgetLogo,
  dashboard: dashboardLogo,
  savings: savingGoals,
  accounts: accountsLogo,
}

const getIcon = (key) => icons[key] ?? categoriesLogo


const normaliseCategory = (category) => ({
  ...category,
  budget: Number(category.budget),
  transactions: (category.transactions ?? []).map((t) => ({
    ...t,
    amount: Number(t.amount),
  })),
})

const formatRand = (value) => `R${value.toLocaleString('en-US')}`

const getSpent = (category) =>
  category.transactions.reduce((sum, t) => sum + t.amount, 0)

const parseDate = (input) => {
  const match = input.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!match) return null
  const [, d, m, y] = match.map(Number)
  const date = new Date(y, m - 1, d)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null
  }
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

const formatShortDate = (iso) =>
  new Date(`${String(iso).slice(0, 10)}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })



const cardClass =
  'bg-[#1f1f1f] text-white rounded-2xl shadow-lg border border-zinc-800'
const labelClass = 'block text-sm text-zinc-400 mb-1'
const inputClass =
  'w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500'
const primaryButtonClass =
  'bg-[#0e63c5] hover:bg-[#1a6fd1] text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition-colors'


const Notification = ({ message }) => {
  if (message === null) return null

  return (
    <div
      role="alert"
      className="bg-red-950/60 border border-red-800 text-red-200 text-sm rounded-lg px-4 py-3 mb-6"
    >
      {message}
    </div>
  )
}

const CategoryList = ({ categories, selectedId, onSelect, onAddClick }) => {
  return (
    <div className={`${cardClass} p-5 w-80 shrink-0`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Categories</h3>
        <button
          type="button"
          onClick={onAddClick}
          aria-label="Add category"
          className="text-blue-500 hover:text-blue-400 font-bold text-xl"
        >
          +
        </button>
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-zinc-400">No categories yet.</p>
      )}

      <ul className="flex flex-col gap-1">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => onSelect(category.id)}
              className={`w-full flex justify-between items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                category.id === selectedId ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3 font-bold text-white/80">
                <img
                  src={getIcon(category.icon)}
                  alt=""
                  className="w-8 h-8 object-cover rounded-md"
                />
                {category.name}
              </span>
              <span className="text-zinc-300">
                {formatRand(getSpent(category))}/{formatRand(category.budget)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const BudgetSummary = ({ category }) => {
  const { name, icon, budget } = category

  const spent = getSpent(category)
  const overBudget = spent > budget
  const percent =
    budget > 0 ? Math.min((spent / budget) * 100, 100) : spent > 0 ? 100 : 0

  return (
    <div className={`${cardClass} p-5`}>
      <div className="flex items-center gap-3 mb-4">
        <img
          src={getIcon(icon)}
          alt=""
          className="w-10 h-10 object-cover rounded-md"
        />
        <div>
          <h3 className="text-xl font-bold leading-tight">{name}</h3>
          <p className="text-sm text-zinc-400">
            Budget target: {formatRand(budget)} / month
          </p>
        </div>
      </div>

      <div className="flex justify-between text-xs font-bold mb-1">
        <span className={overBudget ? 'text-red-400' : ''}>
          {formatRand(spent)} spent
        </span>
        <span>of {formatRand(budget)}</span>
      </div>

      <div
        className="h-2 rounded-full bg-zinc-700 overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={budget}
        aria-valuenow={spent}
        aria-label={`${name} budget used`}
      >
        <div
          className={`h-full rounded-full transition-all ${
            overBudget ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

const AddTransactionForm = ({ categoryName, accounts, onAdd }) => {
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const selectedAccount = account || accounts[0]?.name || ''

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isoDate = parseDate(date)
    const value = parseFloat(amount)

    if (!isoDate) return setError('Enter the date as dd/mm/yyyy.')
    if (!value || value <= 0) return setError('Enter an amount above R0.')
    if (!selectedAccount) return setError('Choose an account.')

    setSaving(true)
    const ok = await onAdd({ date: isoDate, amount: value, account: selectedAccount })
    setSaving(false)

    if (ok) {
      setDate('')
      setAmount('')
      setError('')
    }
  }

  return (
    <div className={`${cardClass} p-5`}>
      <h3 className="text-lg font-bold mb-4">
        Add a transaction to {categoryName.toLowerCase()}
      </h3>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-3 gap-4">
        <label>
          <span className={labelClass}>Date</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="dd/mm/yyyy"
            className={inputClass}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>

        <label>
          <span className={labelClass}>Amount (R)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            className={inputClass}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>

        <label>
          <span className={labelClass}>Account</span>
          <select
            className={inputClass}
            value={selectedAccount}
            onChange={(event) => setAccount(event.target.value)}
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={saving}
          className={`${primaryButtonClass} col-start-3 disabled:opacity-60`}
        >
          {saving ? 'Saving...' : 'Add'}
        </button>
      </form>

      {error && (
        <p role="alert" className="text-red-400 text-sm mt-3">
          {error}
        </p>
      )}
    </div>
  )
}

const TransactionTable = ({ transactions }) => {
  return (
    <div className={`${cardClass} p-6`}>
      <h3 className="text-lg font-bold mb-1">Transactions in this category</h3>

      <div className="grid grid-cols-3 items-center py-4 border-b border-zinc-800/60 text-sm">
        <span className="text-lg text-zinc-300">Date</span>
        <span className="text-lg text-zinc-300">Account</span>
        <span className="text-lg text-zinc-300">Amount</span>
      </div>

      {transactions.length === 0 && (
        <p className="py-4 text-sm text-zinc-400">
          No transactions yet. Add one above.
        </p>
      )}

      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="grid grid-cols-3 items-center py-3 border-b border-zinc-800/60 text-sm"
        >
          <span className="text-zinc-300">{formatShortDate(transaction.date)}</span>
          <span className="text-zinc-300">{transaction.account}</span>
          <span className="text-zinc-300">-{formatRand(transaction.amount)}</span>
        </div>
      ))}
    </div>
  )
}

const AddCategoryPopup = ({ onAdd, onClose }) => {
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const value = parseFloat(budget)

    if (!name.trim()) return setError('Enter a category name.')
    if (!value || value <= 0) return setError('Enter a monthly budget above R0.')

    setSaving(true)
    await onAdd(name.trim(), value)
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-[#1f1f1f] text-white p-6 rounded-2xl w-96 shadow-2xl border border-zinc-800">
        <h3 className="text-lg font-bold mb-4">Add Category</h3>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold px-2 py-1"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <label>
            <span className={labelClass}>Category Name</span>
            <input
              autoFocus
              type="text"
              placeholder="rent, fuel..."
              className={inputClass}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label>
            <span className={labelClass}>Monthly Budget (R)</span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="1000"
              className={inputClass}
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            />
          </label>

          {error && (
            <p role="alert" className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className={`${primaryButtonClass} disabled:opacity-60`}
          >
            {saving ? 'Saving...' : 'Save category'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ---------- page ---------- */

const Categories = () => {
  const [categories, setCategories] = useState(null) // null = still loading
  const [accounts, setAccounts] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const timerRef = useRef(null)

  const notify = (message) => {
    clearTimeout(timerRef.current)
    setErrorMessage(message)
    timerRef.current = setTimeout(() => setErrorMessage(null), 5000)
  }

  const loadCategories = async () => {
    const data = await getCategories()
    setCategories(data.map(normaliseCategory))
  }

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const [categoryData, accountData] = await Promise.all([
          getCategories(),
          getAccounts(),
        ])
        if (cancelled) return
        setCategories(categoryData.map(normaliseCategory))
        setAccounts(accountData)
      } catch {
        if (cancelled) return
        setCategories([])
        notify('Could not load data from the database.')
      }
    }

    load()

    return () => {
      cancelled = true
      clearTimeout(timerRef.current)
    }
  }, [])

  const selected =
    categories?.find((category) => category.id === selectedId) ?? categories?.[0]

  const addCategory = async (name, budget) => {
    try {
      await dbAddCategory({ name, icon: 'categories', budget })
      await loadCategories()
      setShowPopup(false)
    } catch {
      notify('Could not add the category.')
    }
  }

  const addTransaction = async (transaction) => {
    try {
      await dbAddTransaction(selected.id, transaction)
      await loadCategories()
      return true
    } catch {
      notify('Could not save the transaction.')
      return false
    }
  }

  return (
    <div>
      <h2 className="!text-5xl !font-bold mb-6">Categories</h2>

      <Notification message={errorMessage} />

      {categories === null ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-row gap-6 items-start">
          <CategoryList
            categories={categories}
            selectedId={selected?.id}
            onSelect={setSelectedId}
            onAddClick={() => setShowPopup(true)}
          />

          {selected ? (
            <div className="flex flex-col gap-6 flex-1 max-w-3xl">
              <BudgetSummary category={selected} />
              <AddTransactionForm
                categoryName={selected.name}
                accounts={accounts}
                onAdd={addTransaction}
              />
              <TransactionTable transactions={selected.transactions} />
            </div>
          ) : (
            <div className={`${cardClass} p-5 text-zinc-400`}>
              Add a category with the + button to get started.
            </div>
          )}
        </div>
      )}

      {showPopup && (
        <AddCategoryPopup
          onAdd={addCategory}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  )
}

export default Categories