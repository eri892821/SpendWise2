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

    <div style={{ display: 'flex', gap: 16 }} >
    <div className="card" style ={{background: '#e8eefc', color: '#0e63c5'}}>
    <p> Total Budgeted</p>
    <h2>R5000</h2>
    </div>

   <div  className="card"  style ={{background: '#e8eefc', color: '#0e63c5'}}>
    <p> Total Spent</p>
    <h2>R4860</h2>
    </div>

     <div className="card" style ={{background: '#e4771d', color: '#0e63c5'}}>
    <p> Over Spent</p>
    <h2>R80</h2>
    <p>Entertainment</p>
    </div>
 </div>

  <div className="table-box">

   <table>
     <thead>
      <tr>
        <th>Category</th>
        <th>Target Amount</th>
        <th>Target Date</th>
        <th>Progress</th>
        <th>Spent</th> 
      </tr>
     </thead>

<tbody>
      {budgets.map((b) => (
              <tr key={b.id}>
                <td>  <span className="flex items-center gap-3">
                <img src={budgetIcon} alt={b.category} className="w-8 h-8 object-cover rounded-md" />
                  {b.category}
                  </span>
                  </td>
                <td>R{b.target}</td>
                <td>{b.date}</td>
                <td>
                  <div style={{ background: '#ddd', height: 8, width: 150 }}>
                 <div style={{
                       width: `${Math.min((b.spent / b.target) * 100, 100)}%`,
                       height: '100%',
                      background: b.spent > b.target ? 'red' : '#0e63c5',
                      }}
                     />
                 </div>
                 </td>
                
                <td>R{b.spent}</td>
              </tr>
            ))}
     </tbody>
   </table>
  </div>  

<div className="form-box">
  <h3>Create a new budget</h3>

  <form onSubmit={handleSubmit}>
    {/* Field 1: category */}
    <div className="form-field">
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select category</option>
        <option value="Transport">Transport</option>
        <option value="Groceries">Groceries</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </div>

    <div className="form-field">
      <label>Target amount</label>
      <input
        type="number"
        placeholder="R 0.00"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        required
      />
    </div>

    <div className="form-field">
      <label>Target date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
    </div>
   
   <button type="submit">Create</button>
  </form>
</div>
</div>
</div>
)
}


export default Budgets

