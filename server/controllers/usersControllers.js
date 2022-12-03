import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"

//get all users
//references davegray MERN full stack course
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().lean()
    if(!users?.length) {
        return res.status(400).json({message : 'No users found'})
    }
    res.json(users)
})

//create user
const createUser = asyncHandler(async (req, res) => {
    const { username, password, roles, Streak, firstname, lastname, Age} = req.body

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message : 'All fields are required'})
    }

    const dups = await User.findOne({ username }).lean().exec()

    if(dups) {
        return res.status(409).json({message : 'Username already taken'})
    }

    const hash = await bcrypt.hash(password,10)

    

    const userObject = {username, firstname, lastname, Age, "password":hash, roles, Streak }

    const user = await User.create(userObject)

    if(user) {
        res.status(201).json({ message: `New User ${username} created`})
    } else {
        res.status(400).json({ message: 'Invalid data received'})
    }

})

//update user
const updateUser = asyncHandler(async (req, res) => {
    const {id, username, password, firstname, lastname, Age, roles, Streak, active} = req.body

    if (!username || !password || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean' 
    || !firstname || !lastname|| !Age || typeof Streak !== 'number') {
        return res.status(400).json({message : 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
       return res.status(400).json({ message: 'User not found'})
    }

    const dups = await User.findOne({ username }).lean().exec()

    if(dups && dups?._id.toString() !== id) {
        return res.status(400).json({message : 'Duplicate username'})
    }

    user.username = username
    user.roles = roles
    user.active = active
    user.firstname = firstname
    user.lastname = lastname
    user.Age = Age


    if(password) {
        user.password = await bcrypt.hash(password,10)
    }

    const updateUser = await user.save()

    res.json({message : 'User updated'})
})

//delete user
const deleteUser = asyncHandler(async (req, res) => {
    const{id} = req.body

    if (!id) {
        res.status(400).json({message : 'User ID required'})
    }

    const user = await User.findById(id).exec()

    if (!user) {
        res.status(400).json({message : 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${id} has been deleted`

    res.json(reply)
})


export  {getAllUsers, createUser, updateUser, deleteUser} 