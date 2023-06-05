const AWS = require("aws-sdk");
const env = require("dotenv");
env.config();

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

function dynamoDBGet(tableName) {
  const params = {
    TableName: tableName
  };

  return dynamodb.scan(params).promise()
    .then(data => data.Items)
    .catch(error => {
      console.error("Error getting items:", error);
      throw error;
    });
}

module.exports = {
  dynamoDBGet
};
