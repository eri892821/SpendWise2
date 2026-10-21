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

// 1.Account Options for dropdown menu in Saving Goals
export async function getAccountOptions (){
    const result=await db.query ('SELECT id, name FROM accounts ORDER by name')
    return result.rows
}

//2. Function that fetches the goals, so it displays on page
export async function getGoals(id){
    const params=id?[id]: []

    const goals= await db.query(`
      SELECT g.id,g.name,                
      g.account_id AS "accountId", 
      a.name AS account_name,
      g.target::float AS target,
      to_char(g.target_date, 'YYYY_MM_DD') AS date,
      g.details,
      COALESCE (SUM(c.amount),0)::float AS saved
    FROM savings_goals g
    JOIN accounts a ON a.id=g.account_id
    LEFT JOIN contributions c ON c.goal_id = g.id
    ${id? 'WHERE g.id=$1':''}
    GROUP BY g.id, a.id
    ORDER BY g.id',params)
        `)
}

//3. Retrieves contributions to goals
const contribs= await db.query (`
    SELECT id, goal_id, amount::float AS amount,
         to_char(contribution_date,'YYYY-MM-DD' AS date
    FROM contributions
    ${id ? 'WHERE goal_id = $1' : ''}
    ORDER BY id DESC`, params)


//4. This renders the data the way the page expects
 return goals.row.map ((g)=>({
    id: g.id,
    name: g.name,
    accountId: g.accountId,
    accounts:[g.account_name],     //acount name gets wrapped, as page expect account options to be displayed as a list
    target: g.target,
    saved: g.saved,
    date: g.date,
    details: g.details,

    contributions:contribs.rows             // filters so that only the contributions related to goal is displayed
      .filter((c)=>c.goal_id===g.id)
      .map((c)=>({id:c.id, amount:c.amount,date:c.date})),
 }))
}


//5. Create Savings Goal- Allows users to add a new goal
export async function createGoal({})
