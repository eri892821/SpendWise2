
import { PGlite } from '@electric-sql/pglite'
import express from 'express'


const app=express()

export const db= new PGlite('./database')

await db.exec (`
   CREATE TABLE IF NOT EXISTS Accounts
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL ,
   is_savings BOOLEAN NOT NULL DEAFULT FALSE,
   initial_balance NUMERIC (12, 2) NOT NULL DEFAULT 0
       );
    
 `)
 
 const cols = `id , name , is_savings, initial _balance :float8 AS initial balance `

 //Server//