import express from 'express'
import { db, initDb } from './db.js'

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(express.json())

const accountColumns = 'id, name, type, initial_balance AS "initialBalance"'

app.get('/api/accounts', async (_req, res) => {
	const { rows } = await db.query(
		`SELECT ${accountColumns} FROM accounts ORDER BY id`,
	)
	res.json(rows)
})

app.post('/api/accounts', async (req, res) => {
	const { name, type, initialBalance } = req.body ?? {}
	const normalizedName = typeof name === 'string' ? name.trim() : ''
	const balance = Number(initialBalance)

	if (!normalizedName) {
		return res.status(400).json({ error: 'Account name is required.' })
	}
	if (!['Savings', 'Credit'].includes(type)) {
		return res.status(400).json({ error: 'Account type must be Savings or Credit.' })
	}
	if (
		initialBalance === undefined ||
		initialBalance === null ||
		initialBalance === '' ||
		!Number.isFinite(balance) ||
		balance < 0
	) {
		return res.status(400).json({ error: 'Initial balance must be a non-negative number.' })
	}

	const { rows } = await db.query(
		`INSERT INTO accounts (name, type, initial_balance)
		 VALUES ($1, $2, $3)
		 RETURNING ${accountColumns}`,
		[normalizedName, type, balance],
	)
	res.status(201).json(rows[0])
})

app.delete('/api/accounts/:id', async (req, res) => {
	const id = Number(req.params.id)
	if (!Number.isInteger(id) || id < 1) {
		return res.status(400).json({ error: 'Account id must be a positive integer.' })
	}

	const { rows } = await db.query(
		`DELETE FROM accounts WHERE id = $1 RETURNING ${accountColumns}`,
		[id],
	)
	if (rows.length === 0) {
		return res.status(404).json({ error: 'Account not found.' })
	}
	res.json(rows[0])
})

await initDb()
app.listen(port, () => {
	console.log(`SpendWise accounts API listening on port ${port}`)
})

export default app
