const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI;
let db;

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        db = client.db('QuizResponses'); // Use your database name
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.error('MongoDB connection error:', err));

// Endpoint to submit quiz answers
app.post('/submit', async (req, res) => {
    console.log('Received POST /submit with body:', req.body); // Add this line
    const { answer } = req.body;
    if (!answer) return res.status(400).send('Answer is required');

    try {
        await db.collection('responses').insertOne({ answer });
        res.status(201).send('Answer submitted successfully');
    } catch (error) {
        console.error('Error storing answer:', error); // Log error details
        res.status(500).send('Error storing answer');
    }
});


// Endpoint to get quiz stats
app.get('/stats', async (req, res) => {
    try {
        const stats = await db.collection('responses')
            .aggregate([{ $group: { _id: '$answer', count: { $sum: 1 } } }])
            .toArray();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).send('Error fetching stats');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

