const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2rtmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        console.log('connected to database');
        const database = client.db('FoodShop');
        const foodCollection = database.collection('items');
        const orderCollection = database.collection('orders');


    

  // POST API
  app.post("/items", async (req, res) => {
      const item = req.body;
   
  console.log('hit the post api',item);
  const result = await foodCollection.insertOne(item);
  console.log(result);
  res.send(result);
  });

  // GET API
  app.get('/items',async (req,res)=>{
      const itemcollection = foodCollection.find({});
      const items = await itemcollection.toArray();
      res.send(items);

  })
    }


    

   

    finally{

    }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('Running the server')
})
app.listen(port,()=>{
    console.log('Running on port',5000);
})