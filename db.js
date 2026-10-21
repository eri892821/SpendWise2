import { PGlite } from '@electric-sql/pglite'

export const db= new PGlite('./database/pgdata')

// Accounts SQL table
await db.exec (`
   CREATE TABLE IF NOT EXISTS accounts(
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL ,
   is_savings BOOLEAN NOT NULL DEFAULT FALSE,
   initial_balance NUMERIC (12, 2) NOT NULL DEFAULT 0
       
    ); 
 `)

//Saving Goals SQL table
//For saving Goals the contributions has its own SQL table

await db.exec (`
    CREATE TABLE IF NOT EXISTS saving_goals(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    account_id INTEGER NOT NULL REFERENCES accounts(id),
    target NUMERIC (12,2) NOT NULL CHECK (target>0),
    target_date DATE NOT NULL,
    details TEXT NOT NULL DEFAULT ''
   
    );

CREATE TABLE IF NOT EXISTS contributions ( 
    id SERIAL PRIMARY KEY,
    goal_id INTEGER NOT NULL REFERENCES saving_goals(id) ON DELETE CASCADE ,
    amount NUMERIC (12,2) not null check (amount >0),
    contribution_date DATE NOT NULL DEFAULT CURRENT_DATE

    );
`)

// All the  Queries

// ACCOUNT QUERIES

//CATEGORIES & TRANSACTIONS QUERIES

//BUDGETS SQL QUERIES

// SAVING GOALS QUERIES

// Account Options for saving goals
