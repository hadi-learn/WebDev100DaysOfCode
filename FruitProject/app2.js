const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb://localhost:27017"
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("fruitsDB").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function run() {
    try {
        const docs = [
        { 'name': 'Apple', 'score': 8, "review": "Great fruit"},
        { 'name': 'Orange', 'score': 6, "review": "Kinda sour"},
        { 'name': 'Banana', 'score': 9, "review": "Like it"}
        ];
        const insertManyresult = await collection.insertMany(docs);
        let ids = insertManyresult.insertedIds;
        console.log(`${insertManyresult.insertedCount} documents were inserted.`);
        for (let id of Object.values(ids)) {
        console.log(`Inserted a document with id ${id}`);
        }
    } catch(e) {
        console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
        let ids = e.result.result.insertedIds;
        for (let id of Object.values(ids)) {
        console.log(`Processed a document with id ${id._id}`);
        }
        console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
    }
}
run().catch(console.dir);