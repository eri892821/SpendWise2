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


    









export default Budgets;