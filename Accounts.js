
import { PGlite } from '@electric-sql/pglite'
import express from 'express'


const app=express()

export const db= new PGlite('./database')

await db.exec (`
   CREATE TABLE IF NOT EXISTS Accounts (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL ,
   is_savings BOOLEAN NOT NULL DEAFULT FALSE,
   initial_balance NUMERIC (12, 2) NOT NULL DEFAULT 0
       );
    
 `)
 
 export const cols =`
  id , 
  name,
  CASE WHEN is_savings THEN 'Savings' ELSE 'Credit' END AS type,
  initial _balance :float8 AS "initialBalance"
  
`

 //Server//

 // GET all accounts
app.get('/api/accounts', async (req, res) => {
  const result = await db.query(`SELECT ${cols} FROM Accounts ORDER BY id`)
  res.json(result.rows)
})
 
// POST create an account
app.post('/api/accounts', async (req, res) => {
  const { name, type, initialBalance } = req.body
 
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Account name is required' })
  }
  if (type !== 'Savings' && type !== 'Credit') {
    return res.status(400).json({ error: 'Type must be either Savings or Credit' })
  }
  if (typeof initialBalance !== 'number' || initialBalance < 0) {
    return res.status(400).json({ error: 'Initial balance must be a non-negative number' })
  }
 
  const result = await db.query(
    `INSERT INTO Accounts (name, is_savings, initial_balance)
     VALUES ($1, $2, $3)
     RETURNING ${cols}`,
    [name.trim(), type === 'Savings', initialBalance]
  )
  res.status(201).json(result.rows[0])
})
 
// DELETE an account
app.delete('/api/accounts/:id', async (req, res) => {
  const result = await db.query('DELETE FROM Accounts WHERE id = $1', [req.params.id])
 
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Account not found' })
  }
  res.status(204).end()
})
 
app.listen(3001, () => console.log('Server running on http://localhost:3001'))
 