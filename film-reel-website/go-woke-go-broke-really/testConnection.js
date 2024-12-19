const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://pikapika:Ux8IK6NjjqKbEJd7@quizresponsesada.mdeyb.mongodb.net/QuizResponsesADA?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}

run();
