import {useState} from 'react'
import { FaPiggyBank, FaEdit, FaTrash } from 'react-icons/fa'

const accountOptions = ['Current Account', 'Savings', 'Credit Card', 'Cash']

function SavingGoals() {
   const [goals, setGoals] = useState([
    { id: 1, name: 'New Laptop', accounts: ['Savings'] },
    { id: 2, name: 'Holiday', accounts: ['Savings'] },
    { id: 3, name: 'Sneakers', accounts: ['Credit Card'] },
  ])

  const [name, setName] = useState('')
  const [selected, setSelected] = useState([])
  const [editingId, setEditingId] = useState(null)


  const toggleAccount = (acc) => {
    if (selected.includes(acc)) {
      setSelected(selected.filter((a) => a !== acc))
    } else {
      setSelected(selected.concat(acc))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selected.length === 0) return

    if (editingId) {
      setGoals(
        goals.map((g) =>
          g.id === editingId ? { ...g, name: name, accounts: selected } : g
        )
      )
    } else {
      setGoals(goals.concat({ id: Date.now(), name: name, accounts: selected }))
    }

 setName('')
    setSelected([])
    setEditingId(null)
  }

  const startEdit = (goal) => {
    setEditingId(goal.id)
    setName(goal.name)
    setSelected(goal.accounts)
  }
    const handleDelete = (id) => {
    setGoals(goals.filter((g) => g.id !== id))
  }

  return (
    <div className="SavingGoals-page">
      <h1>Saving goals</h1>
      
      <div>
+      <h2 className="text-2xl font-semibold text-white mb-4">Saving goals</h2>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {goals.map((g) => (
          <div className="goal-card" key={g.id}>
            <div className="goal-top">
              <FaPiggyBank size={32} />
              <h3>{g.name}</h3>
              <button className="icon-btn" onClick={() => startEdit(g)}>
                <FaEdit />
              </button>
              <button className="icon-btn" onClick={() => handleDelete(g.id)}>
                <FaTrash />
              </button>
            </div>
            <p className="goal-label">Linked accounts</p>
            <div className="pill-row">
              {g.accounts.map((acc) => (
                <span className="pill" key={acc}>{acc}</span>
              ))}
            </div>
          </div>
        ))}
      </div>














  )
};

export default SavingGoals