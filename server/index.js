import dotenv from 'dotenv'
import {} from 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import { root } from './routes/root.js'
import { users } from './routes/userRoutes.js'
import { submit_Posts } from './routes/submit_PostRoutes.js'
import { dirname } from 'path'
import {fileURLToPath} from 'url'
import { logger , logEvents} from './middleware/logger.js'
import { errorHandler } from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
import connectDB from './config/dbConn.js'
import { modules } from './routes/moduleRoute.js'
import { auth } from './routes/authRoute.js'

console.log(process.env.NODE_ENV)

connectDB()

//initialize express server to create API
const app = express()
//set Port
const PORT = process.env.PORT || 5000

//middleware to log all request from API
app.use(logger)


//CORS - security mechanmism to protect cross origin resource sharing
var whitelist = ['http://localhost:3000','http://localhost:5000','https://www.capscodes.com','https://capscodes.com','https://data.mongodb-api.com/app/data-viyvg/endpoint/data/v1/action/findOne']
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials:true,
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions))

//middleware to pson json
app.use(express.json())


//middleware to parse cookies
app.use(cookieParser())


//es6 fix for __dirname
const __dirname = dirname(fileURLToPath(import.meta.url))

//API splash page and 404 errors
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', root)
app.use('/users',users)
app.use('/submitPOST', submit_Posts)
app.use('/modules',modules)
app.use('/auth',auth)

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})


//last piece of middleware to log errors in case of errors
app.use(errorHandler)

//server start on PORT 5000
mongoose.connection.once('open',() => {
    console.log('Connected to MongoDB')
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
