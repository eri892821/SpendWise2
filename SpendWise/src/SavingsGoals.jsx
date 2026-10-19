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

            <p className="text-zinc-400 font-bold mt-5 mb-3">Linked accounts</p>
            <div className="flex flex-wrap gap-2">
              {g.accounts.map((acc) => (
                <span key={acc} className="bg-[#eef2f9] text-[#1d5bb4] font-bold px-5 py-1.5 rounded-full">
                  {acc}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>

 <div className="bg-[#1f1f1f] text-white p-6 rounded-2xl border border-zinc-800 mt-6">
        <h3 className="text-xl font-bold mb-4">
          {editingId ? 'Edit saving goal' : 'Create a new saving goal'}
        </h3>

        <form onSubmit={handleSubmit}  className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-zinc-400 font-bold mb-2">Goal name</label>
            <input
              type="text"
              placeholder="e.g. New Laptop"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#2e2e2e] rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none"
              required
            />
          </div>

 <div className="flex-1">
    <label className="block text-zinc-400 font-bold mb-2">Link accounts</label>
    <div className="flex flex-wrap gap-2 bg-[#2e2e2e] rounded-lg p-2">   
      {accountOptions.map((acc) => (
                <button
                  type="button"
                  key={acc}
                  onClick={() => toggleAccount(acc)}
                  className={
                    selected.includes(acc) 
                    ? 'bg-[#eef2f9] text-[#1d5bb4] font-bold px-4 py-1 rounded-full'
                    : 'bg-[#1f1f1f] text-zinc-300 px-4 py-1 rounded-full'

                  }
                >
                  {acc}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg">
            {editingId ? 'Save' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  
  )
}

export default SavingGoals