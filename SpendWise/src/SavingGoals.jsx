import {useState} from 'react'
import savingsIcon from './assets/Gemini_Generated_Image_59avso59avso59av.jpg'

const accountOptions = ['Current Account', 'Savings', 'Credit Card', 'Cash']

const formatMoney = (n) => 'R' + Number(n).toLocaleString('en-ZA')

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })

const daysLeft = (d) => Math.ceil((new Date(d) - new Date()) / 86400000)

function SavingGoals() {
   const [goals, setGoals] = useState([
    { id: 1, name: 'New Laptop', accounts: ['Savings'],target: 15000, saved: 4500, date: '2027-03-01', details: '' ,
      contributions: [
      { id: 101, amount: 3000, date: '2026-09-15' },
      { id: 102, amount: 1500, date: '2026-10-01' },
  ] }, 
    { id: 2, name: 'Holiday', accounts: ['Savings'],target: 50000, saved: 15000, date: '2027-06-25', details: '',
      contributions: [
      { id: 101, amount: 3000, date: '2026-09-15' },
      { id: 102, amount: 1500, date: '2026-10-01' },
  ] },
    { id: 3, name: 'Sneakers', accounts: ['Credit Card'],target: 1200, saved: 500, date: '2027-01-01', details: '',
      contributions: [
      { id: 101, amount: 3000, date: '2026-09-15' },
      { id: 102, amount: 1500, date: '2026-10-01' },
  ] }, 
  ])

   const [name, setName] = useState('')
   const [selected, setSelected] = useState([])
   const [editingId, setEditingId] = useState(null)

   const [target, setTarget] = useState('')
   const [date,setDate] = useState('')
   const [openId,setOpenId] = useState(null)      /*id of the goal that is currently open for contribution*/
   const [amount,setAmount] = useState('')        /*amount that the user contributes*/
 
    /*Code for the goal that pops up with the goal percentage calculation completion*/
    const openGoal= goals.find ((g) => g.id === openId)
    const percent= (g)=> Math.min(100, Math.round (g.saved / g.target * 100))

    const handleSubmit= (event) => {
      event.preventDefault()
      if(selected.length === 0) return

      if(editingId){
        setGoals(
          goals.map((g) =>
            g.id === editingId ? 
           { ...g, name: name, accounts: selected, target:Number(target), date:date } 
            : g
          )
        )
      } else {
        setGoals(
          goals.concat({ 
            id: Date.now(), 
            name: name, 
            accounts: selected, 
            target:Number(target), 
            date:date,
            saved:0,
            details: '',
            contributions: []
          })
        )
      }

      setName('')
      setSelected([])
      setEditingId(null)
      setTarget('')
      setDate('')
    }

    const startEdit = (goal) => {
      setEditingId(goal.id)
      setName(goal.name)
      setSelected(goal.accounts)
      setTarget(goal.target)
      setDate(goal.date)
    }
    
    const handleDelete = (id) => {
      setGoals(goals.filter((g) => g.id !== id))
    }

    const addContribution= (event)=>{
      event.preventDefault()
       const newContribution = {
        id: Date.now(),
        amount: Number(amount),
        date: new Date().toISOString().slice(0, 10),
      }
      setGoals (
        goals.map((g) =>
          g.id === openId ? 
        {...g, saved: g.saved + Number(amount),contributions:[newContribution].concat(g.contributions)} : g
        )
      )
      setAmount('')
    }

    {/*Code to save the details of the goal as user type*/}
    const updateDetails =(text)=> {
      setGoals(goals.map((g) => g.id === openId ? {...g, details:text} : g) )
    }


  return (    
    <div>
     <h2 className= "!text-5xl !font-bold mb-6">Saving goals</h2>

      <div className="grid grid-cols-3 gap-6">
        {goals.map((g) => (
         <div 
           key={g.id} 
           onClick={() => setOpenId(g.id)}
           className="bg-[#1f1f1f] text-white p-5 rounded-2xl border border-zinc-800 cursor-pointer">
            
            <div className="flex items-center gap-3">
              <img src={savingsIcon} alt="Saving Goals" className="w-10 h-10 object-cover rounded-lg" />
              <h3 className="flex-1 text-xl font-bold">{g.name}</h3>
              
           {/*stopPropagation so that the edit and delete buttons don't trigger the pop up*/}

              <button onClick={(e) => {
                e.stopPropagation();
                startEdit(g);}} 
                className="text-sm text-zinc-400 hover:text-white">
                Edit
              </button>

              <button onClick={(e) => {
                e.stopPropagation();
                handleDelete(g.id);}} 
                className="text-sm text-zinc-400 hover:text-red-400">  
                Delete
              </button>
            </div>

            {/*Progress bar for individual goals on cards*/}
            <div className="mt-5 w-full h-2 bg-[#2e2e2e] rounded-full">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: percent(g) + '%' }} />
            </div>

            <p className="text-zinc-400 font-bold mt-2">
              {formatMoney(g.saved)} of {formatMoney(g.target)}
            </p>

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

        <form onSubmit={handleSubmit}  className="flex flex-wrap items-end gap-4">
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

      {/*Target Amount*/ }
      <div className="flex-1">
        <label className="block text-zinc-400 font-bold mb-2">Target Amount</label>
        <input
          type="number"
          min="1"
          value = {target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full bg-[#2e2e2e] rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none"
          required
          />
       </div>

   {/*Target Date*/ }
    <div className="flex-1">
      <label className="block text-zinc-400 font-bold mb-2">Target Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full bg-[#2e2e2e] rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none"
        required
      />
    </div>

 <div className="flex-1">
  <label className="block text-zinc-400 font-bold mb-2">
    Link accounts
  </label>
  <select
    value={selected[0] || ""}
    onChange={(e) => setSelected(e.target.value ? [e.target.value] : [])}
    className="w-full bg-[#2e2e2e] rounded-lg p-3 text-white focus:outline-none"
    required
  >
    <option value="">Select an account</option>

    {accountOptions.map((acc) => (
      <option key={acc} value={acc}>
        {acc}
      </option>
    ))}
  </select>
</div>

<button
  type="submit"
  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg"
>
  {editingId ? 'Save' : 'Create'}
</button>
</form>
</div>

{/*Pop up for goal when user clicks on the goal*/}
{openGoal && (
  <div 
    onClick={() => setOpenId(null)}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-[#1f1f1f] text-white p-6 rounded-2xl border border-zinc-800 w-[500px]">
    
      <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">{openGoal.name}</h3>
              <button onClick={() => setOpenId(null)} className="text-zinc-400 hover:text-white text-2xl">×</button>
            </div>


   {/*Percentage and progress bar for saving goal*/}
   <p className="text-5xl font-bold mb-2">{percent(openGoal)}%</p>
            <div className="w-full h-4 bg-[#2e2e2e] rounded-full mb-2">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: percent(openGoal) + '%' }}
              />
            </div>
            <p className="text-zinc-400 font-bold mb-4">
             {formatMoney(openGoal.saved)} of {formatMoney(openGoal.target)}
            </p>

        {/* date */}
            <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-[#2e2e2e] rounded-lg p-3">
          <p className="text-zinc-400 text-sm">Target date</p>
          <p className="font-bold">{formatDate(openGoal.date)}</p>
        </div>
        <div className="bg-[#2e2e2e] rounded-lg p-3">
          <p className="text-zinc-400 text-sm">Time left</p>
          <p className="font-bold">
            {daysLeft(openGoal.date) < 0 ? 'Overdue' : daysLeft(openGoal.date) + ' days'}
          </p>
        </div>
      </div>
             
        {/* details */}
            <label className="block text-zinc-400 font-bold mb-2">Details</label>
            <textarea
              rows="3"
              value={openGoal.details}
              onChange={(e) => updateDetails(e.target.value)}
              placeholder="Add details..."
              className="w-full bg-[#2e2e2e] rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none mb-4"
            />

        {/* Record contribution */}
         <label className="block text-zinc-400 font-bold mb-2">Record a contribution</label>
            <form onSubmit={addContribution} className="flex gap-3">
              <input
                type="number"
                min="1"
                placeholder="Amount (R)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-[#2e2e2e] rounded-lg p-3 text-white placeholder-zinc-500 focus:outline-none"
                required
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 font-bold px-6 rounded-lg">
                Add
              </button>
            </form>


      {/*Contributions history*/}
      <p className="text-zinc-400 font-bold mb-3">Contribution history</p>
      {openGoal.contributions.length === 0 ? (
        <p className="text-zinc-500">No contributions yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {openGoal.contributions.map((c) => (
            <div key={c.id} className="flex justify-between bg-[#2e2e2e] rounded-lg p-3">
              <span className="font-bold">+ {formatMoney(c.amount)}</span>
              <span className="text-zinc-400">{formatDate(c.date)}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
)}

</div>
  )
}
  

export default SavingGoals