import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { router } from './routes'
import dotenv from 'dotenv'

import "./database"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

dotenv.config({
    path: '../.env'
})

app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
        return response.status(400).json({
            error: error.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

const port = process.env.PORT || 3737

app.listen(port, () => {
    console.log(`Server is running... Porta: ${port}`)
})