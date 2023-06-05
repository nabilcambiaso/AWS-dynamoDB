const express = require('express');
const { dynamoDBInsert } = require('./services/dynamoDBInsert');
const { dynamoDBGet } = require('./services/dynamoDBGet');

const app = express();
const port = 3003;

app.get('/', (req, res) => {
  console.log("workikng")
  res.status(200).send('working');
});

app.post('/dynamoDBInsert', (req, res) => {
  const item = {
    id: "1",
    name: "Amina alami",
    age: 25
  };

  const tableName = "issues";

  dynamoDBInsert(item, tableName)
    .then(data => {
      console.log("Item inserted successfully:", data);
      res.status(200).send(data);
    })
    .catch(error => {
      console.error("Error inserting item:", error);
      res.status(500).send(error);
    });
});

app.get('/dynamoDBGet', (req, res) => {

  const tableName = "issues";

  dynamoDBGet(tableName)
    .then(items => {
      console.log("Retrieved items:", items);
      res.status(200).send(items);
    })
    .catch(error => {
      console.error("Error:", error);
      res.status(200).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
