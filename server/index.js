const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB setup
const uri = 'mongodb+srv://dbuser:mypassword@cluster0.wihv2ix.mongodb.net/Cluster0?retryWrites=true&w=majority';
const client = new MongoClient(uri);

// Default route
app.get('/', (req, res) => {
    res.json('Hello to my app');
});

// Signup route
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).send('User already exists. Please log in.');
        }

        const data = {
            email,
            hashed_password: hashedPassword
        };

        const result = await users.insertOne(data);

        const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const validPassword = await bcrypt.compare(password, user.hashed_password);

        if (!validPassword) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

// User route - Example route to get user information
app.get('/user', async (req, res) => {
    const userId = req.query.userId;

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const user = await users.findOne({ _id: userId });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

// Leaderboard route - Example route to fetch leaderboard data
app.get('/leaderboard', async (req, res) => {
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

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
