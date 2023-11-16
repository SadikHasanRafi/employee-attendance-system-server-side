const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(express.json());
app.use(cors());

const port = 3000;
const uri =
  "mongodb+srv://sadikhasan13255:27zOFfyxopHnRvKn@ems.rzuszg2.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    //! database connection
    await client.db("employee_management_system").command({ ping: 1 });
    await client.db("employee_management_system").collection("userCredential");

    app.post("/sigup", async (req, res) => {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 15);
        res.status(200).send({ hashedPassword: hashedPassword });
      } catch (error) {
        res.send({ error: error });
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("konniciwa");
});

app.listen(port, () => {
  console.log(`listening to port `, port);
});
