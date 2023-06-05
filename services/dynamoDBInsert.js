const AWS = require("aws-sdk");
const env = require("dotenv");
env.config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

function dynamoDBInsert(item, tableName) {
  const params = {
    TableName: tableName,
    Item: item
  };

  return dynamodb.put(params).promise();
}

module.exports = {
  dynamoDBInsert
};
