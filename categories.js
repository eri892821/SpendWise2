import express from 'express'
import {db, initDb} from './db.js'

const PORT = 3001
const app = express()
app.use(express.json())