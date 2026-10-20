import { PGlite } from '@electric-sql/pglite'
import express from 'express'

const app=express()

const db= new PGlite('./database')

await db.exec(`

    CREATE TABLE IF NOT EXISTS Budget(
    id SERIAL PRIMARY Key,
    category TEXT NOT NULL,
    target_amount NUMERIC (12,2) NOT NULL,
    targt_date DATE NOT NULL, 
    spent NUMERIC (12,2) DFAULT 0
);


