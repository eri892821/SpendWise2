import { useState, useEffect } from 'react'
import { Car, ShoppingCart, Tv, Tag } from 'lucide-react'
import './App.css'
import spendwiseLogo from './assets/Gemini_Generated_Image.jfif'
import categoriesLogo from './assets/Gemini_Generated_Image_r5byi0r5byi0r5by.jpg'
import budgetLogo from './assets/Gemini_Generated_Image_7dvgog7dvgog7dvg.jpg'
import dashboardLogo from './assets/Gemini_Generated_Image_27pdd327pdd327pd.jpg'
import savingGoals from './assets/Gemini_Generated_Image_59avso59avso59av.jpg'
import accountsLogo from './assets/Gemini_Generated_Image_ov0r71ov0r71ov0r.jpg'
import categoryService from './services/categories'
import accountService from './services/accounts'


const ICONS = { car: Car, 'shopping-cart': ShoppingCart, tv: Tv, tag: Tag }
const getIcon = (key) => ICONS[key] ?? Tag

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
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })


const cardClass =
  'bg-[#1f1f1f] text-white rounded-2xl shadow-lg border border-zinc-800'
const labelClass = 'block text-sm text-zinc-400 mb-1'
const inputClass =
  'w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500'
const primaryButtonClass =
  'bg-[#0e63c5] hover:bg-[#1a6fd1] text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition-colors'


const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-[#0e63c5] text-white antialiased p-6">
      <div className="flex items-center gap-3 mb-8">
        <img src={spendwiseLogo} alt="SpendWise Logo" className="w-10 h-10 object-cover rounded-md" />
        <h2 className="!text-3xl !font-bold">SpendWise</h2>
      </div>

      <nav className="flex flex-col gap-4">
        <div>
          <button onClick={() => console.log('Dashboard clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={dashboardLogo} alt="Dashboard logo" className="dashboard-icon w-8 h-8 object-cover rounded-md" />
            Dashboard
          </button>
        </div>

        <div>
          <button onClick={() => console.log('Accounts clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={accountsLogo} alt="Accounts logo" className="w-8 h-8 object-cover rounded-md" />
            Accounts
          </button>
        </div>

        <div className="text-sm text-white/80">
          <button onClick={() => console.log('Budgets clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={budgetLogo} alt="Budget logo" className="w-8 h-8 object-cover rounded-md" />
            Budgets
          </button>
        </div>

        <div className="text-sm text-white/80">
          <button onClick={() => console.log('Saving goals clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={savingGoals} alt="Saving goals logo" className="w-8 h-8 object-cover rounded-md" />
            Saving goals
          </button>
        </div>

        <div className="text-sm text-white/80">
          <button onClick={() => console.log('Categories clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={categoriesLogo} alt="Categories logo" className="w-8 h-8 object-cover rounded-md" />
            Categories
          </button>
        </div>
      </nav>
    </div>
  )
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

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
        {categories.map((category) => {
          const Icon = getIcon(category.icon)

          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                className={`w-full flex justify-between items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                  category.id === selectedId ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-3 font-bold text-white/80">
                  <Icon size={20} strokeWidth={1.6} />
                  {category.name}
                </span>
                <span className="text-zinc-300">
                  {formatRand(getSpent(category))}/{formatRand(category.budget)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const BudgetSummary = ({ category }) => {
  const { name, icon, budget } = category
  const Icon = getIcon(icon)

  const spent = getSpent(category)
  const overBudget = spent > budget
  const percent =
    budget > 0 ? Math.min((spent / budget) * 100, 100) : spent > 0 ? 100 : 0

  return (
    <div className={`${cardClass} p-5`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon size={34} strokeWidth={1.6} />
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

        <button type="submit" className={`${primaryButtonClass} col-start-3`}>
          Add
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

  const handleSubmit = (event) => {
    event.preventDefault()
    const value = parseFloat(budget)

    if (!name.trim()) return setError('Enter a category name.')
    if (!value || value <= 0) return setError('Enter a monthly budget above R0.')

    onAdd(name.trim(), value)
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
              placeholder="R1000"
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

          <button type="submit" className={primaryButtonClass}>
            Save category
          </button>
        </form>
      </div>
    </div>
  )
}


const Categories = () => {
  const [categories, setCategories] = useState(null) 
  const [accounts, setAccounts] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  useEffect(() => {
    categoryService
      .getAll()
      .then((initialCategories) => setCategories(initialCategories))
      .catch(() =>
        notify('Could not load categories. Is json-server running on port 3001?')
      )

    accountService
      .getAll()
      .then((initialAccounts) => setAccounts(initialAccounts))
      .catch(() => notify('Could not load accounts.'))
  }, [])

  const selected =
    categories?.find((category) => category.id === selectedId) ?? categories?.[0]

  const addCategory = (name, budget) => {
    const newCategory = { name, icon: 'tag', budget, transactions: [] }

    categoryService
      .create(newCategory)
      .then((createdCategory) => {
        setCategories(categories.concat(createdCategory))
        setSelectedId(createdCategory.id)
        setShowPopup(false)
      })
      .catch(() => notify('Could not add the category.'))
  }

  const addTransaction = (transaction) => {
    const nextId = Math.max(0, ...selected.transactions.map((t) => t.id)) + 1

    const changedCategory = {
      ...selected,
      transactions: [{ id: nextId, ...transaction }, ...selected.transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
    }

    categoryService
      .update(selected.id, changedCategory)
      .then((returnedCategory) => {
        setCategories(
          categories.map((category) =>
            category.id !== selected.id ? category : returnedCategory
          )
        )
      })
      .catch(() => notify('Could not save the transaction.'))
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

const App = () => {
  return (
    <div className="flex min-h-screen w-full m-0 p-0">
      <Sidebar />
      <main className="flex-1 bg-[#282828] min-h-screen text-white p-8">
        <Categories />
      </main>
    </div>
  )
}

export default App