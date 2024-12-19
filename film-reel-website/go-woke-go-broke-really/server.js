require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection String
const mongoURI = process.env.MONGO_URI;
let db;

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
        db = client.db('QuizResponsesADA'); // Replace with your database name
        console.log('Connected to MongoDB');
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// Endpoint to submit quiz answers
app.post('/submit', async (req, res) => {
    const { answer } = req.body;
    if (!answer) return res.status(400).send('Answer is required');

    try {
        const result = await db.collection('responses').insertOne({ answer });
        res.status(201).send({ success: true, result });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

// Endpoint to fetch quiz statistics
app.get('/stats', async (req, res) => {
    try {
        const stats = await db
            .collection('responses')
            .aggregate([{ $group: { _id: '$answer', count: { $sum: 1 } } }])
            .toArray();
        res.status(200).send(stats);
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
