<<<<<<< HEAD
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
=======
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
>>>>>>> 42140c63ed91374c4271d3d42dcdbc11f3cdf591

    try {
        await client.connect();
        const database = client.db('app-data');
        const users = database.collection('users');

        const existingUser = await users.findOne({ email });

<<<<<<< HEAD
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
=======
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
>>>>>>> 42140c63ed91374c4271d3d42dcdbc11f3cdf591
    } finally {
        await client.close();
    }
});

<<<<<<< HEAD
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
=======
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

>>>>>>> 42140c63ed91374c4271d3d42dcdbc11f3cdf591
