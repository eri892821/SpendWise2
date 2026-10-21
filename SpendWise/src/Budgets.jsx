import {useState} from 'react'
import budgetIcon from './assets/Gemini_Generated_Image_7dvgog7dvgog7dvg.jpg'


function Budgets (){
  const[budgets, setBudgets] =useState ([
    {id:1, category:'Transport',target:1500,date:'30 Aug',spent:870},
    {id:2, category:'Groceries',target:2500,date:'30 Aug',spent:2200},
    {id:3, category:'Entertainment',target:500,date:'30 Aug',spent:580},
  ])

   const[category,setCategory]=useState ('')
  const [target, setTarget]=useState('')
  const [date, setDate]=useState('')

  const handleSubmit= (event)=> {
    event.preventDefault()
    const newBudget={
      id:Date.now(),
      category:category,
      target:Number(target),
      date:date,
      spent:0,
    }
    
    setBudgets(budgets.concat(newBudget))
    setCategory('')
    setTarget('')
    setDate('')
  }

 return (
    <div>
     <div>
     <h2 className="!text-5xl !font-bold mb-6">Budgets</h2>

    {/* Summary Card for Total Budgeted */}
  <div className="grid grid-cols-3 gap-6">
    <div className="bg-[#eef2f9] p-5 rounded-2xl shadow-sm w-64">
    <p className="text-sm font-medium text-[#1d5bb4]"> Total Budgeted</p>
    <h3 className="text-2xl font-bold text-[#0c3162] mt-1">R5,000 </h3>
  </div>

   {/* Summary Card for Total Spent */}
   <div  className="bg-[#eef2f9] p-5 rounded-2xl shadow-sm" >
    <p  className="text-sm font-medium text-[#1d5bb4]"> Total Spent</p>
    <h3 className="text-2xl font-bold text-[#0c3162] mt-1">R4,860</h3>
  </div>

    {/* Summary Card for Over Spent */}
  <div className="bg-[#e4771d] p-5 rounded-2xl shadow-sm">
    <p className="text-sm font-medium text-[#1d5bb4]"> Over Spent</p>
    <h3 className="text-2xl font-bold text-[#0c3162] mt-1">R80</h3>
    <p className="text-sm font-medium text-[#1d5bb4]">Entertainment</p>
    </div>
 </div>

  {/* Budgets Table */}
  <div className="bg-[#1f1f1f] text-white p-6 rounded-2xl shadow-lg border border-zinc-800 mt-6 w-full">

   <table className="w-full text-left">
     <thead>
      <tr>
        <th className="text-lg font-normal text-zinc-300 pb-3 border-b border-zinc-400">Category</th>
        <th className="text-lg font-normal text-zinc-300 pb-3 border-b border-zinc-400">Target Amount</th>
        <th className="text-lg font-normal text-zinc-300 pb-3 border-b border-zinc-400">Target Date</th>
        <th className="text-lg font-normal text-zinc-300 pb-3 border-b border-zinc-400">Progress</th>
        <th className="text-lg font-normal text-zinc-300 pb-3 border-b border-zinc-400">Spent</th> 
      </tr>
     </thead>

<tbody>
      {budgets.map((b) => (
              <tr key={b.id}>
                <td className="py-3 border-b border-zinc-600">  
                <span className="flex items-center gap-3 text-sm text-white/80 font-bold ">
                <img src={budgetIcon} alt={b.category} className="w-8 h-8 object-cover rounded-md" />
                  {b.category}
                  </span>
                  </td>
                <td className="py-3 border-b border-zinc-600 text-zinc-300">R{b.target}</td>
                <td className="py-3 border-b border-zinc-600 text-zinc-300" >{b.date}</td>
                <td className="py-3 border-b border-zinc-600">
                <div className="bg-zinc-200 h-2 w-40 rounded-full overflow-hidden">
                 
                 <div 
                  className={`h-full rounded-full ${b.spent > b.target ? 'bg-orange-700' : 'bg-blue-600'}`}
                      style={{width: `${Math.min((b.spent / b.target) * 100, 100)}%`,
                       height: '100%',
                      background: b.spent > b.target ? 'red' : 'blue'}}
                     />
                 </div>
                 </td>
                <td className="py-3 border-b border-zinc-600 text-zinc-300 text-right">
                R{b.spent}
                <button type="button" className="text-zinc-400 hover:text-white ml-3">•••</button>
                </td>
              
              </tr>
            ))}
     </tbody>
   </table>
  </div>  


{/* Budget Form*/}
<div className="bg-[#181818] text-white p-6 rounded-2xl shadow-lg border border-zinc-800 mt-6 w-full">
  <h3 className="text-xl font-bold mb-4">Create a new budget</h3>

  <form onSubmit={handleSubmit}className="flex items-end gap-4">
    {/* Field 1: category */}
    <div className="flex-1">
      <label className="block text-lg text-zinc-300 mb-2">Category</label>
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        className="w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
        required>

        <option value="">Select category</option>
        <option value="Transport">Transport</option>
        <option value="Groceries">Groceries</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </div>

    <div className="flex-1">
      <label className="block text-lg text-zinc-300 mb-2">Target amount</label>
      <input
        type="number"
        placeholder="R 0.00"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
        required
      />
    </div>

    <div className="flex-1">
      <label className="block text-lg text-zinc-300 mb-2">Target date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        classname="w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]"
        required
      />
    </div>
   
   <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-2.5 rounded-lg transition-colors">
    Create
   </button>

  </form>
</div>
</div>
</div>
)
}


export default Budgets

