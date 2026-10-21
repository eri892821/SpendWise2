import { PGlite } from '@electric-sql/pglite'
import express from 'express'

const app=express()

export const db= new PGlite('./database')
