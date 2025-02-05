import express from 'express'
import { Request, Response } from 'express';
 import cors from 'cors'
import {router} from './modules/shared/routes/index'
// import { errorHandling } from './http/middlewares/errorHandling'
import path from 'path'

export const appExpress = express()

appExpress.use('/test', (request : Request, response: Response) => {
    response.send({message : 'funcionou'})
})

appExpress.use(express.json())
appExpress.use(cors())
appExpress.use(router)
// appExpress.use(errorHandling)