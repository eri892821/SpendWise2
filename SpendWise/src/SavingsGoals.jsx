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
    <div>
     <h2 className="text-2xl font-semibold text-white mb-4">Saving goals</h2>

      <div className="grid grid-cols-3 gap-6">
        {goals.map((g) => (
         <div key={g.id} className="bg-[#1f1f1f] text-white p-5 rounded-2xl border border-zinc-800">

            <div className="flex items-center gap-3">
               <div className="bg-white text-black rounded-lg p-1.5">
              <FaPiggyBank size={26} />
              </div>
              <h3 className="flex-1 text-xl font-bold">{g.name}</h3>
              <button onClick={() => startEdit(g)} className="text-zinc-400 hover:text-white">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(g.id)} className="text-zinc-400 hover:text-white">
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

 <div className="goal-form">
        <h3>{editingId ? 'Edit saving goal' : 'Create a new saving goal'}</h3>

        <form onSubmit={handleSubmit}>
          <div className="goal-field">
            <label>Goal name</label>
            <input
              placeholder="e.g. New Laptop"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
 <div className="goal-field">
            <label>Link accounts</label>
            <div className="pill-row">
              {accountOptions.map((acc) => (
                <button
                  type="button"
                  key={acc}
                  className={selected.includes(acc) ? 'pill-option chosen' : 'pill-option'}
                  onClick={() => toggleAccount(acc)}
                >
                  {acc}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="create-btn">
            {editingId ? 'Save' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  
  )
}

export default SavingGoals