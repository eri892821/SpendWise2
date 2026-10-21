import express from 'express'
import cors from 'cors'    // allow browsers to permit React to talk to the server

import{
    getAccountOptions,
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    saveDetails,addcontribution,
} from './db.js'

const app= express ()