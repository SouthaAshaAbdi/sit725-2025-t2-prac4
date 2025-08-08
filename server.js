const express = require("express");
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://ashaabdi046:BfoeqPxKTv1rIf8y@cluster1.smmvuvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri);
let collection;

async function runDBConnection() {
  try {
    await client.connect();
    collection = client.db("spidersDB").collection("spiders");
    console.log("Connected to MongoDB");
  } catch (ex) {
    console.error("Error connecting to MongoDB:", ex);
  }
}

// GET all spiders
app.get('/api/spiders', async (req, res) => {
  try {
    const spiders = await getSpiders();
    res.status(200).json({ data: spiders });
  } catch (err) {
    console.error("Error fetching spiders:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function getSpiders() {
  return await collection.find({}).toArray();
}

// POST new spider
app.post('/api/spiders', async (req, res) => {
  try {
    const spiderData = req.body;
    await insertSpider(spiderData);
    res.status(200).json({ message: 'Spider data saved successfully' });
  } catch (err) {
    console.error("Error saving spider data:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function insertSpider(spiderData) {
  await collection.insertOne(spiderData);
}

// Start server and connect to MongoDB
async function startServer() {
  try {
    await runDBConnection();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (ex) {
    console.error("Error starting server:", ex);
  }
}

startServer();
