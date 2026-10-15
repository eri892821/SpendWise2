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