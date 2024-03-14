const PORT = 8000
const express = require ('express');
const { MongoClient, UUID } = require('mongodb');
const uri = 'mongodb+srv://dbuser:mypassword@cluster0.wihv2ix.mongodb.net/Cluster0?retryWrites=true&w=majority'
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello to my app')
    
})

//http://localhost:8000/signup
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    console.log(req.body)
    const { email, password } = req.body
   
    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)
    
    try{
        await client.connect()
        const database = client.db('app-data')
        console.log('Connected to MongoDB')

        const users = database.collection('users')
        const existingUser = users.findOne({ email })

        if (existingUser) {
            return res.status(409).send('User already exists. Please log in.')
        } 
        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        const result = await users.insertOne(data)

        const token = jwt.sign(result, sanitizedEmail, {
            expiresIn: 60 * 24
        })
        res.status(201).json({token, user_id: generatedUserId, email: sanitizedEmail})
    } catch (err){
        console.log(err)
    }
  
})

//http://localhost:8000/users
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    
    try{
        await client.connect()
        const database = client.db('app-data')
        console.log('Connected to MongoDB')
        const users = database.collection('users')
        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    }
    finally{
        await client.close()
    }
})

app.get('/onboarding', (req, res) => {
    res.json('Hello to my app')
    
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
console.log('http://localhost:8000/')

