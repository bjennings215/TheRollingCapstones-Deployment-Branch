
import rateLimit from 'express-rate-limit'
import { logEvents } from './logger.js'

const loginLimiter = rateLimit ( {
    windowsMs: 60 * 1000,
    max: 3,
    message:
    { 
        message: 'User reached max attempts to log in. Please try again after 60 seconds.'
    },
    handler: (req, res, next, options) => { //what happens if max attempts are reached
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorlog.log')
        res.status(options.statusCode).send(options.message)
    },
    Headers: true,
    LegacyHeader: false,
})

export default loginLimiter