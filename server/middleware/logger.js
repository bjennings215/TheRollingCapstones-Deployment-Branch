import format from "date-fns/format/index.js"
import { v4 as uuid } from "uuid"
import * as fs from 'fs'
import * as fsPromises from 'fs/promises'
import { dirname } from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const logEvents = async (message,logFileName) => {
    const logDate = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${logDate}\t${uuid()}\t${message}\n`
    try {
        if(!fs.existsSync(path.join(__dirname,'..','logs'))) {
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logFileName),logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

export {logEvents, logger}