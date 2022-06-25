const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.npmlioa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const contactCollection = client.db('contactList').collection('allContact')
        //add contact
        app.post('/allContact', async (req, res) => {
            const newContact = req.body;
            const result = await contactCollection.insertOne(newContact);
            res.send(result);
        })
        app.get('/allContact', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const contacts = await contactCollection.find(query).toArray();
            res.send(contacts);
        })
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('running test')
})

app.listen(port, () => {
    console.log("Listening to port", port);
})