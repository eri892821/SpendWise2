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

  








export default Budgets;