const PORT = 8000
const express = require('express');
const { MongoClient } = require('mongodb');
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
    const { email, password } = req.body;
    const generatedUserId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        // Await the result of findOne to get the actual user object or null
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).send('User already exists. Please log in.');
        }

        console.log('Signed up user with email: ', email);
        const sanitizedEmail = email.toLowerCase();

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        };

        const result = await users.insertOne(data);

        const token = jwt.sign(result, sanitizedEmail, {
            expiresIn: 60 * 24
        });

        res.status(201).json({ token, userId: generatedUserId });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const existingUser = await users.findOne({ email });

        const correctPassword = await bcrypt.compare(password, existingUser.hashed_password)
        
        if (existingUser && correctPassword){
            const token = jwt.sign(existingUser, email, {
                expiresIn: 60 * 24
            })
            console.log('Logged in user with email: ', email);
            res.status(201).json({ token, userId: existingUser.user_id });
        }
    } catch (err) {
        res.status(400).send('Invalid email or password');
        console.log(err);
    } finally {
        await client.close();
    }
});

//http://localhost:8000/users
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

//http://localhost:8000/matches
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







app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
console.log('http://localhost:8000/')

