import {useState, useEffect} from 'react'
import savings from './assets/Gemini_Generated_Image_u9cddpu9cddpu9cd.jpeg'
import credit from './assets/Gemini_Generated_Image_sq2pjesq2pjesq2p.jpeg'
import { getRecentTransactions, getRecentCategories } from './db'
import {Link} from 'react-router-dom'

const CategoryRows = () => {
  const [categories, setCategories] = useState(null) // null = still loading

  useEffect(() => {
    let cancelled = false

    getRecentCategories(3)
      .then((rows) => {
        if (!cancelled) setCategories(rows)
      })
      .catch((error) => {
        console.error(error)
        if (!cancelled) setCategories([])
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (categories === null) {
    return <p className="text-sm text-zinc-400">Loading...</p>
  }

  if (categories.length === 0) {
    return (
      <p className="text-sm text-zinc-400">
        No categories yet. Add one on the Categories page.
      </p>
    )
  }

   return categories.map((category) => (
    <Link
      key={category.id}
      to={`/categories?id=${category.id}`}
      className="flex justify-between items-center py-3 border-b border-zinc-700"
    >
      <span className="text-sm text-white/80 font-bold hover:text-white transition-colors">{category.name}</span>
      <span className="text-sm text-zinc-300">
        R{category.spent.toLocaleString('en-US')}/R{category.budget.toLocaleString('en-US')}
      </span>
    </Link>
  ))
}



const RecentTransactions = () => {
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    let cancelled = false

    getRecentTransactions(5)
    .then((rows) => {
      if (!cancelled) setTransactions(rows)
      })
    .catch((error) => {
      console.error(error)
      if (!cancelled) setTransactions([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  return(
     <div className="bg-[#1f1f1f] text-white p-6 rounded-2xl shadow-lg border border-zinc-800 mt-6 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-1">
        <h3 className='text-lg font-bold'>Recent Transaction</h3>
        <button className="text-blue-500 hover:text-blue-400 text-sm font-medium transition-colors">View all</button>
      </div>

      <div className="grid grid-cols-4 items-center py-4 border-b border-zinc-800/60 text-sm">
        <span className='text-lg text-zinc-300'>Date</span>
        <span className='text-lg text-zinc-300'>Categories</span>
        <span className='text-lg text-zinc-300'>Account</span>
        <span className='text-lg text-zinc-300'>Amount</span>
      </div>

      {transactions === null && (
        <p className="py-4 text-sm text-zinc-400">Loading...</p>
      )}

      {transactions?.length === 0 && (
        <p className="py-4 text-sm text-zinc-400">
          No transactions yet. Add one on the Categories page.
        </p>
      )}

      {transactions?.map((t) => (
        <div
          key={t.id}
          className="grid grid-cols-4 items-center py-2 border-b border-zinc-800/60 text-sm"
        >
          <span className='text-zinc-300'>
            {new Date(`${t.date}T00:00:00`).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
          <span className='text-zinc-300'>{t.category}</span>
          <span className='text-zinc-300'>{t.account}</span>
          <span className='text-zinc-300'>-R{t.amount.toLocaleString('en-US')}</span>
        </div>
      ))}
    </div>
  )
}




const Dashboard =()=>{

  const [Popup,setPopup] = useState(false)
  const [Pop,setPop] = useState(false)
  const handleBudget =(e)=>{
    e.preventDefault();
    setPop(false)
  }

  const handleSubmit = (q)=>{
    q.preventDefault();
    setPopup(false)
  }
  

  return(
    <div>
      <h2 className = "!text-5xl !font-bold mb-6">
        Dashboard
      </h2>

      <div className="flex flex-row gap-6">

        <div className="bg-[#eef2f9] p-5 rounded-2xl shadow-sm w-64">
          <p className="text-sm font-medium text-[#1d5bb4]">Total Balance</p>
          <h3 className="text-2xl font-bold text-[#0c3162] mt-1">R5,000</h3>
        </div>

        <div className="bg-[#eef2f9] p-5 rounded-2xl shadow-sm w-64">
          <p className="text-sm font-medium text-[#1d5bb4]">Net Position</p>
          <h3 className="text-2xl font-bold text-[#0c3162] mt-1"> +R5,000 </h3>
        </div>

        <div className="bg-[#eef2f9] p-5 rounded-2xl shadow-sm w-64">
          <p className="text-sm font-medium text-[#1d5bb4]">Top of the category spend</p>
          <h3 className="text-2xl font-bold text-[#0c3162] mt-1"> Groceries </h3>
        </div>
      </div>

      <div className='flex flex-row gap-35'>
        <div className="bg-[#1f1f1f] text-white p-5 rounded-2xl w-80 shadow-lg border border-zinc-800 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-l font-bold">Accounts</h3>
            <button className="text-blue-500 hover:text-blue-400 font-bold text-xl" onClick = {()=> setPopup(true)}>
              + 
            </button> {/* this button open a pop up where you add another account and submits to a database*/}
          </div>
          
          <div className = "flex flex-col gap-1 pb-4 border-b border-zinc-700">
            <div className = "flex justify-between items-center">
              <div className="flex items-center gap-1 text-sm">
                 <span className="flex items-center gap-3 text-sm text-white/80 font-bold hover:text-white transition-colors"><img src={savings} alt="savings" className ="w-8 h-8 object-cover rounded-md"/>Savings</span>
              </div>
              {/*the 12400 is a placeholder*/}
              <span className="text-sm text-zinc-300">R12,400</span>
              </div>
              <div className="flex flex-col gap-1 pb-4 border-b border-zinc-700"></div>
              <div className = "flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm">
                  <span className="flex items-center gap-3 text-sm text-white/80 font-bold hover:text-white transition-colors"><img src={credit} alt="savings" className ="w-8 h-8 object-cover rounded-md"/>Credit card</span>
                </div>
                {/*the 12400 is a placeholder*/}
                <span className="text-sm text-zinc-300">R12,400</span>
              </div>
          </div>
        </div>

        <div className="bg-[#1f1f1f] text-white p-5 rounded-2xl w-80 shadow-lg border border-zinc-800 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-l font-bold">Categories</h3>
            <button className="text-blue-500 hover:text-blue-400 font-bold text-xl" onClick = { ()=> setPop(true)}>
              + 
            </button> {/* this button open a pop up where you add another account and submits to a database*/}
          </div>

          <CategoryRows />
        </div>
    </div>


      <RecentTransactions />
    {Popup &&(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="relative bg-[#1f1f1f] text-white p-6 rounded-2xl w-96 shadow-2xl border border-zinc-800">
        <button 
        type='button'
        onClick={()=> setPopup(false)} 
        className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold px-2 py-1"> 
        &times; 
        </button>
        
        <form onSubmit = {handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-s text-zinc-400 mb-1">Account Name</label>
            <input 
            type="text"
            placeholder='savings,credit...'
            className="w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            required
            />
            <label className="block text-s text-zinc-400 mb-1">Initial Balance (R)</label>
            <input
            type="number"
            placeholder='R100'
            className="w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            required
            />
            <button
            type = 'submit' className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2">
            Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
    
  )}

  {Pop &&(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="relative bg-[#1f1f1f] text-white p-6 rounded-2xl w-96 shadow-2xl border border-zinc-800">
    <button onClick={()=> setPop(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-xl font-bold px-2 py-1"> 
    &times; 
    </button>
    <form onSubmit = {handleBudget}>
      <label>Add name</label>
      
      <input 
      type="text"
      placeholder = "Add category name"
      className="w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
      required
       />
       <label>Category Type</label>
       <select 
       className="w-full bg-[#282828] border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
       required
       >
        <option value="">select type...</option>
        <option value="income">income</option>
        <option value="expense">expense</option>
       </select>
       <button  type = 'submit' className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors mt-2">
        Add Category
       </button>
    </form>
    </div>

    </div>
)}

  </div>

  )
   
}


export default Dashboard

