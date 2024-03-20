const PORT = 8000
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.URI
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

//signup to the database
//http://localhost:8000/signup
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne({email})

        if (existingUser) {
            return res.status(409).send('User already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }

        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
        })
        res.status(201).json({token, userId: generatedUserId})

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})


//login to the database
app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const { email, password } = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({ email })

        if (!user) {
            return res.status(400).json('User not found')
        }

        const correctPassword = await bcrypt.compare(password, user.hashed_password)

        if (correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            return res.status(201).json({ token, userId: user.user_id })
        }

        res.status(400).json('Invalid Credentials')

    } catch (err) {
        console.error(err)
        res.status(500).json('Internal Server Error')
    } finally {
        await client.close()
    }
})

//get individual user from the database
app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const user = await users.findOne(query)
        res.send(user)

    } finally {
        await client.close()
    }
})

//get all available users from the database
app.get('/user-matches', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        
        const filteredUsers = await users.find({ first_name: { $exists: true, $ne: null } }).toArray();
        res.send(filteredUsers);
    } finally {
        await client.close()
    }
})

//update user in the database
//http://localhost:8000/user
app.put('/user',async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData


    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: formData.user_id }
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                gender: formData.gender,
                breed: formData.breed,
                country: formData.country,
                city: formData.city,
                bio: formData.bio,
                url: formData.url,
                matches: formData.matches
            },
        }
        const insertedUser = await users.updateOne(query, updateDocument)
        res.send(insertedUser)
    } finally {
        await client.close()
    }

})

// Update User with a match
app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, matchedUserId} = req.body

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = {user_id: userId}
        const updateDocument = {
            $push: {matches: {user_id: matchedUserId}}
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close()
    }
})

//get all users by userIds in the database
app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    const userIds = JSON.parse(req.query.userIds)

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const pipeline =
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': userIds
                        }
                    }
                }
            ]
    
        const foundUsers = await users.aggregate(pipeline).toArray()
        res.json(foundUsers)

    } finally {
        await client.close()
    }
})

// Leaderboard route - Example route to fetch leaderboard data
app.get('/leaderboard', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect();
        const database = client.db('app-data');
        const leaderboard = database.collection('leaderboard');
        const leaderboardData = await leaderboard.find().toArray();

        res.status(200).json(leaderboardData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

// Get Messages by from_userId and to_userId
app.get('/messages', async (req, res) => {
    const { userId, correspondingUserId } = req.query
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')
        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }
        const foundMessages = await messages.find(query).toArray()
        res.send(foundMessages)
    } finally {
        await client.close()
    }
})

// Add a Message to our Database
app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message

    try {
        await client.connect()
        const database = client.db('app-data')
        const messages = database.collection('messages')

        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)
    } finally {
        await client.close()
    }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
console.log('http://localhost:8000/')

