CREATE TABLE IF NOT EXISTS Accounts(
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT,
    balance INTEGER
);

CREATE TABLE IF NOT EXISTS Categories(
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT,
);

CREATE TABLE IF NOT EXISTS Transactions(
    id SERIAL PRIMARY KEY,
    date TEXT,
    amount TEXT,
    description TEXT,
    account_id INTEGER REFRENCES ACCOUNTS (id),
    category_id INTEGERE REFRENCES categories (id),
);

CREATE TABLE IF NOT EXISTS Budgets(
    id SERIAL PRIMARY KEY,
   category_id INTEGER REFRENCES categories(id),
   
);