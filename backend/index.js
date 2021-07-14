const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dbAmitu:Amitu_EC-TT18@amitudatabase.xd1nf.mongodb.net/AmituDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("Users").collection("Users");
// perform actions on the collection object
    console.log(collection);
    client.close();
}); 