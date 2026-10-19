import { PGlite } from '@electric-sql/pglite'
import express from 'express'

const app=express()

const db= new PGlite('./database')

app.use(express.json())

await db.execute(`
    Create Table if not exists Accounts(
    id serial primary key,
    name text not null,
    type text not null,
    initialBalance numeric not null
    ) ;

    `)