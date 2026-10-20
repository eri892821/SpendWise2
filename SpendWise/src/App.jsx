import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import spendwiseLogo from './assets/Gemini_Generated_Image.jfif'
import categories from './assets/Gemini_Generated_Image_r5byi0r5byi0r5by.jpg'
import budget from './assets/Gemini_Generated_Image_7dvgog7dvgog7dvg.jpg'
import dashboardLogo from './assets/Gemini_Generated_Image_27pdd327pdd327pd.jpg'
import savingGoals from './assets/Gemini_Generated_Image_59avso59avso59av.jpg'
import accounts from './assets/Gemini_Generated_Image_ov0r71ov0r71ov0r.jpg'
import savings from './assets/Gemini_Generated_Image_u9cddpu9cddpu9cd.jpeg'
import credit from './assets/Gemini_Generated_Image_sq2pjesq2pjesq2p.jpeg'
import Cat from './Categories.jsx'

const Sidebar =({})=>{

  return(

    <div className="w-64 min-h-screen bg-[#0e63c5] text-white antialiased p-6">
      <div className="flex items-center gap-3 mb-8">
        <img src={spendwiseLogo} alt="SpendWise Logo" className="w-10 h-10 object-cover rounded-md" />
        <h2 className = "!text-3xl !font-bold">SpendWise</h2>
      </div>

      <nav className="flex flex-col gap-4">

        <div>
          <button onClick={() => console.log('Dashboard clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={dashboardLogo} alt = "Dasboard logo" className ="dashboard-icon w-8 h-8 object-cover rounded-md" />
            Dashboard
          </button>
        </div>

        <div>
          <button onClick={() => console.log('Accounts clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
              <img src={accounts} alt = "Accounts logo" className ="w-8 h-8 object-cover rounded-md" />
              Accounts
          </button>
        </div>

        <div className="text-sm text-white/80">
          <button onClick={() => console.log('Budgets clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={budget} alt = "Budget logo" className ="w-8 h-8 object-cover rounded-md" />
            Budgets
          </button>
        </div>

        <div className="text-sm text-white/80">
          <button onClick={() => console.log('Saving goals clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={savingGoals} alt = "Saving goals logo" className ="w-8 h-8 object-cover rounded-md" />
            Saving goals
          </button>
        </div>

        <div className="text-sm text-white/80">
          <button onClick={() => console.log('Categories clicked')} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
            <img src={categories} alt = "Categories logo" className ="w-8 h-8 object-cover rounded-md" />
            Categories
          </button>
        </div>
      </nav>
      
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

          <div className = "flex flex-col gap-1 pb-4 border-b border-zinc-700">
            <div className = "flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm">
                  <span className="flex items-center gap-3 text-sm text-white/80 font-bold hover:text-white transition-colors">Transport</span>
                </div>
                  <span className="text-sm text-zinc-300">R2,400/R6000</span>
              </div>
            </div>

            <div className = "flex flex-col gap-1 pb-4 border-b border-zinc-700">
              <div className = "flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm">
                 <span className="flex items-center gap-3 text-sm text-white/80 font-bold hover:text-white transition-colors">Groceries</span>
                </div>
              {/*the 12400 is a placeholder*/}
                <span className="text-sm text-zinc-300">R2,400/R6000</span>
              </div>
          </div>
        </div>
    </div>

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

      <div className="grid grid-cols-4 items-center py-1 border-b border-zinc-800/60 text-sm">
        <span className='text-zinc-300'>28 Aug</span>
        <span className='text-zinc-300'>Transport</span>
        <span className='text-zinc-300'>Savings</span>
        <span className='text-zinc-300'>R200</span>
      </div>

    </div>


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

const App =()=>{

  
  return(
    <div className="flex min-h-screen w-screen m-0 p-0">
      <Sidebar/>
        <main className="flex-1 bg-[#282828] min-h-screen text-white p-8">
            <Dashboard/>
        </main>
    </div> 
  )
}
export default App;

