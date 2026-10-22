import { PGlite } from '@electric-sql/pglite'

export const db= new PGlite('idb://spendwise')

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
      to_char(g.target_date, 'YYYY-MM-DD') AS date,
      g.details,
      COALESCE (SUM(c.amount),0)::float AS saved
    FROM saving_goals g
    JOIN accounts a ON a.id=g.account_id
    LEFT JOIN contributions c ON c.goal_id = g.id
    ${id? 'WHERE g.id=$1':''}
    GROUP BY g.id, a.id
    ORDER BY g.id`,params)

//3. Retrieves contributions to goals
const contribs= await db.query (`
    SELECT id, goal_id, amount::float AS amount,
         to_char(contribution_date,'YYYY-MM-DD') AS date
    FROM contributions
    ${id ? 'WHERE goal_id = $1' : ''}
    ORDER BY id DESC`, params)


//4. This renders the data the way the page expects
 return goals.rows.map ((g)=>({
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
export async function createGoal({name,accountId,target,date}){
    const result=await db.query(
       `INSERT INTO saving_goals (name,account_Id, target, target_date)
         VALUES ($1, $2, $3, $4) RETURNING id`,
         [name, accountId,target,date]
    )
    const [goal]=await getGoals(result.rows[0].id)
    return goal
}

//6. Updating Saving Goal-editing goal's name,account, target amount or date
export async function updateGoal (id,{name,accountId,target,date}){
    const result=await db.query(
        `UPDATE saving_goals
        SET name=$1, account_id=$2, target=$3, target_date=$4
        WHERE id =$5 RETURNING id`,
        [name,accountId,target,date,id]
    )

    if (result.rows.length===0) return null
      const [goal]=await getGoals(id)
      return goal
}

//7. Delete a Savings Goal
export async function deleteGoal(id){
    const result=await db.query(
        'DELETE FROM saving_goals WHERE id=$1 returning id',
        [id]
    )
    return result.rows.length>0
}

//8. Saving the details(description) of a Savings Goal in the popup form
 export async function saveDetails (id,details){
    const result=await db.query(
        'UPDATE saving_goals SET details =$1 WHERE id=$2 RETURNING id',
        [details,id]
    )
    return result.rows.length> 0
 }

 //9. Add contribution- allows the user to record contributions made to Saving Goal
 export async function addContribution(goalId, amount){

    // query checks if the goal exists
    const exists=await db.query ('SELECT id FROM saving_goals WHERE id= $1',[goalId])
    if (exists.rows.length ===0) return null

    await db.query(
        'INSERT INTO contributions (goal_id,amount) VALUES ($1, $2)',
        [goalId, amount]
    )
    const [goal]= await getGoals(goalId)
    return goal
 }

 // CATEGOGRIES BACKEND

 const setup = async()=>{
    await db.exec(`
        CREATE TABLE IF NOT EXISTS accounts(
            id SERIAL PRIMARY KEY,
            NAME TEXT NOT NULL UNIQUE
            );

        CREATE TABLE IF NOT EXISTS categories(
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            icon TEXT NOT NULL DEFAULT 'categories',
            budget NUMERIC(12, 2) not null check (BUDGET >=0)
        );

        CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
            account_id INTEGER NOT NULL REFERENCES accounts(id),
            amount NUMERIC(12, 2) not null check (amount >0),
            date DATE NOT NULL
        );
    `)

// Initial data of categories before any any categories are made.

const {rows} = await db.query('SELECT COUNT(*)::int AS count FROM accounts')
if (rows[0].count === 0) {
    await db.exec(`
        INSERT INTO accounts (name) VALUES ('Savings'), ('Credit card');

        INSERT INTO categories (name, icon, budget) VALUES
        ('Groceries', 'budget', 6000),
        ('Transport', 'categories', 3000);

        INSERT INTO transactions (category_id, account_id, amount, date) VALUES
        (1, 1, 200, '2026-08-28');
        `)
    }
    }


// getCategories
const ready = setup()

export const getCategories = async () => {
    await ready
    const {rows} = await db.query(`
        SELECT
        c.id,
        c.name,
        c.icon,
        c.budget,
        COALESCE(
        json_agg(
            json_build_object(
            'id', t.id,
            'date', to_char(t.date, 'YYYY-MM-DD'),
            'amount', t.amount,
            'account', a.name
            )
            ORDER BY t.date DESC, t.id DESC
    ) FILTER (WHERE t.id IS NOT NULL), 
     '[]'::json) AS transactions
    FROM categories c
    LEFT JOIN transactions t ON t.category_id = c.id
    LEFT JOIN accounts a ON a.id = t.account_id
    GROUP BY c.id
    ORDER BY c.id;
    `)
return rows 
    }

    // getAccounts
export const getAccounts = async () => {
    await ready

    const {rows} = await db.query('SELECT id, name FROM accounts ORDER BY id')
    return rows
}

// AddCategory
export const addCategory = async ({name, icon = 'categories', budget}) => {
    await ready
    await db.query(
        'INSERT INTO categories (name, icon, budget) VALUES ($1, $2, $3)',
        [name, icon, budget]
    )
}

//AddTransaction
export const addTransaction = async (categoryId, {date, amount, account}) => {
    await ready

    const { rows } = await db.query(
    `INSERT INTO transactions (category_id, account_id, amount, date)
     SELECT $1::int, a.id, $3::numeric, $4::date
     FROM accounts a
     WHERE a.name = $2
     RETURNING id`,
    [categoryId, account, amount, date]
  )

  if (rows.length === 0) {
    throw new Error(`Account "${account}" does not exist.`)
    }
}

export const getRecentTransactions = async (limit = 5) => {
    await ready

    const { rows } = await db.query(
        `SELECT
            t.id,
            to_char(t.date, 'YYYY-MM-DD') AS date,
            c.name AS category,
            a.name AS account,
            t.amount::float AS amount
            FROM transactions t
            JOIN categories c ON c.id = t.category_id
            JOIN accounts a ON a.id = t.account_id
            ORDER BY t.date DESC, t.id DESC
            LIMIT $1`,
        [limit]
    )
    return rows
}

export const getRecentCategories = async (limit = 3) => {
    await ready

    const {rows} = await db.query(
        `SELECT
        c.id,
        c.name,
        c.budget::float AS budget,
        COALESCE(SUM(t.amount), 0)::float AS spent
        FROM categories c
        LEFT JOIN transactions t ON t.category_id = c.id
        GROUP BY c.id
        ORDER BY c.id DESC
        LIMIT $1`,
        [limit]
    )
    return rows
}