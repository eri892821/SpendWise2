import { PGlite } from '@electric-sql/pglite'

export const db = new PGlite('./database')

export async function initDb() {
	await db.exec(`
		CREATE TABLE IF NOT EXISTS accounts (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			type TEXT NOT NULL CHECK (type IN ('Savings', 'Credit')),
			initial_balance NUMERIC(12, 2) NOT NULL DEFAULT 0
		)
	`)

	const { rows } = await db.query('SELECT COUNT(*)::int AS count FROM accounts')
	if (rows[0].count === 0) {
		await db.query(`
			INSERT INTO accounts (name, type, initial_balance)
			VALUES ('savings', 'Savings', 5000), ('credit', 'Credit', 3000)
		`)
	}
}
