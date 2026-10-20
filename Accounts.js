
import { PGlite } from '@electric-sql/pglite'
import express from 'express'


const app=express()

export const db= new PGlite('./database')

await db.exec (`
   CREATE TABLE IF NOT EXISTS Accounts
   id SERIAL PRIMARY KEY;
   name TEXT NOT NULL
   click (TEXT) NOT NULL
   initial_Balance
    
    
    
    
    
    
    `)
