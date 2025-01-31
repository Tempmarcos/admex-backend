import express from 'express'
import cors from 'cors'
import router from './modules/shared/routes/index'
import { errorHandling } from './http/middlewares/errorHandling'
import path from 'path'

export const appExpress = express()

app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandling)