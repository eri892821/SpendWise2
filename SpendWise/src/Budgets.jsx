import {useState} from 'react'
import {FaCar, FaShoppingCart, FaTv} from 'react-icons/fa' 

const icons={
  Transport: <FaCar/>,
  Groceries:<FaShoppingCart/>,
  Entertainment:<FaTv/>,
}

function Budgets (){
  const[budgets, setBudgets] =useState ([
    {id:1, category:'Transport',target:1500,date:'30 Aug',spent:870},
    {id:1, category:'Groceries',target:2500,date:'30 Aug',spent:2200},
    {id:1, category:'Entertainment',target:500,date:'30 Aug',spent:580},
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
      <div className="budgets-page">
      <h1> Budgets</h1>

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
                <td>{icons[b.category]}{b.category}</td>
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


    









export default Budgets;