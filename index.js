const express = require("express");
const app = express();
const port = 8080;
const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://group35280:uncc2022@cluster0.rts9eht.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(express.urlencoded());
app.use(express.json());

app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`${process.env.PORT}`);
});

app.get("/", (req, res) => {
    //can declare get our put route, first param is the route, second param is the function that is executed
    res.send("Hello world");
 });

app.get('/api/getItems', async (req, res) => {
    let items = await findItems(req.headers["region"]);
    res.send({
       items
    })
});

async function findItems(region) {
    try {
      console.log("findItems connect to db start");
      await client.connect();
  
      console.log("findItems find discount for " + region);


      var items = await client
        .db("grocerystore").collection("discounts")
        .find({"region": "produce"}).toArray();
        // .find({results: {$elemMatch: { name: "Pineapple" } } });
        // .find({ regions: {$elemMatch: {region: 'produce'}}});
  
        console.log(items);
      
      return items;
      
    } catch(ex){
        console.log(ex);
    }
    finally {
      await client.close();
    }
}