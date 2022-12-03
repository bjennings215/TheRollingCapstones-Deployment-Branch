import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"

//login/auth/access
//register references edroh code
export const register = async (req, res) => {
    try {
      const {
        username,
        password,
        firstName,
        lastName,
        Age,
      } = req.body;
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        firstName,
        lastName,
        password: passwordHash,
        Age,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const login = asyncHandler(async (req, res) => {
    //EXPECT USERNAME AND PASSWORD
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).json({ message: 'Need all fields'})
    }
    const matchUser = await User.findOne({ username }).exec()

    if (!matchUser) {
        return res.status(401).json({ message: 'Unauthroized' })
    }
    const match = await bcrypt.compare(password, matchUser.password)

    if (!match) return res.status(401).json({ message: 'not authorized! please try again'})

    const accessToken = jwt.sign ( 
    {
        "UserInfo": {
            "username": matchUser.username,
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn : '1m'}
    )

    const refreshToken = jwt.sign ( 
    {
        "username" : matchUser.username
    },
     process.env.REFRESH_TOKEN_SECRET,
     { expiresIn: '1d'}
    )

     //securing cookies w refresh token
     res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7*24*60*60*1000
     })

     res.json({accessToken})
})


const refresh = (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({ message: 'not authorized'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({message: 'forbidden'})
            const matchUser = await User.find({ username: decoded.username }).exec()
            if(!matchUser) return res.statur(401).json({message: 'No user found'})

            const accessToken = jwt.sign({
                "UserInfo": {
                    "username" :matchUser.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m'}
            )

            res.json({ accessToken })
        })
    )
} 

const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', {
        httpOnly: true,
        samesite: 'none',
        secure: true
    })
    res.json({message: 'cleared cookie'})
}


export default { login , refresh , logout }