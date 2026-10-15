import { PGlite } from '@electric-sql/pglite'
import express from 'express'

const app=express()

const db= new PGlite('./database')

