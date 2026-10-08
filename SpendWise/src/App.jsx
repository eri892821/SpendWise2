import { useState } from 'react'
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

const Sidebar =()=>{

  return(
 <div className="flex min-h-screen w-full">
    <div className="w-64 min-h-screen bg-[#0e63c5] text-white antialiased p-6">
      <div className="flex items-center gap-3 mb-8">
        <img src={spendwiseLogo} alt="SpendWise Logo" className="w-10 h-10 object-cover rounded-md" />
        <h2 className = "text-white text-2xl font-bold">SpendWise</h2>
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
    </div>
  )

}

const App =()=>{
  return(
  
    <Sidebar/>

  )
}

export default App
