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













  )
};

export default SavingGoals